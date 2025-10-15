import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import GoogleTagManager from '@/components/GoogleTagManager';
import Analytics from '@/components/Analytics';
import { client, queries, getOgImageUrl } from '@/lib/sanity';

export async function generateMetadata() {
  try {
    const settings = await client.fetch(queries.siteSettings, {}, {
      next: { 
        revalidate: 3600,
        tags: ['siteSettings', 'home-seo']
      }
    });

    // Use home page SEO settings if available, otherwise fallback to global settings
    const ogTitle = settings?.homePageSeo?.ogTitle || settings?.title || 'IN-FOMO. - Digital Solutions That Matter';
    const ogDescription = settings?.homePageSeo?.ogDescription || settings?.description || 'IN-FOMO. builds innovative solutions for forward-thinking businesses.';
    const ogImageData = settings?.homePageSeo?.ogImage || settings?.ogImage;
    const ogImageUrl = ogImageData ? getOgImageUrl(ogImageData) : null;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://in-fomo.com';

    return {
      title: {
        default: settings?.title || 'IN-FOMO. - Digital Solutions That Matter',
        template: '%s | IN-FOMO.'
      },
      description: settings?.description || 'IN-FOMO. builds innovative solutions for forward-thinking businesses. From web and mobile apps to comprehensive digital strategies.',
      keywords: ['digital agency', 'web development', 'mobile apps', 'Web3', 'blockchain', 'digital innovation', 'software development'],
      metadataBase: new URL(siteUrl),
      openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        title: ogTitle,
        description: ogDescription,
        siteName: 'IN-FOMO.',
        images: ogImageUrl ? [{
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: ogImageData?.alt || 'IN-FOMO. - Digital Solutions'
        }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: ogTitle,
        description: ogDescription,
        site: '@infomo',
        creator: '@infomo',
        images: ogImageUrl ? [{
          url: ogImageUrl,
          alt: ogImageData?.alt || 'IN-FOMO. - Digital Solutions'
        }] : [],
      },
      icons: {
        icon: [
          { url: '/favicon.ico' },
          { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        apple: '/apple-touch-icon.png',
      },
    };
  } catch (error) {
    // Return default metadata if fetch fails
    return {
      title: 'IN-FOMO. - Digital Solutions That Matter',
      description: 'IN-FOMO. builds innovative solutions for forward-thinking businesses.',
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <GoogleTagManager />
      </head>
      <body>
        <Analytics />
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
