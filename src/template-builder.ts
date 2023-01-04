import {Feed} from './model/feed'

export async function TemplateBuilder(feeds: Feed[]): Promise<string> {
  let md = ''

  for (const feed of feeds) {
    md += `### ${feed.title}\n\n`
    for (const post of feed.posts) {
      md += `- [${post.title}](${post.url})\n\n`
      //md += `${post.description}\n\n`
    }
  }

  return md
}
