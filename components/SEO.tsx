import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  og?: {
    title?: string
    description?: string
    image?: string
    type?: string
  }
  article?: {
    publishedTime?: string
    modifiedTime?: string
    author?: string
    tags?: string[]
  }
  keywords?: string[]
}

export default function SEO({
  title,
  description,
  canonical,
  og,
  article,
  keywords,
}: SEOProps) {
  const siteTitle = 'IN-FOMO.'
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const siteUrl = 'https://in-fomo.com'
  const defaultImage = `${siteUrl}/og-image.jpg`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:type" content={og?.type || (article ? 'article' : 'website')} />
      <meta property="og:title" content={og?.title || fullTitle} />
      <meta property="og:description" content={og?.description || description} />
      <meta property="og:image" content={og?.image || defaultImage} />
      <meta property="og:url" content={canonical || siteUrl} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Article Meta */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.tags &&
            article.tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={og?.title || fullTitle} />
      <meta name="twitter:description" content={og?.description || description} />
      <meta name="twitter:image" content={og?.image || defaultImage} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Head>
  )
}

// JSON-LD Schema.org structured data
export function BlogPostSchema({
  title,
  description,
  image,
  publishedAt,
  modifiedAt,
  author,
  url,
}: {
  title: string
  description: string
  image: string
  publishedAt: string
  modifiedAt?: string
  author: {
    name: string
    image?: string
  }
  url: string
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.image && {image: author.image}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'IN-FOMO.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://in-fomo.com/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'IN-FOMO.',
    url: 'https://in-fomo.com',
    logo: 'https://in-fomo.com/logo.png',
    description: 'Digital innovation agency building exceptional web and mobile experiences',
    sameAs: [
      'https://clutch.co/profile/fomo-0',
      // Add other social media links
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EU',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{__html: JSON.stringify(schema)}}
    />
  )
}
