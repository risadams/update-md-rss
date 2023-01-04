import {expect, test} from '@jest/globals'
import {FeedParser} from '../feed-parser'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(FeedParser([], '', '', input)).rejects.toThrow(
    'max items not a number'
  )
})
