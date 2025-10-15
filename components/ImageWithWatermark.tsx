'use client';

import Image from 'next/image';
import { getWatermarkPositionClass, type WatermarkSettings } from '@/lib/sanity';
import styles from './ImageWithWatermark.module.css';

interface ImageWithWatermarkProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  watermark?: WatermarkSettings;
  watermarkLogoUrl?: string | null;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function ImageWithWatermark({
  src,
  alt,
  width,
  height,
  watermark,
  watermarkLogoUrl,
  className = '',
  priority = false,
  fill = false,
}: ImageWithWatermarkProps) {
  const position = watermark?.position || 'center';
  const opacity = watermark?.opacity !== undefined ? watermark.opacity : 25;
  const positionClass = getWatermarkPositionClass(position);

  const shouldShowWatermark = watermarkLogoUrl;

  return (
    <div className={`${styles.imageContainer} ${className}`}>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={styles.image}
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={styles.image}
          priority={priority}
        />
      )}
      
      {shouldShowWatermark && (
        <div 
          className={`${styles.watermark} ${styles[positionClass]}`}
          style={{ opacity: opacity / 100 }}
        >
          <Image
            src={watermarkLogoUrl}
            alt="Watermark"
            width={150}
            height={150}
            className={styles.watermarkImage}
          />
        </div>
      )}
    </div>
  );
}

