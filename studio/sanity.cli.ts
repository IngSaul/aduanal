import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './env'

export default defineCliConfig({
  api: { projectId, dataset },
  // `npx sanity deploy` publishes the Studio at https://andeus.sanity.studio
  studioHost: 'andeus',
  deployment: { autoUpdates: true },
})
