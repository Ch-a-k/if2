import category from './category'
import teamMember from './teamMember'
import specialist from './specialist'
import testimonialNew from './testimonialNew'
import clutchBadge from './clutchBadge'
import project from './project'
import blogPost from './blogPost'
import author from './author'
import partner from './partner'
import siteSettings from './siteSettings'
import watermarkSettings from './watermarkSettings'

export const schemaTypes = [
  // Settings
  siteSettings,
  watermarkSettings,
  
  // Content Management
  category,
  
  // Team & Company
  teamMember,
  specialist,
  partner,
  
  // Social Proof
  testimonialNew,
  clutchBadge,
  
  // Portfolio & Blog
  project,
  blogPost,
  author,
]
