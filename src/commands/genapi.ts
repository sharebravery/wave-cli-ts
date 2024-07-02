import { generateService } from '@sharebravery/openapi'
import type { GenerateServiceProps } from '@sharebravery/openapi'
import { loadConfig } from 'unconfig'
import chalk from 'chalk'
import type { IWaveConfig } from '../types'

export type GenerateServiceArgs = GenerateServiceProps

export default async function main(url?: string) {
  try {
    const { config, sources } = await loadConfig<IWaveConfig>({
      sources: [
        {
          files: 'versionrc',
          extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', ''],
        },
      ],
      merge: false,
    })

    await generateService(config.commands.gen_api_ts.apiDocs)
    console.log(chalk.green('API generation successful!')) // 提示 API 生成成功
  }
  catch (error) {
    console.error(chalk.red('Error loading config:', error))
  }
}
