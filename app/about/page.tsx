'use client';

import styles from './page.module.css';
import TeamSection from '@/components/TeamSection';

export default function AboutPage() {
  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>About IN-FOMO.</h1>
          <p className={styles.description}>
            We are a team of passionate developers, designers, and strategists dedicated to creating exceptional digital experiences.
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
                To empower businesses with innovative technology solutions that drive growth and create lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.statsHeader}>
            <div className={styles.statsLabel}>04</div>
            <h2 className={styles.statsTitle}>Our Impact</h2>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>100+</div>
              <div className={styles.valueLabel}>Projects Delivered</div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>50+</div>
              <div className={styles.valueLabel}>Happy Clients</div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>$200k</div>
              <div className={styles.valueLabel}>Attracted investments</div>
            </div>
            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>4</div>
              <div className={styles.valueLabel}>Offices in Europe and USA</div>
            </div>

            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>10+</div>
              <div className={styles.valueLabel}>Years Experience</div>
            </div>

            <div className={styles.valueItem}>
              <div className={styles.valueNumber}>5</div>
              <div className={styles.valueLabel}>Stars on Clutch.co</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
