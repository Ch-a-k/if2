'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageLightbox from './ImageLightbox'
import ImageWithWatermark from './ImageWithWatermark'
import { type WatermarkSettings } from '@/lib/sanity'
import styles from './ProjectGallery.module.css'

interface GalleryImage {
  url: string
  alt: string
  wide?: boolean
  watermark?: WatermarkSettings
}

interface ProjectGalleryProps {
  images: GalleryImage[]
  projectTitle: string
  watermarkLogoUrl?: string | null
}

export default function ProjectGallery({ images, projectTitle, watermarkLogoUrl }: ProjectGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  return (
    <>
      <div className={styles.galleryGrid}>
        {images.map((item, index) => (
          <button
            key={index}
            className={`${styles.galleryItem} ${item.wide ? styles.galleryItemWide : ''}`}
            onClick={() => setLightboxIndex(index)}
            aria-label={`View image ${index + 1}`}
          >
            <ImageWithWatermark
              src={item.url}
              alt={item.alt || `${projectTitle} image ${index + 1}`}
              width={800}
              height={600}
              watermark={item.watermark}
              watermarkLogoUrl={watermarkLogoUrl}
              className={styles.galleryImage}
            />
            <div className={styles.galleryOverlay}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <ImageLightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  )
}

