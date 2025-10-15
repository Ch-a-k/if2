import Script from 'next/script';
import { client, queries } from '@/lib/sanity';

async function getGTMId() {
  try {
    const settings = await client.fetch(queries.siteSettings, {}, {
      next: { revalidate: 3600, tags: ['siteSettings'] }
    });
    return settings?.gtmId || null;
  } catch (error) {
    console.error('Failed to fetch GTM settings:', error);
    return null;
  }
}

export default async function GoogleTagManager() {
  const gtmId = await getGTMId();

  if (!gtmId) return null;

  return (
    <>
      {/* Google Tag Manager - в <head> */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      {/* Google Tag Manager (noscript) - в <body> */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

