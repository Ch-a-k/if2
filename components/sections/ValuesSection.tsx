'use client';

import styles from './ValuesSection.module.css';

export default function ValuesSection() {
  const values = [
    {
      icon: '↗',
      title: 'Real solution',
      description: "We don't just design & develop - we solve problems, delivering solutions that drive real business impact.",
    },
    {
      icon: '◷',
      title: 'Communicative & Timely',
      description: 'No ghosting, no delays - expect clear updates, fast responses, and on-time delivery.',
    },
    {
      icon: '〜',
      title: 'Flexible & Adaptive',
      description: 'Your needs evolve, and so do we - just a smooth, hassle-free process that keeps your project moving forward.',
    },
    {
      icon: '☆',
      title: 'Proven Track Record',
      description: 'TOP-1 rated company in Europe by Clutch.co with 5-star reviews. Our portfolio speaks louder than promises.',
    },
    {
      icon: '↯',
      title: 'Fast Turnaround',
      description: 'We move fast without compromising quality. Get your MVP to market in weeks, not months.',
    },
    {
      icon: '⛨',
      title: 'Security First',
      description: 'Enterprise-grade security standards, NDA protection, and complete confidentiality for your intellectual property.',
    },
    {
      icon: '✧',
      title: 'Premium Quality',
      description: 'Pixel-perfect design, clean code, and rigorous testing - we deliver products you will be proud to launch.',
    },
    {
      icon: '↗',
      title: 'Business-Focused',
      description: 'Every decision we make is tied to your business goals - ROI, conversions, and user engagement always come first.',
    },
    {
      icon: '↺',
      title: 'Full-Cycle Support',
      description: 'From initial concept to post-launch optimization - we are with you every step of the way and beyond.',
    },
  ];

  return (
    <section className={styles.values}>
      <div className={styles.container}>
        <div className={styles.leftSticky}>
          <div className={styles.sectionSubheading}>Our Core Values</div>
          <h2 className={styles.sectionTitle}>Why businesses choose IN-FOMO.</h2>
        </div>

        <div className={styles.rightContent}>
          {values.map((value, index) => (
            <div key={index} className={styles.valueCard}>
              <div className={styles.valueIcon}>{value.icon}</div>
              <div className={styles.valueContent}>
                <h3 className={styles.valueTitle}>{value.title}</h3>
                <p className={styles.valueDescription}>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}