# Testimonials Media

This folder contains images, videos, and company logos for client testimonials.

## How to Add Testimonials

Edit the file: `/components/sections/TestimonialsSection.tsx`

### Testimonial Structure

```tsx
{
  quote: "Your testimonial text here",
  author: "Client Name",
  position: "Job Title at",
  company: "Company Name",
  
  // Optional: Add photo or video
  media: {
    type: 'image',  // or 'video'
    src: '/testimonials/your-file.jpg'
  },
  
  // Optional: Add company logo
  companyLogo: '/testimonials/company-logo.png',
  
  // Optional: Add Clutch review link
  clutchLink: 'https://clutch.co/profile/fomo-0#review-123456',
  
  // Optional: Add case study link
  caseStudyLink: '/works/project-slug'
}
```

## Media Files

### Images
- Supported formats: JPG, PNG, WebP
- Recommended size: 400x600px (portrait) or 600x400px (landscape)
- Optimal file size: < 500KB

### Videos
- Supported formats: MP4, WebM
- Recommended resolution: 720p or 1080p
- Optimal file size: < 5MB

### Company Logos
- Supported formats: PNG (with transparency), SVG
- Recommended size: 240x80px or similar aspect ratio
- Will be displayed as white monochrome

## Examples

### Full Testimonial (with everything)
```tsx
{
  quote: "They are an excellent agency and this is coming from someone who has changed agencies 4 times.",
  author: "Anastasios Anastasiadis",
  position: "CEO at",
  company: "Norma",
  media: {
    type: 'image',
    src: '/testimonials/client-1.jpg'
  },
  companyLogo: '/testimonials/norma-logo.png',
  clutchLink: 'https://clutch.co/profile/fomo-0',
  caseStudyLink: '/works/norma'
}
```

### Text-Only Testimonial (without media)
```tsx
{
  quote: "Working with IN-FOMO. transformed our digital presence completely.",
  author: "Sarah Johnson",
  position: "CEO at",
  company: "TechStart",
  clutchLink: 'https://clutch.co/profile/fomo-0'
}
```

### With Video
```tsx
{
  quote: "The results exceeded our expectations.",
  author: "John Smith",
  position: "CTO at",
  company: "StartupXYZ",
  media: {
    type: 'video',
    src: '/testimonials/client-video.mp4'
  },
  caseStudyLink: '/works/startupxyz'
}
```

## Navigation

- Use left/right arrow buttons to navigate between testimonials
- Click on dots at the bottom to jump to specific testimonial
- Testimonials auto-adapt layout:
  - With media: image/video on left, text on right
  - Without media: full-width text layout

## Tips

1. Keep quotes concise but impactful (1-3 sentences ideal)
2. Always include author name and position for credibility
3. Add company logos when available for brand recognition
4. Link to case studies when you have detailed project pages
5. Link to Clutch reviews for third-party validation
