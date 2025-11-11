# IN-FOMO. - Digital Solutions

Modern, minimalist website for IN-FOMO. IT company built with Next.js 14 and TypeScript.

## Features

- **Full Black Design**: Pure black (#000000) background with white text
- **Animated Borders**: Shimmering white borders on CTA buttons
- **Smooth Animations**: Complex hover effects and scroll-based animations
- **Parallax Effects**: Content slides over fixed background
- **Horizontal Scroll Services**: Apple-style draggable service cards
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **Modern Stack**: Next.js 14, TypeScript, CSS Modules

## Tech Stack

- Next.js 14
- TypeScript
- CSS Modules
- Inter Font

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
if2/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── about/
│   ├── contact/
│   └── works/
│       ├── page.tsx         # All works
│       └── [slug]/
│           └── page.tsx     # Individual project
├── components/
│   ├── Header.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── ServicesSection.tsx      # Horizontal scroll
│       ├── ValuesSection.tsx
│       ├── ApproachSection.tsx
│       ├── MarqueeSection.tsx
│       ├── WorksSection.tsx
│       └── CTASection.tsx
├── public/
│   └── logo.png
└── package.json
```

## Design Principles

- **Minimalist**: No borders, no section dividers
- **High Contrast**: Pure black (#000000) and white (#ffffff)
- **Accent Color**: #0d0d0d for subtle elements
- **Typography**: Inter font family, bold and clear
- **Rounded Corners**: 8-16px border radius for elements
- **Fixed Background**: Content scrolls over stationary background

## Color Palette

- Background: `#000000` (Pure Black)
- Text: `#ffffff` (White)
- Accent: `#0d0d0d` (Very Dark Gray)
- Text Secondary: `rgba(255, 255, 255, 0.7)`

## Pages

- **Home** (`/`): Hero, Marquee, Services (horizontal scroll), Values, Approach, Works, CTA sections
- **About Us** (`/about`): Company information and mission
- **Works** (`/works`): Portfolio of all projects
- **Project Details** (`/works/[slug]`): Individual project page with full details
- **Contact** (`/contact`): Contact form with animated border button

## Section Layouts

### Services Section
- **Horizontal Scroll**: Apple-style draggable carousel
- **20 Services**: All IT services including web, mobile, marketing, advertising, AI, blockchain, etc.
- **Drag to Scroll**: Mouse drag or touch swipe
- **Smooth Animation**: Cards lift on hover

### Values Section
- **Layout**: Left sticky title + Right scrollable content
- **Left**: "OUR CORE VALUES" heading and "Why businesses choose IN-FOMO." subtitle
- **Right**: Value cards that scroll independently

### Approach Section
- **Layout**: Left scrollable content + Right sticky title
- **Left**: Process steps that scroll
- **Right**: "Our Approach" heading stays fixed

### Works Section
- Featured projects in grid layout
- "All Cases" button with animated border
- Each project card links to detailed project page

## Animated Buttons

All CTA buttons feature:
- Black background with white text
- Shimmering white border animation
- 3-second infinite loop
- Gradient effect from bright to subtle white
- Hover effects with elevation

Locations:
- Header: "Start a Project"
- CTA Section: "Get in Touch"
- Works Section: "All Cases"
- Contact Forms: "Send Message"

## Customization

### Adding Services

Edit `/components/sections/ServicesSection.tsx` to add/modify services:

```typescript
const services = [
  {
    number: '01',
    title: 'Service Name',
    description: 'Service description here.',
  },
  // Add more...
];
```

### Changing Content

All content is hardcoded in component files. Edit directly:
- Hero text: `/components/sections/HeroSection.tsx`
- Services: `/components/sections/ServicesSection.tsx`
- Values: `/components/sections/ValuesSection.tsx`
- etc.

### Modifying Styles

Each component has its own CSS Module file. Styles are scoped to prevent conflicts.

### Adding Animations

The project uses native CSS animations and JavaScript for scroll effects. Check individual section components for examples.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - All rights reserved by IN-FOMO.# if2
