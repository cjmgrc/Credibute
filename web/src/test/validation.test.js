import { describe, expect, it } from 'vitest'
import { firstError, repoUrlSchema } from '@/domain/validation'

describe('repository URL validation', () => {
  it('reports malformed URLs instead of throwing', () => {
    const result = repoUrlSchema('github').safeParse('not-a-url')

    expect(result.success).toBe(false)
    expect(firstError(result)).toBe("That doesn’t look like a link.")
  })

  it("accepts a repository URL from the selected provider", () => {
    const result = repoUrlSchema('github').safeParse('https://github.com/owner/repository')

    expect(result.success).toBe(true)
  })
})
