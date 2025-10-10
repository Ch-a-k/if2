import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Category',
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
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'type',
      title: 'Category Type',
      type: 'string',
      options: {
        list: [
          {title: 'Blog', value: 'blog'},
          {title: 'Project', value: 'project'},
          {title: 'Both', value: 'both'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color Accent',
      type: 'string',
      description: 'Hex color code (e.g., #FF5733)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'type',
    },
    prepare(selection: any) {
      const {title, type} = selection;
      return {
        title: title,
        subtitle: type,
      }
    },
  },
})
