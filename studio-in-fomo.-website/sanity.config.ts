import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import structure from './structure'
import {cacheRefreshAction} from './actions/cacheRefresh'

export default defineConfig({
  name: 'default',
  title: 'IN-FOMO. Website CMS',

  projectId: 'wx6ubarj',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
    cacheRefreshAction(),
  ],

  schema: {
    types: schemaTypes,
  },
})
