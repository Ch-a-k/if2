import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import structure from './structure'

export default defineConfig({
  name: 'default',
  title: 'IN-FOMO. Website CMS',

  projectId: 'wx6ubarj',
  dataset: 'production',

  plugins: [
    structureTool({
      structure,
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
