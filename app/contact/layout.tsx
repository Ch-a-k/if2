import {Metadata} from 'next';
import {client, queries, getOgImageUrl, type SiteSettings} from '@/lib/sanity';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(queries.siteSettings, {}, {
    next: { 
      revalidate: 3600,
      tags: ['siteSettings', 'contact-seo']
    }
  });
  const siteUrl = 'https://in-fomo.com';
  
  // Use Contact page SEO settings if available, otherwise fallback to global settings
  const ogTitle = settings?.contactPageSeo?.ogTitle || 'Contact Us | IN-FOMO.';
  const ogDescription = settings?.contactPageSeo?.ogDescription || 'Get in touch with our team. Let\'s discuss your next digital project and bring your ideas to life.';
  const ogImageData = settings?.contactPageSeo?.ogImage || settings?.ogImage;
  const ogImageUrl = ogImageData ? getOgImageUrl(ogImageData) : null;

  return {
    title: 'Contact Us | IN-FOMO.',
    description: 'Get in touch with our team. Let\'s discuss your next digital project and bring your ideas to life.',
    keywords: ['contact', 'get in touch', 'digital agency contact', 'project inquiry', 'consultation'],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      url: `${siteUrl}/contact`,
      siteName: 'IN-FOMO.',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: ogImageData?.alt || 'Contact IN-FOMO. - Let\'s Build Together',
      }] : [],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      site: '@infomo',
      creator: '@infomo',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        alt: ogImageData?.alt || 'Contact IN-FOMO.',
      }] : [],
    },
    alternates: {
      canonical: `${siteUrl}/contact`,
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

