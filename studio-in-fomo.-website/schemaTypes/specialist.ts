import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'specialist',
  title: 'Specialist Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "Mobile Developers", "UX/UI Designers"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'count',
      title: 'Number of Specialists',
      type: 'number',
      description: 'How many specialists in this category',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'iconType',
      title: 'Icon Type',
      type: 'string',
      options: {
        list: [
          {title: 'Emoji', value: 'emoji'},
          {title: 'SVG Logo', value: 'svg'},
        ],
      },
      initialValue: 'emoji',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Single emoji character (e.g., 📱, 🎨, ⚡)',
      validation: (Rule) => Rule.max(2),
      hidden: ({parent}) => parent?.iconType !== 'emoji',
    }),
    defineField({
      name: 'svgCode',
      title: 'SVG Code',
      type: 'text',
      description: 'Paste SVG code here (e.g., <svg>...</svg>)',
      rows: 5,
      hidden: ({parent}) => parent?.iconType !== 'svg',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first (e.g., 10, 20, 30...)',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      count: 'count',
      icon: 'icon',
      iconType: 'iconType',
    },
    prepare(selection: any) {
      const {title, count, icon, iconType} = selection;
      return {
        title: iconType === 'emoji' ? `${icon} ${title}` : `${title}`,
        subtitle: `${count} specialists`,
      }
    },
  },
})
