import {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {notFound} from 'next/navigation'
import {PortableText} from '@portabletext/react'
import {client, queries, getImageUrl, getOgImageUrl, type BlogPost} from '@/lib/sanity'
import ShareButtons from '@/components/blog/ShareButtons'
import AdjacentPosts from '@/components/blog/AdjacentPosts'
import PartnersSection from '@/components/PartnersSection'
import ContactForm from '@/components/blog/ContactForm'
import styles from './page.module.css'

export const revalidate = 3600

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{slug: {current: string}}[]>(queries.blogPostsSlugs)
  return slugs.map((item) => ({
    slug: item.slug.current,
  }))
}

export async function generateMetadata({params}: PageProps): Promise<Metadata> {
  const post = await client.fetch<BlogPost>(queries.blogPostBySlug(params.slug))

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  const ogImageUrl = getOgImageUrl(post.coverImage)
  const siteUrl = 'https://in-fomo.com'
  const postUrl = `${siteUrl}/blog/${post.slug.current}`

  return {
    title: `${post.title} | IN-FOMO. Blog`,
    description: post.excerpt,
    keywords: post.seoKeywords,
    authors: [{name: post.author.name}],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      url: postUrl,
      siteName: 'IN-FOMO.',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: post.coverImage?.alt || post.title,
      }] : [],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      site: '@infomo',
      creator: '@infomo',
      images: ogImageUrl ? [{
        url: ogImageUrl,
        alt: post.coverImage?.alt || post.title,
      }] : [],
    },
    alternates: {
      canonical: postUrl,
    },
  }
}

export default async function BlogPostPage({params}: PageProps) {
  const post = await client.fetch<BlogPost>(queries.blogPostBySlug(params.slug))

  if (!post) {
    notFound()
  }

  const adjacentPosts = await client.fetch(queries.adjacentBlogPosts(post.publishedAt))
  const imageUrl = getImageUrl(post.coverImage)
  const ogImageUrl = getOgImageUrl(post.coverImage)
  const authorImageUrl = post.author.image ? getImageUrl(post.author.image) : null
  const siteUrl = 'https://in-fomo.com'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: ogImageUrl || imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author.name,
      ...(authorImageUrl && {image: authorImageUrl}),
    },
    publisher: {
      '@type': 'Organization',
      name: 'IN-FOMO.',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug.current}`,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
      />

      <article className={styles.article}>
        {/* Hero Section */}
        <header className={styles.header}>
          <div className={styles.container}>
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span>{post.title}</span>
            </div>

            <div className={styles.meta}>
              <span className={styles.category}>{post.category?.title || 'Uncategorized'}</span>
              {post.readTime && <span className={styles.readTime}>{post.readTime} min read</span>}
            </div>

            <h1 className={styles.title}>{post.title}</h1>
            <p className={styles.excerpt}>{post.excerpt}</p>

            <div className={styles.authorInfo}>
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className={styles.authorImage}
                />
              )}
              <div>
                <div className={styles.authorName}>{post.author.name}</div>
                <time className={styles.date}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </div>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        {imageUrl && (
          <div className={styles.coverImage}>
            <Image
              src={imageUrl}
              alt={post.coverImage.alt}
              width={1200}
              height={630}
              className={styles.image}
              priority
            />
          </div>
        )}

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.container}>
            <div className={styles.articleContent}>
              <PortableText
                value={post.content}
                components={{
                  types: {
                    image: ({value}: any) => (
                          <figure className={styles.contentImage}>
                        <Image
                          src={getImageUrl(value) || '/placeholder.svg'}
                          alt={value.alt || 'Article image'}
                          width={800}
                          height={600}
                          className={styles.image}
                        />
                        {value.caption && (
                          <figcaption className={styles.caption}>{value.caption}</figcaption>
                        )}
                      </figure>
                    ),
                  },
                  block: {
                    h2: ({children}: any) => <h2 className={styles.h2}>{children}</h2>,
                    h3: ({children}: any) => <h3 className={styles.h3}>{children}</h3>,
                    h4: ({children}: any) => <h4 className={styles.h4}>{children}</h4>,
                    blockquote: ({children}: any) => (
                      <blockquote className={styles.blockquote}>{children}</blockquote>
                    ),
                  },
                  marks: {
                    link: ({children, value}: any) => (
                      <a
                        href={value.href}
                        target={value.href.startsWith('http') ? '_blank' : undefined}
                        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className={styles.link}
                      >
                        {children}
                      </a>
                    ),
                  },
                  list: {
                    bullet: ({children}: any) => <ul className={styles.ul}>{children}</ul>,
                    number: ({children}: any) => <ol className={styles.ol}>{children}</ol>,
                  },
                }}
              />
            </div>

            {/* Share Buttons */}
            <div className={styles.shareSection}>
              <h3>Share this article</h3>
              <ShareButtons
                url={`https://in-fomo.com/blog/${post.slug.current}`}
                title={post.title}
              />
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Adjacent Posts */}
        <AdjacentPosts next={adjacentPosts.next} previous={adjacentPosts.previous} />

        {/* Partners */}
        <PartnersSection />

        {/* Contact Form */}
        <ContactForm />
      </article>
    </>
  )
}
