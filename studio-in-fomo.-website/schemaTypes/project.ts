import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short description for cards and previews',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Client Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Large hero image for project page',
    }),
    defineField({
      name: 'services',
      title: 'Services Provided',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of services (e.g., UX Research, UI Design, Development)',
    }),
    defineField({
      name: 'gallery',
      title: 'Project Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
            {
              name: 'wide',
              type: 'boolean',
              title: 'Wide layout (2 columns)',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'process',
      title: 'Project Process',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon (Emoji)',
              type: 'string',
              validation: (Rule) => Rule.max(2),
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'icon',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Live Link',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Display order (lower numbers appear first)',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      featured: 'featured',
    },
    prepare(selection: any) {
      const {title, media, featured} = selection;
      return {
        title: featured ? `⭐ ${title}` : title,
        media,
      }
    },
  },
})
