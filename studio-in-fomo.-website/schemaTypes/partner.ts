import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Partner Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Alternative text for accessibility (required)',
          validation: (Rule) => Rule.required().error('Alt text is required for accessibility'),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Website URL',
      type: 'url',
      description: 'Partner website link',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Short description or tagline (optional)',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      media: 'logo',
    },
  },
})
