import {Post} from './post'

/**
 * Feed is an object with a title property that is a string or undefined, and a posts property that is
 * an array of Post objects.
 * @property {string | undefined} title - The title of the feed.
 * @property {Post[]} posts - An array of Post objects.
 */
export type Feed = {
  title: string | undefined
  posts: Post[]
}
