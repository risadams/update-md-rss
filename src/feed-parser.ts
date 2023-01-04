import Parser from 'rss-parser'
import {Feed} from './model/feed'
import {FeedParserOptions} from './model/feed-parser-options'
import {Post} from './model/post'

/**
 * It takes a list of RSS feed URLs, fetches them, parses them, and returns a list of posts
 * @param {FeedParserOptions} options - FeedParserOptions
 * @returns An array of Feed objects.
 */
export async function FeedParser(options: FeedParserOptions): Promise<Feed[]> {
  const parser: Parser = new Parser({
    headers: {
      'User-Agent': options.userAgent
    }
  })

  if (isNaN(options.maxItems)) {
    throw new Error('max items not a number')
  }

  if (options.feedNamesList.length === 0) {
    throw new Error('feed_list should have at least one url')
  }

  const parsedFeeds: Feed[] = []

  for (const feedUrl of options.feedNamesList) {
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
    posts.slice(0, options.maxItems)

    parsedFeeds.push({title, posts})
  }

  return parsedFeeds
}
