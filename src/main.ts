import * as core from '@actions/core'
import * as process from 'process'
import {FeedParser} from './feed-parser'

async function run(): Promise<void> {
  try {
    core.debug(new Date().toTimeString())

    const GITHUB_TOKEN: string = core.getInput('gh_token')
    const rawFeedListArg: string = core.getInput('feed_list')?.trim()
    const userAgent: string = core.getInput('user_agent')?.trim()
    const acceptHeader: string = core.getInput('accept_header')?.trim()
    const maxItems: number = parseInt(core.getInput('max_items'), 10)

    core.setSecret(GITHUB_TOKEN)

    // Reading feed list from the workflow input
    const feedList = rawFeedListArg.split(',').map(item => item.trim())
    if (feedList.length === 0) {
      core.error('feed_list should have at least one url')
      process.exit(1)
    }

    // Grabbing feed names and converting it into array
    const feedNames = core.getInput('feed_names').trim()
    const feedNamesList = feedNames.split(',').map(item => item.trim())

    const feeds = await FeedParser(
      feedNamesList,
      userAgent,
      acceptHeader,
      maxItems
    )

    core.debug(JSON.stringify(feeds))

    core.debug(new Date().toTimeString())
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
