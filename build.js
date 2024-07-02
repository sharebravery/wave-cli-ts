const fs = require('node:fs')
const path = require('node:path')

// npm publish => npm publish --access public

// 源文件路径
const sourceFilePath = path.join(__dirname, 'package.json')

// 目标文件路径，这里假设输出目录为 dist
const targetFilePath = path.join(__dirname, 'dist', 'package.json')

// 复制文件
fs.copyFile(sourceFilePath, targetFilePath, (err) => {
  if (err)
    console.error('Error copying package.json:', err)

  else
    console.log('package.json copied to dist directory.')
})
