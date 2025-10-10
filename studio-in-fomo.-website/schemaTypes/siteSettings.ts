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

