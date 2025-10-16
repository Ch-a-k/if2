import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {client, queries, getImageUrl, getOgImageUrl, type Project} from '@/lib/sanity'
import PartnersSection from '@/components/PartnersSection'
import ContactForm from '@/components/blog/ContactForm'
import ProjectGallery from '@/components/ProjectGallery'
import styles from './page.module.css'

export const revalidate = 3600

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{slug: {current: string}}[]>(queries.projectsSlugs)
  return slugs.map((item) => ({
    slug: item.slug.current,
  }))
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const project = await client.fetch<Project>(queries.projectBySlug(params.slug))

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const ogImageUrl = getOgImageUrl(project.coverImage)
  const siteUrl = 'https://in-fomo.com'
  const projectUrl = `${siteUrl}/works/${project.slug.current}`

  return {
    title: `${project.title} | IN-FOMO. Portfolio`,
    description: project.excerpt,
    keywords: project.tags,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      type: 'article',
      url: projectUrl,
      siteName: 'IN-FOMO.',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: project.coverImage?.alt || project.title,
      }] : [],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.excerpt,
      site: '@infomo',
      creator: '@infomo',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        alt: project.coverImage?.alt || project.title,
      }] : [],
    },
    alternates: {
      canonical: projectUrl,
    },
  }
}

export default async function ProjectPage({params}: PageProps) {
  const project = await client.fetch<Project>(queries.projectBySlug(params.slug))

  if (!project) {
    notFound()
  }

  const heroImageUrl = project.heroImage ? getImageUrl(project.heroImage) : getImageUrl(project.coverImage)
  const logoUrl = project.logo ? getImageUrl(project.logo) : null

  return (
    <div className={styles.project}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/works">Examples</Link>
            <span>/</span>
            <span>{project.title}</span>
          </div>

          {logoUrl && (
            <div className={styles.logo}>
              <Image src={logoUrl} alt={project.title} width={120} height={60} className={styles.logoImage} />
            </div>
          )}
          
          <h1 className={styles.title}>{project.title}</h1>
          
          <div className={styles.metaInfo}>
            <span className={styles.category}>{project.category?.title || 'Uncategorized'}</span>
            <span className={styles.year}>{project.year}</span>
            {project.client && <span className={styles.client}>{project.client}</span>}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {heroImageUrl && (
      <section className={styles.mainImage}>
        <div className={styles.container}>
            <div className={styles.heroImageWrapper}>
              <Image
                src={heroImageUrl}
                alt={project.title}
                width={1200}
                height={700}
                className={styles.heroImage}
                priority
              />
          </div>
        </div>
      </section>
      )}

      {/* Services Marquee */}
      {project.services && project.services.length > 0 && (
      <section className={styles.servicesMarquee}>
        <div className={styles.marqueeTrack}>
          {[...project.services, ...project.services, ...project.services].map((service, index) => (
            <span key={index} className={styles.serviceItem}>{service}</span>
          ))}
        </div>
      </section>
      )}

      {/* Description */}
      <section className={styles.description}>
        <div className={styles.container}>
          <div className={styles.descriptionContent}>
            <PortableText value={project.description} />
          </div>
        </div>
      </section>

      {/* Process */}
      {project.process && project.process.length > 0 && (
      <section className={styles.process}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Process</h2>
          <div className={styles.processGrid}>
            {project.process.map((step, index) => (
              <div key={index} className={styles.processCard}>
                <div className={styles.processIcon}>{step.icon}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
      <section className={styles.gallery}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Project Gallery</h2>
            <ProjectGallery
              images={project.gallery.map((item, index) => ({
                url: getImageUrl(item) || '/placeholder.svg',
                alt: item.alt || `${project.title} image ${index + 1}`,
                wide: item.wide,
              }))}
              projectTitle={project.title}
            />
        </div>
      </section>
      )}

      {/* Live Link */}
      {project.link && (
        <section className={styles.linkSection}>
        <div className={styles.container}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveLink}
            >
              <span>Visit Live Project</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
            </a>
        </div>
      </section>
      )}

      {/* Partners */}
      <PartnersSection />

      {/* Contact Form */}
      <ContactForm />
    </div>
  )
}