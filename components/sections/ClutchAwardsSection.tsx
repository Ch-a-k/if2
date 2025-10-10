import styles from './ClutchAwardsSection.module.css';
import Image from 'next/image';
import {client, queries, type ClutchBadge, getImageUrl} from '@/lib/sanity';

export const revalidate = 3600; // Обновление каждый час (или по webhook)

export default async function ClutchAwardsSection() {
  let badges: ClutchBadge[] = [];

  try {
    badges = await client.fetch<ClutchBadge[]>(queries.clutchBadges);
  } catch (error) {
    console.error('Error fetching clutch badges:', error);
  }

  // Если нет бейджей, не показываем секцию
  if (badges.length === 0) {
    return null;
  }

  // Дублируем массив для бесконечной прокрутки
  const duplicatedBadges = [...badges, ...badges, ...badges];

  return (
    <section className={styles.clutchSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            TOP-1 Company in Europe in 2025
          </h2>
          <div className={styles.subtitle}>
            <span className={styles.version}>By Clutch.co</span>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <span key={i} className={styles.star}>★</span>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.scrollContainer}>
          <div className={styles.scrollContent}>
            {duplicatedBadges.map((badge, index) => {
              const imageUrl = getImageUrl(badge.image) || '/placeholder.svg';
              
              return (
                <a
                  key={`${badge._id}-${index}`}
                  href="http://clutch.co/profile/fomo-0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.badgeCard}
                >
                  <div className={styles.badgeImage}>
                    <Image
                      src={imageUrl}
                      alt={badge.title}
                      width={200}
                      height={200}
                      className={styles.grayscaleImage}
                    />
                  </div>
                  <p className={styles.badgeTitle}>{badge.title}</p>
                </a>
              );
            })}
          </div>
        </div>

        <div className={styles.ctaLink}>
          <a
            href="http://clutch.co/profile/fomo-0"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.clutchLink}
          >
            Our profile Clutch.co →
          </a>
        </div>
      </div>
    </section>
  );
}