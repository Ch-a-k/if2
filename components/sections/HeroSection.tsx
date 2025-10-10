'use client';

import { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current && titleRef.current && subtitleRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(0, 1 - scrollY / 600);
        const scale = Math.max(0.8, 1 - scrollY / 2000);

        titleRef.current.style.opacity = String(opacity);
        titleRef.current.style.transform = `scale(${scale})`;
        subtitleRef.current.style.opacity = String(opacity);
        subtitleRef.current.style.transform = `scale(${scale}) translateY(${scrollY * 0.3}px)`;
        
        // Скрываем индикатор скролла при прокрутке
        const scrollIndicator = sectionRef.current.querySelector(`.${styles.scrollIndicator}`) as HTMLElement;
        if (scrollIndicator) {
          const mouseOpacity = Math.max(0, 1 - scrollY / 300);
          const mouseTranslateY = scrollY * 0.8;
          scrollIndicator.style.opacity = String(mouseOpacity);
          scrollIndicator.style.transform = `translateX(-50%) translateY(${mouseTranslateY}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.badge}>Digital Innovation Agency</div>
          <h1 className={styles.title} ref={titleRef}>
            We craft digital experiences that matter.
          </h1>
          <p className={styles.subtitle} ref={subtitleRef}>
            IN-FOMO. builds innovative solutions for forward-thinking businesses. 
            From web and mobile apps to comprehensive digital strategies, we transform 
            ideas into exceptional products that drive growth.
          </p>
          <div className={styles.heroButtons}>
            <a href="/contact" className={styles.primaryButton}>
              <span>Start Your Project</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/works" className={styles.secondaryButton}>
              <span>View Our Works</span>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.mouseWheel}></div>
        </div>
      </div>
    </section>
  );
}