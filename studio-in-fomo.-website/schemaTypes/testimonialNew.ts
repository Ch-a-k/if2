import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'testimonialNew',
  title: 'Testimonial (New)',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Position/Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hasMedia',
      title: 'Has Media (Photo/Video)',
      type: 'boolean',
      description: 'Toggle if testimonial includes photo or video',
      initialValue: false,
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
      },
      hidden: ({parent}) => !parent?.hasMedia,
    }),
    defineField({
      name: 'mediaImage',
      title: 'Image',
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
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'videoSource',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          {title: 'Upload Video File', value: 'file'},
          {title: 'YouTube/Vimeo URL', value: 'url'},
        ],
      },
      initialValue: 'url',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
    defineField({
      name: 'mediaVideoFile',
      title: 'Video File',
      type: 'file',
      options: {
        accept: 'video/mp4,video/webm,video/ogg',
      },
      description: 'Upload video file (MP4, WebM, or OGG format)',
      hidden: ({parent}) => parent?.videoSource !== 'file',
    }),
    defineField({
      name: 'mediaVideoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube embed URL (https://www.youtube.com/embed/VIDEO_ID) or Vimeo URL',
      placeholder: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      hidden: ({parent}) => parent?.videoSource !== 'url',
    }),
    defineField({
      name: 'hasCompanyLogo',
      title: 'Has Company Logo',
      type: 'boolean',
      description: 'Toggle if you want to display company logo',
      initialValue: false,
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
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
      hidden: ({parent}) => !parent?.hasCompanyLogo,
    }),
    defineField({
      name: 'clutchLink',
      title: 'Clutch Review Link',
      type: 'url',
      description: 'Link to review on Clutch.co',
    }),
    defineField({
      name: 'caseStudySlug',
      title: 'Case Study Project',
      type: 'reference',
      to: [{type: 'project'}],
      description: 'Link to related project/case study',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'company',
      hasMedia: 'hasMedia',
      media: 'mediaImage',
    },
    prepare(selection: any) {
      const {title, subtitle, hasMedia, media} = selection;
      return {
        title: hasMedia ? `📷 ${title}` : title,
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
