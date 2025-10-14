import {Metadata} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {client, queries, getImageUrl, getOgImageUrl, type Project, type SiteSettings} from '@/lib/sanity'
import styles from './page.module.css'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SiteSettings>(queries.siteSettings)
  const siteUrl = 'https://in-fomo.com'
  
  // Use Works page SEO settings if available, otherwise fallback to global settings
  const ogTitle = settings?.worksPageSeo?.ogTitle || 'Our Works | IN-FOMO.';
  const ogDescription = settings?.worksPageSeo?.ogDescription || 'Explore our portfolio of successful digital projects. Web development, mobile apps, Web3 solutions, and innovative digital products.';
  const ogImageData = settings?.worksPageSeo?.ogImage || settings?.ogImage;
  const ogImageUrl = ogImageData ? getOgImageUrl(ogImageData) : null;

  return {
    title: 'Our Works | IN-FOMO. - Digital Innovation Portfolio',
    description: 'Explore our portfolio of successful digital projects. Web development, mobile apps, Web3 solutions, and innovative digital products.',
    keywords: ['portfolio', 'case studies', 'web development projects', 'mobile apps', 'digital solutions'],
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      url: `${siteUrl}/works`,
      siteName: 'IN-FOMO.',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: ogImageData?.alt || 'IN-FOMO. Portfolio - Digital Innovation Projects',
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
        alt: ogImageData?.alt || 'IN-FOMO. Portfolio',
      }] : [],
    },
    alternates: {
      canonical: `${siteUrl}/works`,
    },
  }
}

export const revalidate = 3600

export default async function WorksPage() {
  const projects = await client.fetch<Project[]>(queries.projects)

  return (
    <div className={styles.works}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Our Works</h1>
          <p className={styles.description}>
            Explore our portfolio of successful projects and digital solutions.
          </p>
        </div>
      </section>

      <section className={styles.projectsSection}>
        <div className={styles.container}>
          <div className={styles.projectsGrid}>
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/works/${project.slug.current}`}
                className={styles.projectCard}
              >
                <div className={styles.projectImage}>
                  <Image
                    src={getImageUrl(project.coverImage) || '/placeholder.svg'}
                    alt={project.title}
                    width={600}
                    height={400}
                    className={styles.image}
                  />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectMeta}>
                    <span className={styles.projectCategory}>{project.category?.title || 'Uncategorized'}</span>
                    <span className={styles.projectYear}>{project.year}</span>
                  </div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}