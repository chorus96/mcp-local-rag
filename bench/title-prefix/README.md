# Title-prefix benchmark

Measures whether embedding each chunk behind a `Title: <document title>` line
(`titlePrefix`, off by default) retrieves answer passages that body-only
embeddings miss. It also checks whether that pulls unrelated chunks into the
results. Stored text, the FTS index and returned chunks are body-only in both
variants; only the embedding input differs.

```bash
pnpm bench:title-prefix                       # bundled corpus and queries
pnpm bench:title-prefix --corpus ~/notes --queries my-queries.json --json out.json
```

`MODEL_NAME` and `CACHE_DIR` are read as the server reads them (default
`Xenova/all-MiniLM-L6-v2`, `./models/`).

## Method

1. Ingest `corpus/` twice through `RAGServer.handleIngestFile` (normal parsing,
   semantic chunking, embedding and LanceDB storage), once per variant.
2. Run every query in `queries.json` through `handleQueryDocuments` (the
   `query_documents` tool) with top 10. Run it twice: with the default hybrid
   weight, and vector-only (`hybridWeight=0`). A query with `scope` passes it
   as the MCP `scope`.
3. A hit is answer-bearing when it comes from a gold file and contains the gold
   snippet. Queries whose snippet lies in no stored chunk are excluded and
   listed, since no ranking could retrieve them.

Query groups (written before the first run):

| group | question |
|---|---|
| `context` | The topic is named only by the document title (file name), not in the answer passage. |
| `body` | The passage alone answers the question (regression check). |
| `distractor` | Sibling sections of one long document, the same title across clients, or date-named notes. |
| `scoped` | Questions from the groups above with the target folder known (`scope`). |

## Corpus

`corpus/` is a synthetic, anonymized stand-in for a real Obsidian vault of
consulting notes, where title prefixes helped in practice. It keeps that
vault's shape, not its content:

- client folders with nested `tickets/` and `hld/<topic>/`
- mostly no H1, so titles fall back to file names
- mixed Italian and English
- date-named meeting notes, checklists, pseudo-code, a Q&A draft
- an Excalidraw note, an empty file and near-empty stubs

All names, clients, domains, dates and IDs are invented, and the text is
written from scratch.

## Results

Three models, 20 files, top 10. Runs are deterministic. Full per-query diffs:
[all-MiniLM-L6-v2](RESULTS-all-MiniLM-L6-v2.md),
[paraphrase-multilingual-MiniLM-L12-v2](RESULTS-paraphrase-multilingual-MiniLM-L12-v2.md),
[paraphrase-multilingual-mpnet-base-v2](RESULTS-paraphrase-multilingual-mpnet-base-v2.md).

All three models get a 512-token cap, which these short notes rarely reach.
Chunk boundaries still differ between models because the semantic chunker
groups sentences by embedding similarity. So the set of unanswerable queries
differs, and the `n` columns do not match across models.

### `Xenova/all-MiniLM-L6-v2` (default, English-only), 36 scored queries

| mode | group | n | MRR body → title | hit@3 body → title | hit@10 body → title |
|---|---|---|---|---|---|
| hybrid | context | 12 | 0.479 → **0.667** | 0.500 → **0.750** | 0.583 → **0.917** |
| hybrid | body | 12 | 0.623 → 0.719 | 0.750 → 0.833 | 0.833 → 0.917 |
| hybrid | distractor | 6 | 0.708 → 0.708 | 0.667 → 0.667 | 0.833 → 0.833 |
| hybrid | scoped | 6 | 0.583 → 0.774 | 0.833 → 0.833 | 1.000 → 1.000 |
| vector | context | 12 | 0.542 → **0.708** | 0.583 → **0.833** | 0.583 → **0.833** |
| vector | body | 12 | 0.642 → 0.759 | 0.750 → 0.833 | 0.833 → 0.917 |
| vector | distractor | 6 | 0.700 → 0.708 | 0.667 → 0.667 | 0.833 → 0.833 |
| vector | scoped | 6 | 0.528 → 0.778 | 0.667 → 0.833 | 0.833 → 1.000 |

- **Newly retrieved answers:** 4 context answers that were outside the top 10
  (hybrid: c04, c05, c07, c09) now rank 2–4, and c13 moved 4→1. Body-only b10
  also went from outside the top 10 to rank 2.
- **Body-only questions:** nothing lost. b07 slipped 7→8 (hybrid) and 5→9
  (vector).
- **Added unrelated hits (top 5, all queries):** hybrid 20 same-document and
  16 other-document chunks entered, 9 and 34 left. Vector: 24/21 entered,
  9/43 left.

### `Xenova/paraphrase-multilingual-MiniLM-L12-v2` (Italian + English), 35 scored queries

| mode | group | n | MRR body → title | hit@3 body → title | hit@10 body → title |
|---|---|---|---|---|---|
| hybrid | context | 12 | 0.573 → **0.743** | 0.500 → **0.917** | 0.833 → **1.000** |
| hybrid | body | 12 | 0.639 → 0.679 | 0.750 → 0.750 | 0.833 → 0.833 |
| hybrid | distractor | 6 | 0.708 → 0.713 | 0.667 → 0.667 | 0.833 → 1.000 |
| hybrid | scoped | 5 | 0.690 → 0.700 | 0.600 → 0.600 | 1.000 → 1.000 |
| vector | context | 12 | 0.562 → **0.794** | 0.500 → **0.917** | 0.833 → **1.000** |
| vector | body | 12 | 0.615 → 0.618 | 0.667 → 0.667 | 0.833 → 0.833 |
| vector | distractor | 6 | 0.700 → 0.722 | 0.667 → 0.667 | 0.833 → 1.000 |
| vector | scoped | 5 | 0.689 → 0.840 | 0.800 → 0.800 | 1.000 → 1.000 |

- **Newly retrieved answers:** hybrid c03 –→3 and c06 –→2; vector c01 –→5 and
  c06 –→2. Titles also moved c07, c09 and c13 up in both modes.
- **Lost answers:** none. Small slips: b12 6→7 (hybrid), d05 4→6 (hybrid)
  and 5→6 (vector), c08 1→2 (vector).
- **Same-title distractor:** d03 ("Which columns are masked in the data
  warehouse?", answered by the one-chunk `larice/Data Masking.md`) entered the
  top 10 with titles (hybrid –→9, vector –→6).
- **Added unrelated hits (top 5, all queries):** hybrid 27 same-document and
  20 other-document chunks entered, 6 and 45 left. Vector: 37/23 entered,
  7/58 left.

### `Xenova/paraphrase-multilingual-mpnet-base-v2` (Italian + English), 36 scored queries

| mode | group | n | MRR body → title | hit@3 body → title | hit@10 body → title |
|---|---|---|---|---|---|
| hybrid | context | 12 | 0.595 → **0.744** | 0.667 → **0.750** | 0.750 → **1.000** |
| hybrid | body | 13 | 0.650 → 0.599 | 0.769 → 0.692 | 0.923 → 0.846 |
| hybrid | distractor | 6 | 0.700 → 0.690 | 0.667 → 0.667 | 0.833 → 0.833 |
| hybrid | scoped | 5 | 0.673 → 0.690 | 0.600 → 0.600 | 1.000 → 1.000 |
| vector | context | 12 | 0.501 → **0.720** | 0.500 → **0.833** | 0.833 → **1.000** |
| vector | body | 13 | 0.644 → 0.639 | 0.692 → 0.692 | 0.846 → 0.846 |
| vector | distractor | 6 | 0.700 → 0.715 | 0.667 → 0.667 | 0.833 → 1.000 |
| vector | scoped | 5 | 0.650 → 0.689 | 0.600 → 0.800 | 0.800 → 1.000 |

- **Newly retrieved answers:** hybrid c01 –→5, c03 –→5 and c06 –→3; vector
  c01 –→9 and c06 –→2, plus c04 8→1 and c12 6→1.
- **Lost answer:** b03 ("Is returns tracking done?", one line of the
  `ontano/planning.md` checklist) fell from rank 2 (hybrid) and 6 (vector) out
  of the top 10, and b12 slipped 2→3 (hybrid). The title `planning` says nothing about the line, so it may
  dilute a short chunk's embedding, but the harness does not verify this.
- **Same-title distractor:** d03 stays out of the top 10 in hybrid and enters
  at 8 in vector.
- **Added unrelated hits (top 5, all queries):** hybrid 30 same-document and
  15 other-document chunks entered, 4 and 44 left. Vector: 36/25 entered,
  7/58 left.

### Across all three models

- Title-dependent questions improve in every model and mode (hybrid MRR
  +0.19, +0.17, +0.15), and hybrid hit@10 reaches 0.917–1.000 with titles.
- With the default hybrid ranking, body-only questions are flat or better for
  the two MiniLM models. mpnet lost one (b03), a short checklist line under a
  generic title.
- The same-title distractor (two `Data Masking` notes from different clients)
  did not hurt in this corpus: d03 improved or stayed put in every model.
- Scoped search improves on average; the one slip is s06 6→7 (MiniLM-L6
  hybrid). `scope` does not substitute for
  titles when the user doesn't know which folder holds the answer (every
  `context` query).

## Caveats

- The corpus and queries were written by the author of the feature, and they
  are small. Treat the results as a reproducible example, not a general claim.
  An earlier version of the corpus, with different text, showed a regression
  on the same-title distractor in mpnet, so single-query outcomes are fragile.
- Some queries are unanswerable in both variants because the chunker drops
  sentence groups shorter than `CHUNK_MIN_LENGTH` (50), such as short bullet
  lists (MiniLM-L6: c06, b03, b06; multilingual MiniLM: c05, b03, b06, s04;
  mpnet: c05, b06, s04). This is unrelated to titles.
