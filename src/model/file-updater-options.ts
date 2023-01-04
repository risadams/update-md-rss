/**
 * `FileUpdaterOptions` is an object with the properties `file`, `tokenStart`, `tokenEnd`, and
 * `content`.
 * @property {string} file - The file to update
 * @property {string} tokenStart - The string that marks the start of the token.
 * @property {string} tokenEnd - The string that marks the end of the token.
 * @property {string} content - The content to be inserted between the tokenStart and tokenEnd.
 */
export type FileUpdaterOptions = {
  file: string
  tokenStart: string
  tokenEnd: string
  content: string
}
