# WardayaHub - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP Request
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    ASTRO FRONTEND                            │
│                  (wardayahub)                                │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Pages (SSG)                                         │  │
│  │  • index.astro          → Home page                  │  │
│  │  • blog/index.astro     → Blog list                  │  │
│  │  • blog/[slug].astro    → Blog detail               │  │
│  │  • category/[slug].astro → Category filter          │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         │ Fetch at build time                │
│                         ↓                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  API Client (src/lib/strapi.ts)                      │  │
│  │  • fetchAPI() helper                                 │  │
│  │  • Type-safe requests                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
└─────────────────────────┼────────────────────────────────────┘
                          │
                          │ REST API Call
                          │ (http://localhost:1337/api/...)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    STRAPI CMS                                │
│                  (wardayahub-cms)                            │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Content Types                                       │  │
│  │  • Author   → name, email, avatar, bio               │  │
│  │  • Category → name, slug, description                │  │
│  │  • Post     → title, slug, content, coverImage       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  REST API Routes                                     │  │
│  │  • /api/authors                                      │  │
│  │  • /api/categories                                   │  │
│  │  • /api/posts?populate=*                             │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Database (SQLite)                                   │  │
│  │  • authors table                                     │  │
│  │  • categories table                                  │  │
│  │  • posts table                                       │  │
│  │  • Relations & indexes                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Flow

### 1. Content Creation (Strapi Admin)
```
Content Editor
    │
    ↓
Strapi Admin Panel (http://localhost:1337/admin)
    │
    ↓
Create/Edit Post
    │
    ↓
Save & Publish
    │
    ↓
SQLite Database
```

### 2. Static Site Generation (Build Time)
```
npm run build
    │
    ↓
Astro reads pages
    │
    ↓
Calls Strapi API
    │
    ↓
Fetches all posts/categories/authors
    │
    ↓
Generates static HTML files
    │
    ↓
dist/ folder (ready for deployment)
```

### 3. User Request (Runtime)
```
User visits site
    │
    ↓
Cloudflare/Vercel CDN
    │
    ↓
Serves pre-built HTML (instant!)
    │
    ↓
No API calls needed (already in HTML)
```

---

## Content Type Relationships

```
┌─────────────┐
│   Author    │
│             │
│ • name      │
│ • email     │
│ • avatar    │
│ • bio       │
└──────┬──────┘
       │
       │ has many
       ↓
┌─────────────┐      ┌─────────────┐
│    Post     │      │  Category   │
│             │      │             │
│ • title     │←─────│ • name      │
│ • slug      │ has  │ • slug      │
│ • content   │ one  │ • desc      │
│ • excerpt   │      └─────────────┘
│ • cover     │
│ • published │
└─────────────┘
```

**Relations:**
- 1 Author → Many Posts
- 1 Category → Many Posts
- 1 Post → 1 Author
- 1 Post → 1 Category

---

## Project File Structure

```
wardayadev/
│
├── wardayahub/                    # ✅ ASTRO FRONTEND
│   ├── src/
│   │   ├── components/
│   │   │   ├── seo/
│   │   │   │   └── SEO.astro     # Meta tags, OG
│   │   │   ├── blog/
│   │   │   └── common/
│   │   ├── layouts/
│   │   │   └── BaseLayout.astro  # Main template
│   │   ├── pages/
│   │   │   ├── index.astro       # Home
│   │   │   ├── blog/
│   │   │   │   ├── index.astro   # Blog list (TODO)
│   │   │   │   └── [slug].astro  # Blog detail (TODO)
│   │   │   └── category/
│   │   │       └── [slug].astro  # Category filter (TODO)
│   │   ├── lib/
│   │   │   └── strapi.ts         # API client
│   │   ├── types/
│   │   │   ├── index.ts          # Post, Author, Category
│   │   │   └── seo.ts            # SEO types
│   │   └── utils/
│   │       └── helpers.ts        # Utilities
│   ├── public/
│   ├── astro.config.mjs
│   ├── package.json
│   └── .env                      # STRAPI_URL, TOKEN
│
└── wardayahub-cms/                # ⏳ STRAPI BACKEND (TO CREATE)
    ├── src/
    │   └── api/
    │       ├── author/
    │       │   └── schema.json
    │       ├── category/
    │       │   └── schema.json
    │       └── post/
    │           └── schema.json
    ├── config/
    │   └── database.js
    ├── database/
    │   └── data.db              # SQLite file
    ├── public/
    │   └── uploads/             # Media files
    └── package.json
```

---

## Development Ports

| Service | Port | URL | Purpose |
|---------|------|-----|---------|
| Strapi Admin | 1337 | http://localhost:1337/admin | Content management |
| Strapi API | 1337 | http://localhost:1337/api | REST API |
| Astro Dev | 4321 | http://localhost:4321 | Frontend preview |

---

## API Response Format

### GET /api/posts?populate=*
```json
{
  "data": [
    {
      "id": 1,
      "attributes": {
        "title": "Getting Started with Astro",
        "slug": "getting-started-with-astro",
        "content": "...",
        "excerpt": "Quick intro",
        "publishedAt": "2026-02-03T10:00:00.000Z",
        "author": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "John Doe",
              "email": "john@example.com"
            }
          }
        },
        "category": {
          "data": {
            "id": 1,
            "attributes": {
              "name": "Technology",
              "slug": "technology"
            }
          }
        }
      }
    }
  ],
  "meta": {
    "pagination": { ... }
  }
}
```

---

## Build & Deployment Flow

### Development
```bash
# Terminal 1 - Strapi
cd wardayahub-cms
npm run develop        # Port 1337

# Terminal 2 - Astro
cd wardayahub
npm run dev           # Port 4321
```

### Production
```bash
# Strapi (Railway/Render)
npm run build
npm start

# Astro (Vercel/Netlify)
npm run build         # Creates dist/
# Deploy dist/ folder
```

---

## Environment Variables

### Astro (.env)
```env
STRAPI_URL=http://localhost:1337        # Dev
# STRAPI_URL=https://api.wardaya.com   # Prod

STRAPI_API_TOKEN=abc123...              # From Strapi

PUBLIC_SITE_URL=https://wardayahub.vercel.app
PUBLIC_SITE_NAME=WardayaHub
PUBLIC_SITE_DESCRIPTION=Headless CMS Blog
```

### Strapi (.env)
```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=generated_by_strapi
API_TOKEN_SALT=generated_by_strapi
ADMIN_JWT_SECRET=generated_by_strapi
JWT_SECRET=generated_by_strapi
```

---

## Security & Permissions

### Strapi Public Role
```
Author
  ├── find     ✅
  ├── findOne  ✅
  ├── create   ❌
  ├── update   ❌
  └── delete   ❌

Category
  ├── find     ✅
  ├── findOne  ✅
  └── ...      ❌

Post
  ├── find     ✅
  ├── findOne  ✅
  └── ...      ❌
```

### API Token (Optional)
- Read-only access
- Used in production
- Stored in Astro .env

---

This architecture ensures:
- ✅ Fast performance (pre-rendered HTML)
- ✅ Easy content management (Strapi admin)
- ✅ Type safety (TypeScript)
- ✅ SEO optimization (static pages)
- ✅ Scalability (CDN-friendly)
