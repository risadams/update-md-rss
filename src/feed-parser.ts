import Parser from 'rss-parser'

export async function FeedParser(
  feedNamesList: string[],
  userAgent: string,
  acceptHeader: string,
  maxItems: number
): Promise<object> {
  const parser: Parser = new Parser({
    headers: {
      'User-Agent': userAgent,
      Accept: acceptHeader
    }
  })

  if (isNaN(maxItems)) {
    throw new Error('max items not a number')
  }

  const parsedFeeds = []

  for (const feedUrl of feedNamesList) {
    const feed = await parser.parseURL(feedUrl)
    const posts = []
    const title = feed.title

    for (const item of feed.items) {
      const categories = item.categories ? item.categories : []
      const post = {
        title: item.title,
        url: item.link?.trim(),
        date: item.pubDate ? new Date(item.pubDate) : Date.now(),
        description: item.content ? item.content.trim() : '',
        categories
      }
      posts.push(post)
    }

    posts.sort((a, b) => b.date.valueOf() - a.date.valueOf())
    posts.slice(0, maxItems)

    parsedFeeds.push({title, posts})
  }
  return parsedFeeds
}
