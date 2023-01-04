import * as core from '@actions/core'
import * as process from 'process'
import {FeedParser} from './feed-parser'
import {TemplateBuilder} from './template-builder'
import {FileUpdater} from './file-updater'
import {exec} from './exec'

async function run(): Promise<void> {
  try {
    core.debug(new Date().toTimeString())

    const GITHUB_TOKEN: string = core.getInput('gh_token')
    const rawFeedListArg: string = core.getInput('feed_list')?.trim()
    const userAgent: string = core.getInput('user_agent')?.trim()
    const maxItems: number = parseInt(core.getInput('max_items'), 10)
    const filePath: string = core.getInput('file_path')?.trim()
    const gitUser = core.getInput('commit_email')
    const gitEmail = core.getInput('committer_email')
    const commitMessage = core.getInput('commit_message')

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

    // Fetch and parse feeds
    const feeds = await FeedParser({
      feedNamesList,
      userAgent,
      maxItems
    })

    // Converte the parsed feeds into a markdown template
    const template = await TemplateBuilder(feeds)

    await FileUpdater({
      file: filePath,
      tokenStart: 'REPLACE_BLOG_START',
      tokenEnd: 'REPLACE_BLOG_END',
      content: template
    })

    // Commit to readme

    //set git email address
    await exec('git', ['config', '--global', 'user.email', gitEmail], {})
    await exec('git', ['config', '--global', 'user.name', gitUser], {})
    //set git auth token
    await exec(
      'git',
      [
        'remote',
        'set-url',
        'origin',
        `https://${githubToken}@github.com/${process.env.GITHUB_REPOSITORY}.git`
      ],
      {}
    )

    await exec('git', ['add', filePath], {})
    await exec('git', ['commit', '-m', commitMessage], {})
    await exec('git', ['push'], {})

    core.debug(new Date().toTimeString())
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
