import Link from 'next/link'
import Image from 'next/image'
import {getImageUrl, type BlogPost} from '@/lib/sanity'
import styles from './AdjacentPosts.module.css'

interface AdjacentPostsProps {
  next: BlogPost | null
  previous: BlogPost | null
}

export default function AdjacentPosts({next, previous}: AdjacentPostsProps) {
  if (!next && !previous) return null

  return (
    <nav className={styles.adjacentPosts} aria-label="Navigate between articles">
      <div className={styles.container}>
        <h2 className={styles.title}>Continue Reading</h2>
        
        <div className={styles.grid}>
          {previous && (
            <Link href={`/blog/${previous.slug.current}`} className={styles.post}>
              <div className={styles.label}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M19 12H5M5 12l7 7M5 12l7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Previous Article</span>
              </div>
              
              {previous.coverImage && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={getImageUrl(previous.coverImage) || '/placeholder.svg'}
                    alt={previous.coverImage?.alt || previous.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                </div>
              )}
              
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{previous.title}</h3>
                <p className={styles.postExcerpt}>{previous.excerpt}</p>
              </div>
            </Link>
          )}
          
          {next && (
            <Link href={`/blog/${next.slug.current}`} className={styles.post}>
              <div className={styles.label}>
                <span>Next Article</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {next.coverImage && (
                <div className={styles.imageWrapper}>
                  <Image
                    src={getImageUrl(next.coverImage) || '/placeholder.svg'}
                    alt={next.coverImage?.alt || next.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                </div>
              )}
              
              <div className={styles.postContent}>
                <h3 className={styles.postTitle}>{next.title}</h3>
                <p className={styles.postExcerpt}>{next.excerpt}</p>
              </div>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
