import type { Document } from 'mupdf'
import type { HeadingAnchor } from '../utils/source-context.js'
import type { FilteredPageLayout, PageData } from './pdf-filter.js'

type Outline = NonNullable<ReturnType<Document['loadOutline']>>
type PdfLine = PageData['items'][number]
const normalize = (text: string): string => text.normalize('NFKC').toLowerCase().replace(/\s+/g, '')

/** Match headings after the existing filter has joined lines or removed page furniture. */
function searchableText(text: string): { value: string; offsets: number[] } {
  let value = ''
  const offsets: number[] = []
  for (let i = 0; i < text.length; i++) {
    const normalized = normalize(text[i] ?? '')
    value += normalized
    offsets.push(...Array<number>(normalized.length).fill(i))
  }
  return { value, offsets }
}

function locate(text: ReturnType<typeof searchableText>, title: string): number | undefined {
  const needle = normalize(title)
  if (!needle) {
    return undefined
  }
  const index = text.value.indexOf(needle)
  return index < 0 ? undefined : text.offsets[index]
}

/** Combine native pieces on the same baseline, e.g. a section number and its title. */
function pageLines(page: PageData): PdfLine[] {
  const lines: PdfLine[] = []
  for (const item of [...page.items].sort(
    (a, b) => Math.round(b.y) - Math.round(a.y) || a.x - b.x
  )) {
    const last = lines.at(-1)
    if (last && Math.abs(last.y - item.y) < 1 && Math.abs(last.fontSize - item.fontSize) < 0.5) {
      last.text += ` ${item.text}`
    } else {
      lines.push({ ...item })
    }
  }
  return lines
}

function fontHeading(line: PdfLine, bodySize: number): Omit<HeadingAnchor, 'offset'> | undefined {
  const text = line.text.trim().replace(/\s+/g, ' ')
  const numbered = /^(\d+(?:\.\d+)*)(?:[.)]?\s+)\S/.exec(text.normalize('NFKC'))
  const bold = /bold|heavy|black|demi/i.test(`${line.fontName ?? ''} ${line.fontWeight ?? ''}`)
  const size = Math.round(line.fontSize * 2) / 2
  const box = line.bbox
  if (box && box[3] - box[1] > line.fontSize * 2 && box[2] - box[0] < line.fontSize * 2) {
    return undefined
  }
  if (!numbered && text.length > 70) {
    return undefined
  }
  if (
    text.length < 3 ||
    text.length > 120 ||
    text.split(/\s+/).length > 16 ||
    /[.!?。；;:]$/.test(text)
  ) {
    return undefined
  }
  if (/^(?:figure|fig\.|table)\s+\d/i.test(text) || /^\W*\d[\d.]*\W*$/.test(text)) {
    return undefined
  }
  if (!(size > bodySize * 1.12 || (bold && numbered))) {
    return undefined
  }
  const level = numbered ? (numbered[1]?.split('.').length ?? 1) : 1
  return { text, level }
}

function flattenOutline(items: Outline, level = 1): { item: Outline[number]; level: number }[] {
  return items.flatMap((item) => [{ item, level }, ...flattenOutline(item.down ?? [], level + 1)])
}

/** Native outline titles take precedence over font-based candidates at the same location. */
function addOutline(
  doc: Document,
  texts: ReturnType<typeof searchableText>[],
  result: HeadingAnchor[][]
): void {
  let outline: Outline
  try {
    outline = doc.loadOutline() ?? []
  } catch {
    return
  }
  for (const { item, level } of flattenOutline(outline)) {
    const title = item.title?.trim()
    const page = item.page
    if (!title || page === undefined || !texts[page]) {
      continue
    }
    const anchors = result[page]
    if (!anchors) {
      continue
    }
    const existing = anchors.findIndex((anchor) =>
      normalize(anchor.text).includes(normalize(title))
    )
    const offset = existing >= 0 ? anchors[existing]?.offset : locate(texts[page], title)
    if (offset === undefined) {
      continue
    }
    const heading = { offset, level, text: title }
    if (existing >= 0) {
      anchors[existing] = heading
    } else {
      anchors.push(heading)
    }
  }
}

/** Best-effort structure from data already extracted by MuPDF; no OCR or extra model calls. */
export function pdfHeadings(
  doc: Document,
  pages: readonly PageData[],
  layouts: readonly FilteredPageLayout[]
): HeadingAnchor[][] {
  const weights = new Map<number, number>()
  for (const page of pages) {
    for (const item of page.items) {
      const size = Math.round(item.fontSize * 2) / 2
      weights.set(size, (weights.get(size) ?? 0) + item.text.trim().length)
    }
  }
  const bodySize = [...weights].sort((a, b) => b[1] - a[1])[0]?.[0] ?? 12
  const texts = layouts.map((layout) => searchableText(layout.text))
  const result = pages.map((page, index) =>
    pageLines(page).flatMap((line) => {
      const heading = fontHeading(line, bodySize)
      const target = texts[index]
      if (!heading || !target) {
        return []
      }
      const offset = locate(target, heading.text)
      return offset === undefined ? [] : [{ ...heading, offset }]
    })
  )
  addOutline(doc, texts, result)
  return result.map((anchors) => anchors.sort((a, b) => a.offset - b.offset))
}
