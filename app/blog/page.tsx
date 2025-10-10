import {Metadata} from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {client, queries, getImageUrl, type BlogPost} from '@/lib/sanity'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog | IN-FOMO. - Digital Innovation Insights',
  description: 'Expert insights on web development, mobile apps, Web3, and digital innovation. Stay updated with the latest trends and best practices.',
  openGraph: {
    title: 'Blog | IN-FOMO.',
    description: 'Expert insights on web development, mobile apps, Web3, and digital innovation.',
    type: 'website',
  },
}

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await client.fetch<BlogPost[]>(queries.blogPosts)

  return (
    <div className={styles.blogPage}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>Blog</h1>
          <p className={styles.subtitle}>
            Expert insights on web development, mobile apps, Web3, and digital innovation
          </p>
        </div>
      </section>

      <section className={styles.posts}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {posts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className={styles.postCard}
              >
                <div className={styles.imageWrapper}>
                  <Image
                    src={getImageUrl(post.coverImage) || '/placeholder.svg'}
                    alt={post.coverImage?.alt || post.title}
                    width={600}
                    height={400}
                    className={styles.postImage}
                  />
                </div>
                <div className={styles.postContent}>
                  <div className={styles.postMeta}>
                    <span className={styles.category}>{post.category?.title || 'Uncategorized'}</span>
                    {post.readTime && (
                      <span className={styles.readTime}>{post.readTime} min read</span>
                    )}
                  </div>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <div className={styles.postFooter}>
                    <span className={styles.date}>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
