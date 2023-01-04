import {expect, test} from '@jest/globals'
import {FeedParser} from '../src/feed-parser'
import {TemplateBuilder} from '../src/template-builder'

const defaultOptions = {
  maxItems: 5,
  feedNamesList: ['https://risadams.com/feed.xml'],
  userAgent: '',
  acceptHeader: ''
}

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  await expect(
    FeedParser({
      maxItems: input,
      feedNamesList: [],
      userAgent: '',
      acceptHeader: ''
    })
  ).rejects.toThrow('max items not a number')
})

test('feed_list should have at least one url', async () => {
  await expect(
    FeedParser({
      maxItems: 5,
      feedNamesList: [],
      userAgent: '',
      acceptHeader: ''
    })
  ).rejects.toThrow('feed_list should have at least one url')
})

test('default opions set properly', async () => {
  await expect(FeedParser(defaultOptions)).resolves.not.toThrow()
})

test('Template Builds', async () => {
  const feeds = await FeedParser(defaultOptions)
  await expect(TemplateBuilder(feeds)).resolves.not.toThrow()
})
