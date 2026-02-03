# Quick Reference - WardayaHub

## Commands
```bash
npm run dev      # Start dev server (http://localhost:4321)
npm run build    # Build for production
npm run preview  # Preview production build
npm run check    # TypeScript check
```

## File Structure (Quick Glance)
```
📁 src/
  📁 components/  → Reusable UI (SEO.astro ✓)
  📁 layouts/     → BaseLayout.astro ✓
  📁 pages/       → Routes (index.astro ✓)
  📁 lib/         → Strapi API client ✓
  📁 types/       → TypeScript types ✓
  📁 utils/       → Helpers ✓
```

## Key Files
- `astro.config.mjs` → SEO & build config
- `.env.example` → Environment template
- `src/lib/strapi.ts` → API client
- `src/types/index.ts` → Data types

## Environment Variables
```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=
PUBLIC_SITE_URL=https://wardayahub.vercel.app
PUBLIC_SITE_NAME=WardayaHub
```

## Tech Stack
- Astro 5.17.1
- React 19 (islands)
- TypeScript (strict)
- Strapi (ready to connect)

## Status: ✅ Ready for Development
