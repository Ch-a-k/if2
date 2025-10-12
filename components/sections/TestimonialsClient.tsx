'use client';

import { useState, useRef } from 'react';
import styles from './TestimonialsSection.module.css';
import Image from 'next/image';
import type { TestimonialNew } from '@/lib/sanity';
import { getImageUrl, getFileUrl } from '@/lib/sanity';

interface TestimonialsClientProps {
  testimonials: TestimonialNew[];
}

// Функция для конвертации YouTube URL в embed формат
function convertToEmbedUrl(url: string): string {
  if (!url) return url;
  
  // YouTube - обычная ссылка: https://www.youtube.com/watch?v=VIDEO_ID
  if (url.includes('youtube.com/watch')) {
    const videoId = new URL(url).searchParams.get('v');
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // YouTube - короткая ссылка: https://youtu.be/VIDEO_ID
  if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1]?.split('?')[0];
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
  }
  
  // Vimeo - обычная ссылка: https://vimeo.com/VIDEO_ID
  if (url.includes('vimeo.com/') && !url.includes('player.vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`;
    }
  }
  
  // Уже в правильном формате
  return url;
}

export default function TestimonialsClient({ testimonials }: TestimonialsClientProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  if (testimonials.length === 0) {
    return null;
  }

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    
    const threshold = 100;
    
    if (translateX > threshold && activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    } else if (translateX < -threshold && activeIndex < testimonials.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
    
    setTranslateX(0);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  const currentTestimonial = testimonials[activeIndex];

  // Подготовка данных медиа
  let mediaUrl: string | null = null;
  let mediaType: 'image' | 'video' | 'iframe' | null = null;

  if (currentTestimonial.hasMedia) {
    if (currentTestimonial.mediaType === 'image' && currentTestimonial.mediaImage) {
      mediaUrl = getImageUrl(currentTestimonial.mediaImage);
      mediaType = 'image';
    } else if (currentTestimonial.mediaType === 'video') {
      if (currentTestimonial.videoSource === 'file' && currentTestimonial.mediaVideoFile) {
        // Загруженный файл
        mediaUrl = getFileUrl(currentTestimonial.mediaVideoFile);
        mediaType = 'video';
      } else if (currentTestimonial.videoSource === 'url' && currentTestimonial.mediaVideoUrl) {
        // YouTube/Vimeo URL - автоматическая конвертация в embed формат
        mediaUrl = convertToEmbedUrl(currentTestimonial.mediaVideoUrl);
        // Определяем нужен ли iframe (для YouTube/Vimeo)
        if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be') || mediaUrl.includes('vimeo.com')) {
          mediaType = 'iframe';
        } else {
          mediaType = 'video';
        }
      }
    }
  }

  const companyLogoUrl = currentTestimonial.hasCompanyLogo && currentTestimonial.companyLogo
    ? getImageUrl(currentTestimonial.companyLogo)
    : null;

  return (
    <section className={styles.testimonials}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.label}>Testimonials</div>
          <h2 className={styles.title}>What our clients say</h2>
          <div className={styles.dragHint}>
            ← Drag to explore →
          </div>
        </div>

        <div 
          className={styles.testimonialWrapper}
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className={styles.testimonialContent}
            style={{
              transform: `translateX(${translateX}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s ease',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <div className={styles.testimonialCard}>
              {mediaUrl && mediaType && (
                <div className={styles.mediaSection}>
                  {mediaType === 'image' ? (
                    <div className={styles.imageWrapper}>
                      <Image
                        src={mediaUrl}
                        alt={currentTestimonial.author}
                        width={400}
                        height={600}
                        className={styles.testimonialImage}
                      />
                    </div>
                  ) : mediaType === 'iframe' ? (
                    <div className={styles.videoWrapper}>
                      <iframe
                        src={mediaUrl}
                        className={styles.testimonialVideo}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={`Video testimonial from ${currentTestimonial.author}`}
                      />
                    </div>
                  ) : (
                    <div className={styles.videoWrapper}>
                      <video 
                        src={mediaUrl}
                        controls
                        className={styles.testimonialVideo}
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              )}

              <div className={styles.textSection}>
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.quote}>{currentTestimonial.quote}</p>

                <div className={styles.authorInfo}>
                  <div className={styles.authorDetails}>
                    <div className={styles.authorName}>{currentTestimonial.author}</div>
                    <div className={styles.authorPosition}>
                      {currentTestimonial.position}{' '}
                      {companyLogoUrl ? (
                        <span className={styles.companyLogoWrapper}>
                          <Image
                            src={companyLogoUrl}
                            alt={currentTestimonial.company}
                            width={80}
                            height={24}
                            className={styles.companyLogo}
                          />
                        </span>
                      ) : (
                        <span className={styles.companyName}>{currentTestimonial.company}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className={styles.actions}>
                  {currentTestimonial.clutchLink && (
                    <a
                      href={currentTestimonial.clutchLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.actionButton}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.clutchIcon}>
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                        <circle cx="12" cy="12" r="3" fill="currentColor"/>
                      </svg>
                      <span>Read on Clutch</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}

                  {currentTestimonial.caseStudySlug && (
                    <a
                      href={`/works/${currentTestimonial.caseStudySlug}`}
                      className={styles.actionButton}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={styles.caseIcon}>
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>View Case</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={styles.arrowIcon}>
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.indicators}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${activeIndex === index ? styles.active : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

