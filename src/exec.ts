import {spawn, SpawnOptions} from 'child_process'

/**
 * Executes a command and returns its result as promise
 * @param cmd {string} command to execute
 * @param args {array} command line args
 * @param options {Object} extra options
 * @return {Promise<Object>}
 */
export async function exec(
  cmd: string,
  args: readonly string[],
  options: SpawnOptions
): Promise<{}> {
  return new Promise((resolve, reject) => {
    let outputData = ''
    const optionsToCLI = {
      ...options
    }
    if (!optionsToCLI.stdio) {
      Object.assign(optionsToCLI, {stdio: ['inherit', 'inherit', 'inherit']})
    }
    const app = spawn(cmd, args, optionsToCLI)
    if (app.stdout) {
      // Only needed for pipes
      app.stdout.on('data', function (data: {toString: () => string}) {
        outputData += data.toString()
      })
    }

    app.on('close', (code: number) => {
      if (code !== 0) {
        return reject(new Error(`${code} ${outputData})`))
      }
      return resolve({code, outputData})
    })
    app.on('error', () => reject(new Error(`1 ${outputData})`)))
  })
}
