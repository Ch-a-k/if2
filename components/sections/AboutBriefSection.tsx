'use client';

import Link from 'next/link';
import styles from './AboutBriefSection.module.css';

export default function AboutBriefSection() {
  return (
    <section className={styles.aboutBrief}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.leftContent}>
            <div className={styles.label}>Who We Are</div>
            <h2 className={styles.title}>
              A digital agency focused on delivering results
            </h2>
          </div>

          <div className={styles.rightContent}>
            <p className={styles.description}>
              Since 2019, IN-FOMO. has been partnering with ambitious companies to create 
              exceptional digital products. We combine strategic thinking, beautiful design, 
              and robust development to deliver solutions that drive real business growth.
            </p>
            <p className={styles.description}>
              Our team of designers, developers, and strategists work collaboratively to 
              understand your challenges and craft tailored solutions that exceed expectations. 
              From startups to established enterprises, we help businesses transform their 
              digital presence and achieve their goals.
            </p>
            <Link href="/about" className={styles.learnMoreButton}>
              <span>Learn More About Us</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
