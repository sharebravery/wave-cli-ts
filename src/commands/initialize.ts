import * as path from 'node:path'
import chalk from 'chalk'
import * as fs from 'fs-extra'
import { isProjectRoot } from '../utils/isProjectRoot'

export default function initialize() {
  if (!isProjectRoot()) {
    console.error(chalk.red('Not a project directory. Make sure there is a package.json file in the project root.'))
  }
  else {
    const templateFilePath = path.join(__dirname, '../template/wave.config.js') // 模板文件路径
    // eslint-disable-next-line n/prefer-global/process
    const projectRoot = process.cwd() // 获取项目根目录
    const targetFilePath = path.join(projectRoot, 'wave.config.js') // 目标文件路径

    try {
      if (fs.existsSync(targetFilePath)) {
        console.log(chalk.yellow('wave.config.js already exists in project root.'))
      }
      else {
        fs.copySync(templateFilePath, targetFilePath)
        console.log(chalk.green('wave.config.js created in project root.'))
      }
    }
    catch (error: any) {
      console.error(chalk.red('Error creating wave.config.js:', error?.message))
    }
  }
}
