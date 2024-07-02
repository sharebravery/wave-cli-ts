import path from 'node:path'
import * as fs from 'node:fs'

export function isProjectRoot() {
  // eslint-disable-next-line n/prefer-global/process
  const projectRoot = process.cwd() // 获取项目根目录
  const packageJsonPath = path.join(projectRoot, 'package.json')

  try {
    fs.accessSync(packageJsonPath, fs.constants.R_OK) // 检查文件是否可读
    return true // 如果可读，说明是项目目录
  }
  catch (error) {
    return false // 如果不可读，说明不是项目目录
  }
}
