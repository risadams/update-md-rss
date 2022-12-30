# Update MD RSS (Github Action)

[![GitHub Actions status | risadams/update-md-rss](

## Usage

1. Create a new workflow file in your repo at `.github/workflows/update-md-rss.yml`
2. Add the following contents to the file:

```yaml
name: Update RSS Feeds
on:
  schedule: # Run workflow automatically
    - cron: "0 * * * *" # Runs every hour
  workflow_dispatch: # Run workflow manually, from Github Actions tab

jobs:
  update-readme-with-blog:
    name: Update an MD file from an RSS feed
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Fetch RSS feed
        uses: risadams/update-md-rss@v1
        with:
          feed_list: "https://risadams.com/feed.xml" ## Update this with your feed URL
```

### Examples

- [ ] Is there an example folder with usage examples?
- [ ] For the browser as well?

## Contribute

If you think this could be better, please [open an issue](https://github.com/risadams/update-md-rss/issues/new)!

Please note that all interactions in this organization fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 1996+ Ris Adams
