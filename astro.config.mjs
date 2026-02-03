// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), sitemap()],
  
  // SEO & Performance optimizations
  site: 'https://wardayahub.vercel.app', // Update with your actual domain
  
  build: {
    inlineStylesheets: 'auto',
  },
  
  // Prefetch configuration for better navigation
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  
  // Image optimization
  image: {
    domains: ['localhost'],
  },
  
  // SSG output (default, but explicit for clarity)
  output: 'static',
});