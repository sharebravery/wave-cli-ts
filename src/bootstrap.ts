#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'

import commit from './commands/commit'
import genapi from './commands/genapi'
import initialize from './commands/initialize'

console.log(chalk.blueBright('@Wave-Cli Is Boot'))

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires
program.version(require('../package').version)

program
  .command('init')
  .description('initialize wave config')
  .action(async () => {
    await initialize()
  })

program
  .command('genapi:ts [url...]')
  .description('OpenAPI To TypeScript')
  .action(async (url) => {
    await genapi(url)
  })

program
  .command('commit [msg...]')
  .description('Create a Git commit following custom commit conventions')
  .action(async (msg) => {
    await commit(msg)
  })

// eslint-disable-next-line n/prefer-global/process
program.parse(process.argv)
