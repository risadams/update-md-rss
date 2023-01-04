/**
 * `FeedParserOptions` is an object with three properties: `feedNamesList`, `userAgent`, and
 * `acceptHeader`. The `feedNamesList` property is an array of strings, the `userAgent` property is a
 * string, and the `acceptHeader` property is a string.
 *
 * The `maxItems` property is not included in the type definition because it is optional.
 *
 * The `FeedParserOptions` type is used in the `FeedParser` class constructor:
 * @property {string[]} feedNamesList - An array of feed names to be used in the feed URL.
 * @property {string} userAgent - The user agent to use when making requests to the feed.
 * @property {string} acceptHeader - The accept header to use when making requests to the feed.
 * @property {number} maxItems - The maximum number of items to return from the feed.
 */
export type FeedParserOptions = {
  feedNamesList: string[]
  userAgent: string
  acceptHeader: string
  maxItems: number
}
