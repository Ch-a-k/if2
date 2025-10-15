export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      description: 'Main title for the website',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      description: 'Meta description for SEO',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(160),
    },
    {
      name: 'ogImage',
      title: 'OG Image',
      type: 'image',
      description: 'Open Graph image (1200x630px recommended)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    },
    {
      name: 'watermarkLogo',
      title: 'Watermark Logo',
      type: 'image',
      description: 'Logo to use as watermark on images (PNG with transparency recommended)',
      options: {
        hotspot: false,
      },
    },
    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      description: 'Site favicon (SVG or PNG)',
    },
    {
      name: 'gtmId',
      title: 'Google Tag Manager ID',
      type: 'string',
      description: 'GTM Container ID (e.g., GTM-XXXXXXX)',
      placeholder: 'GTM-XXXXXXX',
    },
    {
      name: 'cloudflareToken',
      title: 'Cloudflare Web Analytics Token',
      type: 'string',
      description: 'Cloudflare Analytics token',
    },
    {
      name: 'hotjarId',
      title: 'Hotjar Site ID',
      type: 'number',
      description: 'Hotjar tracking ID',
    },
    {
      name: 'telegramBotToken',
      title: 'Telegram Bot Token',
      type: 'string',
      description: 'Telegram Bot API token from @BotFather',
      placeholder: '1234567890:ABCdefGHIjklmNOPqrstUVwxyz',
    },
    {
      name: 'telegramChatId',
      title: 'Telegram Chat ID',
      type: 'string',
      description: 'Telegram group/channel Chat ID (with minus for groups)',
      placeholder: '-1001234567890',
    },
    // Page-specific SEO settings
    {
      name: 'homePageSeo',
      title: '🏠 Home Page SEO',
      type: 'object',
      description: 'SEO settings for the home page',
      fields: [
        {
          name: 'ogTitle',
          title: 'OG Title',
          type: 'string',
          description: 'Open Graph title (for social media sharing)',
        },
        {
          name: 'ogDescription',
          title: 'OG Description',
          type: 'text',
          rows: 3,
          description: 'Open Graph description (for social media sharing)',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Open Graph image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'aboutPageSeo',
      title: '👥 About Page SEO',
      type: 'object',
      description: 'SEO settings for the About page',
      fields: [
        {
          name: 'ogTitle',
          title: 'OG Title',
          type: 'string',
          description: 'Open Graph title (for social media sharing)',
        },
        {
          name: 'ogDescription',
          title: 'OG Description',
          type: 'text',
          rows: 3,
          description: 'Open Graph description (for social media sharing)',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Open Graph image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'worksPageSeo',
      title: '💼 Works Page SEO',
      type: 'object',
      description: 'SEO settings for the Works/Portfolio page',
      fields: [
        {
          name: 'ogTitle',
          title: 'OG Title',
          type: 'string',
          description: 'Open Graph title (for social media sharing)',
        },
        {
          name: 'ogDescription',
          title: 'OG Description',
          type: 'text',
          rows: 3,
          description: 'Open Graph description (for social media sharing)',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Open Graph image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'blogPageSeo',
      title: '📝 Blog Page SEO',
      type: 'object',
      description: 'SEO settings for the Blog page',
      fields: [
        {
          name: 'ogTitle',
          title: 'OG Title',
          type: 'string',
          description: 'Open Graph title (for social media sharing)',
        },
        {
          name: 'ogDescription',
          title: 'OG Description',
          type: 'text',
          rows: 3,
          description: 'Open Graph description (for social media sharing)',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Open Graph image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
    {
      name: 'contactPageSeo',
      title: '📧 Contact Page SEO',
      type: 'object',
      description: 'SEO settings for the Contact page',
      fields: [
        {
          name: 'ogTitle',
          title: 'OG Title',
          type: 'string',
          description: 'Open Graph title (for social media sharing)',
        },
        {
          name: 'ogDescription',
          title: 'OG Description',
          type: 'text',
          rows: 3,
          description: 'Open Graph description (for social media sharing)',
          validation: (Rule: any) => Rule.max(160),
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
          description: 'Open Graph image (1200x630px recommended)',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection: any) {
      const { title } = selection;
      return {
        title: title || 'Site Settings',
        subtitle: 'Global site configuration',
      };
    },
  },
};

