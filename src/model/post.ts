/**
 * A Post is an object with a title, url, date, description, and categories property. The title, url,
 * and description properties are strings or undefined. The date property is a Date or a number. The
 * categories property is an array of strings or undefined.
 * @property {string | undefined} title - The title of the post.
 * @property {string | undefined} url - The URL of the post.
 * @property {Date | number} date - The date the post was published.
 * @property {string | undefined} description - The description of the post.
 * @property {string[] | undefined} categories - An array of categories that the post belongs to.
 */
export type Post = {
  title: string | undefined
  url: string | undefined
  date: Date | number
  description: string | undefined
  categories: string[] | undefined
}
