import Image from 'next/image'
import {client, queries, getImageUrl, type Partner} from '@/lib/sanity'
import styles from './PartnersSection.module.css'

export const revalidate = 3600

export default async function PartnersSection() {
  const partners = await client.fetch<Partner[]>(queries.partners)

  if (!partners || partners.length === 0) {
    return null
  }

  return (
    <section className={styles.partners}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Trusted by Leading Companies</h2>
          <p className={styles.subtitle}>
            We're proud to partner with innovative businesses worldwide
          </p>
        </div>

        <div className={styles.partnersGrid}>
          {partners.map((partner) => (
            <a
              key={partner._id}
              href={partner.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className={styles.partnerCard}
              title={partner.name}
            >
              <div className={styles.logoWrapper}>
                <Image
                  src={getImageUrl(partner.logo) || '/placeholder.svg'}
                  alt={partner.name}
                  width={200}
                  height={100}
                  className={styles.logo}
                />
              </div>
              {partner.subtitle && (
                <div className={styles.partnerSubtitle}>{partner.subtitle}</div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
