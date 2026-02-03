# WardayaHub - Project Structure

## Directory Structure

```
wardayahub/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   ├── blog/            # Blog-specific components
│   │   └── seo/             # SEO components (SEO.astro)
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout template
│   ├── pages/
│   │   ├── index.astro      # Home page
│   │   ├── blog/            # Blog pages
│   │   └── category/        # Category pages
│   ├── styles/              # Global styles
│   ├── lib/
│   │   └── strapi.ts        # Strapi API client
│   ├── types/
│   │   ├── index.ts         # Core types (Post, Author, Category)
│   │   └── seo.ts           # SEO types
│   ├── utils/
│   │   └── helpers.ts       # Utility functions
│   └── env.d.ts             # TypeScript environment definitions
├── public/                  # Static assets
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript configuration
├── package.json
└── .env.example             # Environment variables template
```

## Key Features

### SEO Optimization
- Meta tags and Open Graph support via `SEO.astro` component
- Canonical URLs
- Twitter Card support
- Article-specific metadata

### TypeScript Support
- Strict type checking enabled
- Type definitions for Strapi responses
- Environment variable typing

### Performance
- Static Site Generation (SSG)
- Prefetching enabled
- Optimized build output
- React islands for interactivity only

### Strapi Integration
- Ready for REST API integration
- Type-safe API client in `src/lib/strapi.ts`
- Environment-based configuration

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
PUBLIC_SITE_URL=https://yourdomain.com
PUBLIC_SITE_NAME=WardayaHub
PUBLIC_SITE_DESCRIPTION=Your description
```

## Next Steps

1. Set up Strapi CMS backend
2. Create blog listing page
3. Create blog detail page
4. Add category filtering
5. Connect to Strapi API

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
