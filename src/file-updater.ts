import fs from 'fs'
import {FileUpdaterOptions} from './model/file-updater-options'

/**
 * It takes a file, finds the start and end comment tags, and replaces the content between them with
 * the new content
 * @param {FileUpdaterOptions} options - {
 */
export async function FileUpdater(options: FileUpdaterOptions): Promise<void> {
  try {
    const fileContent = fs.readFileSync(options.file, 'utf8')
    const currentContent = fileContent
    const startingTag = `<!-- ${options.tokenStart}:`
    const endingTag = `<!-- ${options.tokenEnd}:`
    const closingTag = '-->'

    const startOpenIndex = fileContent.indexOf(startingTag)
    const startCloseIndex = fileContent.indexOf(closingTag, startOpenIndex)
    const endOpenIndex = fileContent.indexOf(endingTag)
    const endCloseIndex = fileContent.indexOf(closingTag, endOpenIndex)

    if (
      startOpenIndex === -1 ||
      endOpenIndex === -1 ||
      startCloseIndex === -1 ||
      endCloseIndex === -1
    ) {
      throw new Error('Cannot find the comment start/close tags on the file:')
    }

    const newContent = [
      fileContent.slice(0, endOpenIndex + closingTag.length),
      '\n',
      options.content,
      '\n',
      fileContent.slice(startCloseIndex)
    ].join('')

    if (currentContent !== newContent) {
      fs.writeFileSync(options.file, newContent)
    }
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error('Unable to update file content')
  }
}
