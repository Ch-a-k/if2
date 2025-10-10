'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './ImageLightbox.module.css'

interface ImageLightboxProps {
  images: { url: string; alt: string }[]
  initialIndex: number
  onClose: () => void
}

export default function ImageLightbox({ images, initialIndex, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goToPrevious()
      if (e.key === 'ArrowRight') goToNext()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [currentIndex])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <button className={styles.closeButton} onClick={onClose} aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <button 
        className={`${styles.navButton} ${styles.navButtonPrev}`} 
        onClick={(e) => { e.stopPropagation(); goToPrevious() }}
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button 
        className={`${styles.navButton} ${styles.navButtonNext}`} 
        onClick={(e) => { e.stopPropagation(); goToNext() }}
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className={styles.imageWrapper} onClick={(e) => e.stopPropagation()}>
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].alt}
          width={1920}
          height={1080}
          className={styles.image}
          priority
        />
      </div>

      <div className={styles.counter}>
        {currentIndex + 1} / {images.length}
      </div>

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            key={index}
            className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''}`}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(index) }}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={80}
              height={60}
              className={styles.thumbnailImage}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

