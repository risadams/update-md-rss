import * as core from '@actions/core'

export async function ProcessFeed(feedUrl: string): Promise<string> {
  return new Promise(() => {
    core.debug(`Processing feed ${feedUrl}`)
  })
}
