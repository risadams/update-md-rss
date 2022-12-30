const process = require('process');
const Parser = require('rss-parser');
const core = require('@actions/core');
const fs = require('fs');

core.setSecret(GITHUB_TOKEN);
const rawFeedListArg = core.getInput('feed_list').trim();

// Reading feed list from the workflow input
let feedList = rawFeedListArg.split(',').map(item => item.trim());
if (feedList.length === 0) {
  core.error('feed_list should have at least one url');
  process.exit(1);
}

// Grabbing feed names and converting it into array
const feedNames = core.getInput('feed_names').trim();
const feedNamesList = feedNames.split(',').map(item => item.trim());

feedList.forEach((feedUrl) => {
  //TODO
});
