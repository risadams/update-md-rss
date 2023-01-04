import Parser from 'rss-parser'
import {Feed} from './model/feed'
import {FeedParserOptions} from './model/feed-parser-options'
import {Post} from './model/post'

export async function FeedParser(args: FeedParserOptions): Promise<Feed[]> {
  const parser: Parser = new Parser({
    headers: {
      'User-Agent': args.userAgent,
      Accept: args.acceptHeader
    }
  })

  if (isNaN(args.maxItems)) {
    throw new Error('max items not a number')
  }

  if (args.feedNamesList.length === 0) {
    throw new Error('feed_list should have at least one url')
  }

  const parsedFeeds: Feed[] = []

  for (const feedUrl of args.feedNamesList) {
    const feed = await parser.parseURL(feedUrl)
    const posts: Post[] = []
    const title = feed.title

    for (const item of feed.items) {
      const categories = item.categories ? item.categories : []
      const post = {
        title: item.title,
        url: item.link?.trim(),
        date: item.pubDate ? new Date(item.pubDate) : Date.now(),
        description: item.contentSnippet ? item.contentSnippet.trim() : '',
        categories
      }
      posts.push(post)
    }

    posts.sort((a, b) => b.date.valueOf() - a.date.valueOf())
    posts.slice(0, args.maxItems)

    parsedFeeds.push({title, posts})
  }

  return parsedFeeds
}
