# Clutch Awards / Badges

This folder contains Clutch award badge images displayed on the homepage with infinite horizontal scroll.

## How to Add Your Badges

Add 15 badge images to this folder with the following naming convention:

- `badge_1.png`
- `badge_2.png`
- `badge_3.png`
- ... up to ...
- `badge_15.png`

## Badge Titles

To update the badge titles, edit the file:
`/components/sections/ClutchAwardsSection.tsx`

Find the `badges` array and update the `title` property for each badge:

```tsx
const badges = [
  { id: 1, title: 'Your Badge Title 1' },
  { id: 2, title: 'Your Badge Title 2' },
  // ... etc
];
```

## Supported Formats

- PNG (recommended, with transparent background)
- JPG/JPEG

## Image Specifications

- Recommended size: 200x200px or larger (square format)
- The images will be automatically:
  - Converted to grayscale (black & white effect)
  - Scaled to fit 160x160px display area
  - Return to color on hover

## Features

- Infinite horizontal scroll animation (like Apple Clock picker)
- Automatic grayscale filter applied
- Hover effect: scales up and shows in color
- All badges link to: http://clutch.co/profile/fomo-0
- Smooth animation that pauses on hover

## Example

Replace the placeholder files with your actual Clutch award/badge images downloaded from your Clutch profile.