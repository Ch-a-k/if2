import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type {SanityImageSource} from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'wx6ubarj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for development
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper function to get image URL
export function getImageUrl(image: any): string | null {
  if (!image) return null
  if (!image.asset) return null
  return urlFor(image).url()
}

// Helper function to get OG image URL with proper dimensions
export function getOgImageUrl(image: any): string | null {
  if (!image) return null
  if (!image.asset) return null
  return urlFor(image)
    .width(1200)
    .height(630)
    .fit('crop')
    .format('jpg')
    .quality(90)
    .url()
}

// Helper function to get watermark CSS position class
export function getWatermarkPositionClass(position?: string): string {
  switch (position) {
    case 'top-left':
      return 'watermark-top-left'
    case 'top-right':
      return 'watermark-top-right'
    case 'bottom-left':
      return 'watermark-bottom-left'
    case 'bottom-right':
      return 'watermark-bottom-right'
    case 'center':
    default:
      return 'watermark-center'
  }
}

export function getFileUrl(file: any): string | null {
  if (!file) return null
  if (!file.asset) return null
  const ref = file.asset._ref
  if (!ref) return null
  
  // Format: file-{id}-{extension}
  const [, id, extension] = ref.split('-')
  if (!id || !extension) return null
  
  return `https://cdn.sanity.io/files/${client.config().projectId}/${client.config().dataset}/${id}.${extension}`
}

// Types
export interface TeamMember {
  _id: string
  name: string
  role: string
  category: 'leadership' | 'management' | 'development' | 'design'
  order?: number
}

export interface Specialist {
  _id: string
  title: string
  count: number
  iconType: 'emoji' | 'svg'
  icon?: string
  svgCode?: string
  order?: number
}

export interface Partner {
  _id: string
  name: string
  logo: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  url: string
  subtitle?: string
  order?: number
}

export interface Testimonial {
  _id: string
  quote: string
  author: string
  position: string
  company: string
  media?: {
    type: 'image' | 'video'
    file: {
      asset: {
        _ref: string
        _type: 'reference'
      }
    }
  }
  companyLogo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  clutchLink?: string
  caseStudyLink?: string
  order?: number
}

export interface ClutchBadge {
  _id: string
  title: string
  image: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  order?: number
}

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
  description?: string
  type: 'blog' | 'project' | 'both'
  color?: string
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  description: any[]
  coverImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    watermark?: WatermarkSettings
  }
  logo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  heroImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    watermark?: WatermarkSettings
  }
  services?: string[]
  gallery?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
    wide?: boolean
    watermark?: WatermarkSettings
  }[]
  process?: {
    icon: string
    title: string
    description: string
  }[]
  category: Category
  tags?: string[]
  client?: string
  year: number
  link?: string
  featured: boolean
  order?: number
  publishedAt: string
}

export interface Author {
  _id: string
  name: string
  slug: {
    current: string
  }
  image?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  bio?: string
  role?: string
}

export interface TestimonialNew {
  _id: string
  quote: string
  author: string
  position: string
  company: string
  hasMedia: boolean
  mediaType?: 'image' | 'video'
  mediaImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  videoSource?: 'file' | 'url'
  mediaVideoFile?: {
    asset: {
      _ref: string
      _type: 'reference'
      url?: string
    }
  }
  mediaVideoUrl?: string
  hasCompanyLogo: boolean
  companyLogo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  clutchLink?: string
  caseStudySlug?: string // Already resolved by query
  order?: number
}

export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  content: any[]
  coverImage: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt: string
    watermark?: WatermarkSettings
  }
  author: Author
  category: Category
  tags?: string[]
  seoKeywords?: string[]
  readTime?: number
  publishedAt: string
  featured: boolean
}

export interface WatermarkSettings {
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center'
  opacity?: number
}

export interface PageSeo {
  ogTitle?: string
  ogDescription?: string
  ogImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
}

export interface SiteSettings {
  _id: string
  title: string
  description: string
  ogImage?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
    alt?: string
  }
  watermarkLogo?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  favicon?: {
    asset: {
      _ref: string
      _type: 'reference'
    }
  }
  gtmId?: string
  cloudflareToken?: string
  hotjarId?: number
  telegramBotToken?: string
  telegramChatId?: string
  homePageSeo?: PageSeo
  aboutPageSeo?: PageSeo
  worksPageSeo?: PageSeo
  blogPageSeo?: PageSeo
  contactPageSeo?: PageSeo
}

// Queries
export const queries = {
  // Team
  teamMembers: `*[_type == "teamMember"] | order(order asc)`,
  specialists: `*[_type == "specialist"] | order(order asc)`,
  partners: `*[_type == "partner"] | order(order asc)`,
  
  // Social Proof
  testimonials: `*[_type == "testimonialNew"] | order(order asc) {
    _id,
    quote,
    author,
    position,
    company,
    hasMedia,
    mediaType,
    mediaImage,
    videoSource,
    mediaVideoFile,
    mediaVideoUrl,
    hasCompanyLogo,
    companyLogo,
    clutchLink,
    "caseStudySlug": caseStudySlug->slug.current,
    order
  }`,
  clutchBadges: `*[_type == "clutchBadge"] | order(order asc)`,
  
  // Projects
  projects: `*[_type == "project"] | order(order asc, publishedAt desc){
    ...,
    category->
  }`,
  featuredProjects: `*[_type == "project" && featured == true] | order(order asc) [0...6]{
    ...,
    category->
  }`,
  projectBySlug: (slug: string) => `*[_type == "project" && slug.current == "${slug}"][0]{
    ...,
    category->
  }`,
  projectsSlugs: `*[_type == "project"]{slug}`,
  
  // Blog
  blogPosts: `*[_type == "blogPost"] | order(publishedAt desc){
    ...,
    author->,
    category->
  }`,
  featuredBlogPosts: `*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3]{
    ...,
    author->,
    category->
  }`,
  blogPostBySlug: (slug: string) => `*[_type == "blogPost" && slug.current == "${slug}"][0]{
    ...,
    author->,
    category->
  }`,
  blogPostsSlugs: `*[_type == "blogPost"]{slug}`,
  
  // Get adjacent blog posts
  adjacentBlogPosts: (date: string) => `{
    "next": *[_type == "blogPost" && publishedAt > "${date}"] | order(publishedAt asc) [0]{
      ...,
      author->,
      category->
    },
    "previous": *[_type == "blogPost" && publishedAt < "${date}"] | order(publishedAt desc) [0]{
      ...,
      author->,
      category->
    }
  }`,
  
  // Categories
  categories: `*[_type == "category"] | order(title asc)`,
  blogCategories: `*[_type == "category" && (type == "blog" || type == "both")] | order(title asc)`,
  projectCategories: `*[_type == "category" && (type == "project" || type == "both")] | order(title asc)`,
  
  // Site Settings
  siteSettings: `*[_type == "siteSettings" && _id == "siteSettings"][0]`,
}
