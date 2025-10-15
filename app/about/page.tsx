import {Metadata} from 'next';
import {client, queries, getOgImageUrl, type SiteSettings} from '@/lib/sanity';
import styles from './page.module.css';
import TeamSection from '@/components/TeamSection';
import ServicesTabsSection from '@/components/ServicesTabsSection';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(queries.siteSettings, {}, {
    next: { 
      revalidate: 3600,
      tags: ['siteSettings', 'about-seo']
    }
  });
  const siteUrl = 'https://in-fomo.com';
  
  // Use About page SEO settings if available, otherwise fallback to global settings
  const ogTitle = settings?.aboutPageSeo?.ogTitle || 'About Us | IN-FOMO.';
  const ogDescription = settings?.aboutPageSeo?.ogDescription || 'We build digital products that matter. From startups to enterprises, we transform ideas into exceptional experiences.';
  const ogImageData = settings?.aboutPageSeo?.ogImage || settings?.ogImage;
  const ogImageUrl = ogImageData ? getOgImageUrl(ogImageData) : null;

  return {
    title: 'About Us | IN-FOMO.',
    description: 'We build digital products that matter. From startups to enterprises, we transform ideas into exceptional experiences.',
    keywords: ['about us', 'digital agency', 'web development team', 'mobile development', 'innovation', 'technology company'],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      url: `${siteUrl}/about`,
      siteName: 'IN-FOMO.',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: ogImageData?.alt || 'About IN-FOMO. - Digital Innovation Team',
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
        alt: ogImageData?.alt || 'About IN-FOMO.',
      }] : [],
    },
    alternates: {
      canonical: `${siteUrl}/about`,
    },
  };
}

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>About IN-FOMO.</h1>
          <p className={styles.description}>
            We build digital products that matter. From startups to enterprises, we transform ideas into exceptional experiences.
          </p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.container}>
          <div className={styles.missionGrid}>
            <div className={styles.missionLabel}>01</div>
            <div className={styles.missionContent}>
              <h2 className={styles.missionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                Empowering businesses with innovative technology that drives real growth and creates measurable impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ServicesTabsSection />

      <TeamSection />

      <section className={styles.impact}>
        <div className={styles.container}>
          <div className={styles.impactHeader}>
            <div className={styles.impactLabel}>04</div>
            <h2 className={styles.impactTitle}>Our Impact</h2>
          </div>
          <div className={styles.statsBar}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>150+</div>
              <div className={styles.statLabel}>Projects</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>Clients</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5★</div>
              <div className={styles.statLabel}>Clutch Rating</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10+</div>
              <div className={styles.statLabel}>Years</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
