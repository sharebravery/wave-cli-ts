import type { GenerateServiceProps } from '@sharebravery/openapi'

interface IAPIDocs extends GenerateServiceProps {
}

interface ICommand {
  gen_api_ts: { apiDocs: IAPIDocs }
}

export interface IWaveConfig {
  commands: ICommand
}
