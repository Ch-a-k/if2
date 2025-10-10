'use client';

import { useRef, useState, useEffect } from 'react';
import styles from './ServicesSection.module.css';

export default function ServicesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const services = [
    {
      number: '01',
      title: 'Web Development',
      description: 'Modern, scalable web applications built with cutting-edge technology.',
    },
    {
      number: '02',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps for iOS and Android.',
    },
    {
      number: '03',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that drive user engagement.',
    },
    {
      number: '04',
      title: 'Branding & Identity',
      description: 'Comprehensive brand strategy and visual identity design.',
    },
    {
      number: '05',
      title: 'Digital Marketing',
      description: 'Strategic campaigns that amplify your brand presence online.',
    },
    {
      number: '06',
      title: 'SEO Optimization',
      description: 'Search engine optimization to improve your visibility.',
    },
    {
      number: '07',
      title: 'Content Marketing',
      description: 'Engaging content that converts visitors into customers.',
    },
    {
      number: '08',
      title: 'Social Media',
      description: 'Strategic social media management and advertising.',
    },
    {
      number: '09',
      title: 'PPC Advertising',
      description: 'Targeted pay-per-click campaigns for maximum ROI.',
    },
    {
      number: '10',
      title: 'E-Commerce',
      description: 'Full-featured online stores with seamless checkout.',
    },
    {
      number: '11',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and migration services.',
    },
    {
      number: '12',
      title: 'DevOps',
      description: 'Continuous integration and deployment automation.',
    },
    {
      number: '13',
      title: 'QA & Testing',
      description: 'Comprehensive testing to ensure flawless functionality.',
    },
    {
      number: '14',
      title: 'API Development',
      description: 'RESTful and GraphQL APIs for seamless integration.',
    },
    {
      number: '15',
      title: 'AI & ML Solutions',
      description: 'Artificial intelligence and machine learning integration.',
    },
    {
      number: '16',
      title: 'Blockchain',
      description: 'Decentralized applications and smart contracts.',
    },
    {
      number: '17',
      title: 'Data Analytics',
      description: 'Business intelligence and data visualization.',
    },
    {
      number: '18',
      title: 'CMS Development',
      description: 'Custom content management system solutions.',
    },
    {
      number: '19',
      title: 'Tech Consulting',
      description: 'Strategic guidance for digital transformation.',
    },
    {
      number: '20',
      title: 'Maintenance & Support',
      description: 'Ongoing technical support and system maintenance.',
    },
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  return (
    <section className={styles.services}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Services</h2>
        <p className={styles.sectionSubtitle}>
          Comprehensive IT solutions for your business growth
        </p>
      </div>

      <div
        className={styles.scrollContainer}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.servicesTrack}>
          {services.map((service, index) => (
            <div key={index} className={styles.serviceCard}>
              <div className={styles.cardNumber}>{service.number}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scrollHint}>
        <span>← Drag to explore →</span>
      </div>
    </section>
  );
}