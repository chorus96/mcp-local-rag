// Title-prefix retrieval benchmark: ingests a corpus twice (body-only and
// title-prefixed embeddings) through RAGServer, runs every query through
// query_documents, and prints metrics plus a per-query diff as Markdown.
//
//   pnpm bench:title-prefix [--corpus <dir>] [--queries <file>] [--json <out>]
//
// MODEL_NAME and CACHE_DIR are read like the server reads them.

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { collectFiles } from '../../src/cli/file-collection.js'
import { GLOBAL_DEFAULTS } from '../../src/cli/options.js'
import { RAGServer } from '../../src/server/index.js'
import { DEFAULT_MAX_FILE_SIZE } from '../../src/utils/limits.js'
import { type VectorChunk, VectorStore } from '../../src/vectordb/index.js'

interface Gold {
  file: string
  snippet: string
}
interface Query {
  id: string
  group: string
  query: string
  gold: Gold[]
  scope?: string
}
interface Hit {
  id: string
  relevant: boolean
  goldFile: boolean
}
/** One ranked hit list per query, index-aligned with `queries`. */
type Run = Hit[][]
type Mode = 'hybrid' | 'vector'
type Variant = 'body' | 'title'
interface Measured {
  hybrid: Run
  vector: Run
  excluded: string[]
}

const LIMIT = 10
const MODES: readonly Mode[] = ['hybrid', 'vector']
const VARIANTS: readonly Variant[] = ['body', 'title']

const { values: flags } = parseArgs({
  options: {
    corpus: { type: 'string', default: join(import.meta.dirname, 'corpus') },
    queries: { type: 'string', default: join(import.meta.dirname, 'queries.json') },
    json: { type: 'string' },
  },
})
const corpus = resolve(flags.corpus)
const queries: Query[] = JSON.parse(readFileSync(flags.queries, 'utf8'))
const modelName = process.env['MODEL_NAME'] || GLOBAL_DEFAULTS.modelName
const cacheDir = process.env['CACHE_DIR'] || GLOBAL_DEFAULTS.cacheDir
const files = await collectFiles(corpus, [corpus], [])

const norm = (s: string): string => s.replace(/\s+/g, ' ')
const fmt = (n: number): string => n.toFixed(3)

function server(dbPath: string, variant: Variant, mode: Mode): RAGServer {
  return new RAGServer({
    dbPath,
    modelName,
    cacheDir,
    baseDir: corpus,
    maxFileSize: DEFAULT_MAX_FILE_SIZE,
    titlePrefix: variant === 'title',
    ...(mode === 'vector' ? { hybridWeight: 0 } : {}),
  })
}

/**
 * Ids of queries with no gold snippet inside any single stored chunk: the
 * chunker dropped or split the answer, so no ranking could retrieve it.
 */
async function unanswerable(dbPath: string): Promise<string[]> {
  const store = new VectorStore({ dbPath, tableName: 'chunks' })
  await store.initialize()
  const texts = new Map<string, string[]>()
  const chunkTexts = async (file: string): Promise<string[]> => {
    let cached = texts.get(file)
    if (cached === undefined) {
      const chunks: VectorChunk[] = await store.getChunksByFilePath(join(corpus, file))
      cached = chunks.map((c) => norm(c.text))
      texts.set(file, cached)
    }
    return cached
  }
  const ids: string[] = []
  for (const q of queries) {
    let reachable = false
    for (const g of q.gold) {
      if ((await chunkTexts(g.file)).some((t) => t.includes(norm(g.snippet)))) {
        reachable = true
        break
      }
    }
    if (!reachable) {
      ids.push(q.id)
    }
  }
  await store.close()
  return ids
}

function toHits(q: Query, rows: { filePath: string; chunkIndex: number; text: string }[]): Hit[] {
  return rows.map((r) => {
    const file = relative(corpus, r.filePath)
    const golds = q.gold.filter((g) => g.file === file)
    return {
      id: `${file}#${r.chunkIndex}`,
      goldFile: golds.length > 0,
      relevant: golds.some((g) => norm(r.text).includes(norm(g.snippet))),
    }
  })
}

async function search(rag: RAGServer): Promise<Run> {
  const run: Run = []
  for (const q of queries) {
    const { content } = await rag.handleQueryDocuments({
      query: q.query,
      limit: LIMIT,
      ...(q.scope === undefined ? {} : { scope: join(corpus, q.scope) }),
    })
    const first = content[0]
    run.push(toHits(q, first?.type === 'text' ? JSON.parse(first.text) : []))
  }
  return run
}

/**
 * Ingest one variant and search it in both modes. The ingesting server has
 * the default hybrid weight, so it also runs the hybrid pass.
 */
async function measure(dir: string, variant: Variant): Promise<Measured> {
  const db = join(dir, variant)
  const rag = server(db, variant, 'hybrid')
  await rag.initialize()
  for (const filePath of files) {
    // Empty or garbage-only files yield no chunks and are rejected; skip them.
    await rag.handleIngestFile({ filePath }).catch(() => undefined)
  }
  const hybrid = await search(rag)
  await rag.close()

  const vectorOnly = server(db, variant, 'vector')
  await vectorOnly.initialize()
  const vector = await search(vectorOnly)
  await vectorOnly.close()
  return { hybrid, vector, excluded: await unanswerable(db) }
}

/** 1-based rank of the first relevant hit, or null. */
function firstRank(hits: Hit[]): number | null {
  const i = hits.findIndex((h) => h.relevant)
  return i < 0 ? null : i + 1
}

/** Binary-relevance nDCG@10; the ideal count is the most relevant chunks any run retrieved. */
function ndcg(hits: Hit[], idealCount: number): number {
  const dcg = hits.reduce((s, h, i) => s + (h.relevant ? 1 / Math.log2(i + 2) : 0), 0)
  let idcg = 0
  for (let i = 0; i < Math.min(Math.max(idealCount, 1), LIMIT); i++) {
    idcg += 1 / Math.log2(i + 2)
  }
  return dcg / idcg
}

interface Slice {
  group: string
  idx: number[]
  ideal: number[]
}

function metricsRow({ group, idx, ideal }: Slice, variant: Variant, run: Run): string {
  const ranks = idx.map((i) => firstRank(run[i] ?? []))
  const hitAt = (k: number): string =>
    fmt(ranks.filter((r) => r !== null && r <= k).length / idx.length)
  const mrr = ranks.reduce<number>((s, r) => s + (r ? 1 / r : 0), 0) / idx.length
  const nd = idx.reduce((s, i) => s + ndcg(run[i] ?? [], ideal[i] ?? 1), 0) / idx.length
  return `| ${group} | ${idx.length} | ${variant} | ${hitAt(1)} | ${hitAt(3)} | ${hitAt(10)} | ${fmt(mrr)} | ${fmt(nd)} |`
}

function diffRow(q: Query, body: Hit[], title: Hit[]): string {
  const noise = (hits: Hit[]): Hit[] => hits.slice(0, 5).filter((h) => !h.relevant)
  const label = (h: Hit): string => `${h.goldFile ? '*' : ''}${h.id}`
  const bodyIds = new Set(noise(body).map((h) => h.id))
  const titleIds = new Set(noise(title).map((h) => h.id))
  const added = noise(title).filter((h) => !bodyIds.has(h.id))
  const dropped = noise(body).filter((h) => !titleIds.has(h.id))
  return `| ${q.id} | ${q.group} | ${firstRank(body) ?? '–'} | ${firstRank(title) ?? '–'} | ${added.map(label).join('<br>')} | ${dropped.map(label).join('<br>')} |`
}

function reportMode(
  mode: Mode,
  runs: Record<Variant, Measured>,
  excluded: Set<string>,
  ideal: number[]
): string[] {
  const lines = [
    `## ${mode === 'hybrid' ? 'Hybrid (default weight)' : 'Vector only (hybridWeight=0)'}`,
    '',
    '| group | n | variant | hit@1 | hit@3 | hit@10 | MRR | nDCG@10 |',
    '|---|---|---|---|---|---|---|---|',
  ]
  for (const group of [...new Set(queries.map((q) => q.group)), 'all']) {
    const idx = queries.flatMap((q, i) =>
      !excluded.has(q.id) && (group === 'all' || q.group === group) ? [i] : []
    )
    for (const variant of VARIANTS) {
      lines.push(metricsRow({ group, idx, ideal }, variant, runs[variant][mode]))
    }
  }
  lines.push(
    '',
    `### Per-query diff (${mode})`,
    '',
    'Rank = first answer-bearing chunk (– = not in top 10). "New top-5 noise" lists non-answer chunks that entered the top 5 with titles on; `*` marks a chunk from the answer document.',
    '',
    '| id | group | body rank | title rank | new top-5 noise | dropped top-5 noise |',
    '|---|---|---|---|---|---|'
  )
  queries.forEach((q, i) => {
    if (!excluded.has(q.id)) {
      lines.push(diffRow(q, runs.body[mode][i] ?? [], runs.title[mode][i] ?? []))
    }
  })
  lines.push('')
  return lines
}

function report(runs: Record<Variant, Measured>): string {
  const excluded = new Set([...runs.body.excluded, ...runs.title.excluded])
  const ideal = queries.map((_, i) =>
    Math.max(
      ...MODES.flatMap((m) =>
        VARIANTS.map((v) => runs[v][m][i]?.filter((h) => h.relevant).length ?? 0)
      )
    )
  )
  const header = [
    '# Title-prefix benchmark',
    '',
    `Model \`${modelName}\`, ${files.length} files, ${queries.length} queries, top ${LIMIT}.`,
    '',
  ]
  if (excluded.size > 0) {
    header.push(
      `Excluded from metrics, answer not inside any stored chunk in at least one variant: ${[...excluded].join(', ')}.`,
      ''
    )
  }
  return [...header, ...MODES.flatMap((m) => reportMode(m, runs, excluded, ideal))].join('\n')
}

const root = mkdtempSync(join(tmpdir(), 'title-prefix-bench-'))
try {
  const runs = { body: await measure(root, 'body'), title: await measure(root, 'title') }
  console.log(report(runs))
  if (flags.json) {
    writeFileSync(flags.json, JSON.stringify({ modelName, queries, runs }, null, 2))
  }
} finally {
  rmSync(root, { recursive: true, force: true })
}
