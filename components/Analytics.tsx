'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Check cookie consent before initializing
    const consent = localStorage.getItem('cookieConsent');
    if (consent) {
      const { analytics, marketing } = JSON.parse(consent);
      
      // Initialize Hotjar if analytics is approved
      if (analytics && typeof window !== 'undefined') {
        initHotjar();
      }

      // Initialize Cloudflare if functional is approved
      initCloudflare();
    }
  }, []);

  const initHotjar = () => {
    if (typeof window !== 'undefined' && !(window as any).hj) {
      (function(h: any, o: any, t: any, j: any, a: any, r: any) {
        h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
        h._hjSettings = { hjid: 6543563, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script');
        r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    }
  };

  const initCloudflare = () => {
    // Cloudflare Web Analytics - add your token
    const cfToken = process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN;
    if (!cfToken) return;

    const script = document.createElement('script');
    script.defer = true;
    script.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    script.setAttribute('data-cf-beacon', JSON.stringify({ token: cfToken }));
    document.head.appendChild(script);
  };

  return (
    <>
      {/* Hotjar Tracking Code */}
      <Script
        id="hotjar"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:6543563,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />

      {/* Cloudflare Web Analytics */}
      {process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN && (
        <Script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={`{"token": "${process.env.NEXT_PUBLIC_CLOUDFLARE_TOKEN}"}`}
        />
      )}
    </>
  );
}

