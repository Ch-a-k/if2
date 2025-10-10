import {client, queries, type TestimonialNew} from '@/lib/sanity';
import TestimonialsClient from './TestimonialsClient';

export const revalidate = 3600; // Обновление каждый час (или по webhook)

export default async function TestimonialsSection() {
  let testimonials: TestimonialNew[] = [];

  try {
    testimonials = await client.fetch<TestimonialNew[]>(queries.testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return null;
  }

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return <TestimonialsClient testimonials={testimonials} />;
}
