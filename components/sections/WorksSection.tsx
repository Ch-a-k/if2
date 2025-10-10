import Link from 'next/link'
import Image from 'next/image'
import {client, queries, getImageUrl, type Project} from '@/lib/sanity'
import styles from './WorksSection.module.css'

export const revalidate = 3600

export default async function WorksSection() {
  const featuredProjects = await client.fetch<Project[]>(queries.featuredProjects)

  return (
    <section className={styles.works}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <div className={styles.sectionSubheading}>Works</div>
            <h2 className={styles.sectionTitle}>Featured projects</h2>
          </div>
          <Link href="/works" className={styles.allCasesButton}>
            <span>All Cases</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
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
                  height={600}
                  className={styles.image}
                />
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectCategory}>{project.category?.title || 'Uncategorized'}</div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDescription}>{project.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}