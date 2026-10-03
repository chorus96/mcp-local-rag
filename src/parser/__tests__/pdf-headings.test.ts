import type { Document } from 'mupdf'
import { describe, expect, it } from 'vitest'
import { asDouble } from '../../__tests__/test-doubles.js'
import type { PageData } from '../pdf-filter.js'
import { pdfHeadings } from '../pdf-headings.js'

const body = 'Ordinary body text repeated to establish the dominant document font size. '.repeat(8)
const line = (text: string, y: number, fontSize = 10, fontName = 'Regular') => ({
  text,
  x: 0,
  y,
  fontSize,
  fontName,
  hasEOL: true,
})

describe('PDF heading inference', () => {
  it('finds numbered headings without an outline while rejecting ordinary bold table labels', () => {
    const doc = asDouble<Document>({ loadOutline: () => null })
    const items: PageData['items'] = [
      line('1 Introduction', 100, 12),
      line(body, 80),
      line('Category', 60, 10, 'Bold'),
      { ...line('Vertical watermark', 50, 24), bbox: [0, 0, 20, 200] },
      line('1.1 Details', 40, 10, 'Bold'),
    ]
    const text = items.map((item) => item.text).join('\n')
    expect(pdfHeadings(doc, [{ pageNum: 1, items }], [{ text, textFragments: [] }])[0]).toEqual([
      { offset: 0, level: 1, text: '1 Introduction' },
      { offset: text.indexOf('1.1 Details'), level: 2, text: '1.1 Details' },
    ])
  })

  it('uses the actual numbered heading instead of an earlier mention of its outline title', () => {
    const doc = asDouble<Document>({
      loadOutline: () => [{ title: 'Architecture', page: 0, uri: undefined, open: false }],
    })
    const items: PageData['items'] = [
      line(`Architecture is discussed later. ${body}`, 100),
      line('3', 40, 12),
      { ...line('Architecture', 40, 12), x: 20 },
    ]
    const text = `Architecture is discussed later. ${body}\n3 Architecture`
    const pages: PageData[] = [{ pageNum: 1, items }]
    expect(pdfHeadings(doc, pages, [{ text, textFragments: [] }])[0]).toEqual([
      { offset: text.indexOf('3 Architecture'), level: 1, text: 'Architecture' },
    ])
  })

  it('matches a wrapped full-width outline heading after text normalization', () => {
    const doc = asDouble<Document>({
      loadOutline: () => [{ title: '１.１  目的とスコープ', page: 0, uri: undefined, open: false }],
    })
    const text = '１.１ 目的と\nスコープ\n本文'
    expect(
      pdfHeadings(doc, [{ pageNum: 1, items: [line(body, 80)] }], [{ text, textFragments: [] }])[0]
    ).toEqual([{ offset: 0, level: 1, text: '１.１  目的とスコープ' }])
  })
})
