import inquirer from 'inquirer'
import simpleGit from 'simple-git'
import chalk from 'chalk'
import { loadConfig } from 'unconfig'
import { isGitRepository } from '../utils/isGitRepository'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import vConfig from '../template/versionrc.js'

const versionrcConfig = vConfig

interface ICommitType {
  type: string
  section: string
}
export default async function main(msg: any) {
  if (!await isGitRepository()) {
    console.error(chalk.red('Current directory is not a Git repository.'))
    return
  }

  if (msg.length > 0) {
    // If there are already commit messages provided as arguments
    const commitMessage = msg.join(' ')

    const git = simpleGit()
    await git.add('.').commit(commitMessage)
    console.log(chalk.green('Commit successful!'))
  }
  else {
    // No commit message provided, prompt the user
    const { config, sources } = await loadConfig<{ types: ICommitType[] }>({
      sources: [
        {
          files: 'versionrc',
          extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
        },
        // {
        //   files: 'package.json',
        //   extensions: [],
        //   rewrite(config) {
        //     return config
        //   },
        // },
      ],
      // if false, the only the first matched will be loaded
      // if true, all matched will be loaded and deep merged
      merge: false,
    })

    const trulyConfig = config ?? versionrcConfig

    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'Select the type of change:',
        choices: trulyConfig.types.map(type => type.section),
      },
      //   {
      //     type: 'input',
      //     name: 'scope',
      //     message: 'Enter the scope (optional):',
      //   },
      {
        type: 'input',
        name: 'subject',
        message: 'Enter a short description:',
      },
    //   {
    //     type: 'input',
    //     name: 'body',
    //     message: 'Enter a longer description (optional):',
    //   },
    ])

    if (!answers.subject) {
      console.error(chalk.red('Subject cannot be empty. Please provide a short description.'))
      return
    }

    const type = trulyConfig.types.find(e => e.section === answers.type)?.type

    const commitMessage = `${type}${
      answers.scope ? `(${answers.scope})` : ''
    }: ${answers.subject}\n\n${answers.body ?? ''}`

    const git = simpleGit()
    await git.add('.').commit(commitMessage)
    console.log(chalk.green('Commit successful!'))
  }
}
