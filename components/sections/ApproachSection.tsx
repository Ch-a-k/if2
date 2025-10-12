'use client';

import { useState } from 'react';
import styles from './ApproachSection.module.css';

export default function ApproachSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      number: '01',
      title: 'Discovery & Research',
      description: 'Deep dive into your business goals, target audience, market analysis, and technical requirements.',
    },
    {
      number: '02',
      title: 'Strategy & Planning',
      description: 'Defining project scope, timeline, technology stack, and creating detailed roadmap.',
    },
    {
      number: '03',
      title: 'Design & Prototyping',
      description: 'Creating wireframes, UI/UX design, interactive prototypes, and brand identity.',
    },
    {
      number: '04',
      title: 'Development',
      description: 'Building robust, scalable applications using modern technologies and best practices.',
    },
    {
      number: '05',
      title: 'Testing & QA',
      description: 'Comprehensive testing across devices, browsers, performance optimization, and bug fixes.',
    },
    {
      number: '06',
      title: 'Documentation',
      description: 'Detailed technical documentation, user guides, and training materials for your team.',
    },
    {
      number: '07',
      title: 'Deployment & Launch',
      description: 'Smooth deployment to production, monitoring setup, and successful product launch.',
    },
    {
      number: '08',
      title: 'Support & Maintenance',
      description: 'Ongoing technical support, updates, security patches, and continuous improvements.',
    },
  ];

  return (
    <section className={styles.approach}>
      <div className={styles.container}>
        <div className={styles.leftContent}>
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${styles.step} ${activeStep === index ? styles.active : ''}`}
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              <div className={styles.stepLine}></div>
            </div>
          ))}
        </div>

        <div className={styles.rightSticky}>
          <h2 className={styles.sectionTitle}>Our Approach</h2>
        </div>
      </div>

      <div className={styles.dragHint}>
        <span>← Drag to explore →</span>
      </div>
    </section>
  );
}