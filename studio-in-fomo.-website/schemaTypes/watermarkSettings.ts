import {defineType} from 'sanity'

export default defineType({
  name: 'watermarkSettings',
  title: 'Watermark Settings',
  type: 'object',
  fields: [
    {
      name: 'position',
      title: 'Watermark Position',
      type: 'string',
      options: {
        list: [
          {title: 'Top Left', value: 'top-left'},
          {title: 'Top Right', value: 'top-right'},
          {title: 'Bottom Left', value: 'bottom-left'},
          {title: 'Bottom Right', value: 'bottom-right'},
          {title: 'Center', value: 'center'},
        ],
        layout: 'radio',
      },
      initialValue: 'center',
      description: 'Position of the watermark on the image (default: center)',
    },
    {
      name: 'opacity',
      title: 'Watermark Opacity',
      type: 'number',
      validation: (Rule: any) => Rule.min(0).max(100),
      initialValue: 25,
      description: 'Watermark opacity in percentage (0-100, default: 25%)',
    },
  ],
})

