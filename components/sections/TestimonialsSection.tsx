import {client, queries, type TestimonialNew} from '@/lib/sanity';
import TestimonialsClient from './TestimonialsClient';

export const revalidate = 3600; // Обновление каждый час (или по webhook)

export default async function TestimonialsSection() {
  let testimonials: TestimonialNew[] = [];

  try {
    testimonials = await client.fetch<TestimonialNew[]>(queries.testimonials);
    console.log('✅ Testimonials loaded:', testimonials.length);
    
    // Подробное логирование каждого testimonial
    testimonials.forEach((t, i) => {
      console.log(`📝 Testimonial ${i + 1}:`, {
        author: t.author,
        hasMedia: t.hasMedia,
        mediaType: t.mediaType,
        videoSource: t.videoSource,
        hasVideoFile: !!t.mediaVideoFile,
        hasVideoUrl: !!t.mediaVideoUrl,
        videoUrl: t.mediaVideoUrl,
      });
    });
  } catch (error) {
    console.error('❌ Error fetching testimonials:', error);
    // Показываем секцию только если есть данные
    return null;
  }

  // Если нет отзывов, не показываем секцию
  if (!testimonials || testimonials.length === 0) {
    console.log('ℹ️ No testimonials found in Sanity');
    return null;
  }

  return <TestimonialsClient testimonials={testimonials} />;
}
