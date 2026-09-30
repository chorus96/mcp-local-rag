import { describe, expect, it, vi } from 'vitest'
import { asDouble } from '../../__tests__/test-doubles.js'
import type { SemanticChunker } from '../../chunker/index.js'
import type { EmbedderInterface } from '../../chunker/semantic-chunker.js'
import { buildChunksAndEmbeddings, buildChunksFromParseResult } from '../compute.js'

describe('buildChunksFromParseResult', () => {
  it('attaches a DOCX image to the chunk owning its source position', async () => {
    const text = 'Before text. After text.'
    const chunks = [
      { text: 'Before text.', index: 0, sourceStart: 0, sourceEnd: 11 },
      { text: 'After text.', index: 1, sourceStart: 13, sourceEnd: text.length },
    ]
    const chunkText = vi.fn().mockResolvedValue(chunks)
    const embedBatch = vi.fn().mockResolvedValue([
      [1, 0],
      [0, 1],
    ])
    const png = Uint8Array.from(
      Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=',
        'base64'
      )
    )

    const result = await buildChunksFromParseResult(
      {
        content: text,
        title: 'Document',
        imageAnchors: [{ offset: 12, imageIndex: 0, mimeType: 'image/png', bytes: png }],
      },
      asDouble<SemanticChunker>({ chunkText }),
      { embedBatch } satisfies EmbedderInterface
    )

    expect(result.visualAttachments.get(0)).toEqual([
      expect.objectContaining({ imageIndex: 0, mimeType: expect.stringMatching(/^image\//) }),
    ])
    expect(result.visualAttachments.has(1)).toBe(false)
  })
})

describe('buildChunksAndEmbeddings title prefix', () => {
  const chunks = () => [{ text: 'Body.', index: 0, sourceStart: 0, sourceEnd: 5 }]

  async function run(titlePrefix: boolean, embedder: Partial<EmbedderInterface> = {}) {
    const chunkText = vi.fn().mockResolvedValue(chunks())
    const embedBatch = vi.fn().mockResolvedValue([[1, 0]])
    const result = await buildChunksAndEmbeddings(
      'Body.',
      asDouble<SemanticChunker>({ chunkText }),
      { embedBatch, titlePrefix, ...embedder },
      { title: 'Support Rotation' }
    )
    return { result, chunkText, embedBatch }
  }

  it('embeds behind the title but keeps stored text body-only when enabled', async () => {
    const { result, chunkText, embedBatch } = await run(true)

    expect(chunkText.mock.calls[0]?.[3]).toBe('Title: Support Rotation\n\n')
    expect(embedBatch).toHaveBeenCalledWith(['Title: Support Rotation\n\nBody.'])
    expect(result.chunks[0]?.text).toBe('Body.')
  })

  it('embeds body text unchanged when disabled', async () => {
    const { chunkText, embedBatch } = await run(false)

    expect(chunkText.mock.calls[0]?.[3]).toBe('')
    expect(embedBatch).toHaveBeenCalledWith(['Body.'])
  })

  it('drops a title that would take more than half the token window', async () => {
    const { embedBatch } = await run(true, {
      getTokenLimit: async () => 10,
      countTokens: async (texts) => texts.map(() => 6),
    })

    expect(embedBatch).toHaveBeenCalledWith(['Body.'])
  })
})
