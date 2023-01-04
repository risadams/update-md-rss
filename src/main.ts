import * as core from '@actions/core'
import * as process from 'process'
import {ProcessFeed} from './process-feed'

async function run(): Promise<void> {
  try {
    core.debug(new Date().toTimeString())

    const GITHUB_TOKEN: string = core.getInput('gh_token')
    const rawFeedListArg: string = core.getInput('feed_list').trim()

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

    for (const feedUrl of feedNamesList) {
      await ProcessFeed(feedUrl)
    }

    core.debug(new Date().toTimeString())
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
