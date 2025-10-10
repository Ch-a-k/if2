'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleTagManager() {
  const [gtmId, setGtmId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch GTM ID from API/Sanity
    const fetchGTM = async () => {
      try {
        const response = await fetch('/api/settings');
        const data = await response.json();
        if (data.gtmId) {
          setGtmId(data.gtmId);
        }
      } catch (error) {
        console.error('Failed to fetch GTM settings:', error);
        // Fallback to environment variable
        const envGTM = process.env.NEXT_PUBLIC_GTM_ID;
        if (envGTM) setGtmId(envGTM);
      }
    };

    fetchGTM();
  }, []);

  if (!gtmId) return null;

  return (
    <>
      {/* Google Tag Manager */}
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
      {/* Google Tag Manager (noscript) */}
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

