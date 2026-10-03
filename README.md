# Baqiatullah Foundation Website

## Overview

The Baqiatullah Foundation Pakistan website is a responsive, frontend-first React experience for sharing the foundation's work, projects, impact, stories, contact details, and donation instructions.

## Technology Stack

- React 18 and Vite
- React Router with Vercel SPA rewrites
- Framer Motion for restrained route, hero, and scroll motion
- React Leaflet and OpenStreetMap tiles for the location map
- Lucide React for interface and social icons
- CSS design tokens in `src/styles/variables.css` and `src/styles/globals.css`

## Project Structure

- `src/App.jsx`: routes and page compositions
- `src/components/`: hero slideshow, preloader, optimized images, and social links
- `src/data/`: foundation content and reusable location configuration
- `src/styles/`: global layout, responsive rules, and design tokens
- `index.html`: document metadata and application entry point
- `vercel.json`: SPA fallback for direct route visits

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

There is currently no lint or typecheck script in `package.json`.

## Deployment to Vercel

Import the repository into Vercel. The included `vercel.json` rewrites application routes to `index.html`, allowing React Router routes to work on direct visits and refreshes.

## Environment Variables

No runtime environment variables are required. `VITE_API_BASE_URL` remains reserved in `.env.example` for a future backend integration.

## Image Optimization Strategy

`src/components/OptimizedImage.jsx` provides explicit dimensions, responsive `sizes`, priority-aware loading, a short reveal, stable aspect-ratio space, and a neutral fallback for failed images.

- Unsplash requests use WebP-friendly `fm=webp` URLs with bounded display-oriented widths.
- Hero and genuinely prominent images use eager loading and high fetch priority.
- Gallery, project, team, and news imagery is lazy-loaded when below the first viewport.
- Explicit dimensions and aspect ratios prevent layout shifts.
- Foundation-hosted remote JPG images remain on the official source host; AVIF/WebP conversion for those files requires access to the original assets or an image CDN transformation service.

## Animation System

Framer Motion handles route transitions, hero slide transitions, scroll reveals, and card hover states. CSS handles lightweight image reveals and hero micro-motion. Motion respects `prefers-reduced-motion`; reduced-motion users receive static hero imagery and minimized transitions.

## Social Media Links

- LinkedIn: https://linkedin.com/in/baqiatullahfoundation
- YouTube: https://www.youtube.com/@baqiatullahfoundation
- Instagram: https://www.instagram.com/baqiatullahfoundation
- Facebook: https://www.facebook.com/baqiatullahfoundationofficial
- TikTok: https://www.tiktok.com/@baqiatullahfoundation

## Google Maps Location

Latitude: `31.4569996`

Longitude: `74.2504536`

Google Maps URL: https://www.google.com/maps/search/?api=1&query=31.4569996,74.2504536

The reusable values live in `src/data/location.js`. The Leaflet center, marker, popup, address card, and Google Maps buttons all use that configuration.

## Performance Guidelines

Use `OptimizedImage` for new content images. Provide the rendered width and height, a meaningful alt description, a realistic `sizes` value, and `priority` only when the image is genuinely visible in the first viewport. Keep remote image query widths close to the rendered size and avoid preloading entire galleries.

## Deployment Checklist

```bash
npm install
npm run build
npm run preview
```

Before deploying, verify the production preview at mobile and desktop widths, confirm direct route refreshes, check the exact map destination, and inspect the browser console for missing assets.
