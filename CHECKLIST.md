# ✅ WardayaHub Setup Checklist

## Phase 1: Astro Frontend ✅ COMPLETE

- [x] Create Astro project
- [x] Add TypeScript (strict mode)
- [x] Add React integration
- [x] Set up folder structure
- [x] Configure SEO settings
- [x] Create base layout
- [x] Create home page
- [x] Create SEO component
- [x] Create API client utility
- [x] Add type definitions
- [x] Configure environment variables
- [x] Pass TypeScript checks

**Status:** ✅ Ready for development

---

## Phase 2: Strapi Backend ⏳ YOUR TASK

### Installation
- [ ] Run: `npx create-strapi-app@latest wardayahub-cms`
- [ ] Choose "Quickstart"
- [ ] Skip cloud login
- [ ] Wait for installation to complete

### First Start
- [ ] Run: `cd wardayahub-cms && npm run develop`
- [ ] Wait for admin panel to build
- [ ] Browser opens at http://localhost:1337/admin

### Admin Setup
- [ ] Create admin user
  - [ ] Enter email
  - [ ] Create strong password
  - [ ] Enter name
  - [ ] Click "Let's start"

### Content Types
- [ ] **Author**
  - [ ] Create collection type "Author"
  - [ ] Add field: name (Text, required)
  - [ ] Add field: email (Email)
  - [ ] Add field: avatar (Media, single)
  - [ ] Add field: bio (Text, long)
  - [ ] Click Save
  - [ ] Wait for restart

- [ ] **Category**
  - [ ] Create collection type "Category"
  - [ ] Add field: name (Text, required)
  - [ ] Add field: slug (UID → name)
  - [ ] Add field: description (Text, long)
  - [ ] Click Save
  - [ ] Wait for restart

- [ ] **Post**
  - [ ] Create collection type "Post"
  - [ ] Add field: title (Text, required)
  - [ ] Add field: slug (UID → title)
  - [ ] Add field: content (Rich Text, required)
  - [ ] Add field: excerpt (Text, long)
  - [ ] Add field: coverImage (Media, single)
  - [ ] Add field: publishedAt (DateTime)
  - [ ] Add relation: author (Post has one Author)
  - [ ] Add relation: category (Post has one Category)
  - [ ] Click Save
  - [ ] Wait for restart

### API Permissions
- [ ] Go to Settings → Roles → Public
- [ ] For **Author**:
  - [ ] Check: find
  - [ ] Check: findOne
- [ ] For **Category**:
  - [ ] Check: find
  - [ ] Check: findOne
- [ ] For **Post**:
  - [ ] Check: find
  - [ ] Check: findOne
- [ ] Click Save (top right)

### Sample Data
- [ ] **Create Author**
  - [ ] Content Manager → Author → Create
  - [ ] Name: John Doe
  - [ ] Email: john@example.com
  - [ ] Bio: (add some text)
  - [ ] Save + Publish

- [ ] **Create Categories** (at least 2)
  - [ ] Category 1: Technology
  - [ ] Category 2: Lifestyle
  - [ ] (Optional) Category 3: Business
  - [ ] Save + Publish each

- [ ] **Create Posts** (at least 2)
  - [ ] Post 1:
    - [ ] Title, slug, content, excerpt
    - [ ] Select author: John Doe
    - [ ] Select category: Technology
    - [ ] Set publishedAt date
    - [ ] Save + Publish
  - [ ] Post 2:
    - [ ] Title, slug, content, excerpt
    - [ ] Select author: John Doe
    - [ ] Select category: Lifestyle
    - [ ] Set publishedAt date
    - [ ] Save + Publish

### Testing
- [ ] Open: http://localhost:1337/api/posts?populate=*
  - [ ] Should see JSON with your posts
- [ ] Open: http://localhost:1337/api/categories
  - [ ] Should see JSON with categories
- [ ] Open: http://localhost:1337/api/authors
  - [ ] Should see JSON with authors

### Optional: API Token
- [ ] Settings → API Tokens → Create
- [ ] Name: Astro Frontend
- [ ] Type: Read-only
- [ ] Duration: Unlimited
- [ ] Permissions: find, findOne (all types)
- [ ] Click Save
- [ ] Copy the token
- [ ] Add to `wardayahub/.env`:
  ```
  STRAPI_URL=http://localhost:1337
  STRAPI_API_TOKEN=your_copied_token
  ```

**Status:** ⏳ Pending - Follow `START_HERE.md`

---

## Phase 3: Integration (After Phase 2)

### Blog Pages
- [ ] Create `src/pages/blog/index.astro` (blog list)
- [ ] Create `src/pages/blog/[slug].astro` (blog detail)
- [ ] Fetch posts from Strapi API
- [ ] Display posts with styling
- [ ] Add pagination

### Category Pages
- [ ] Create `src/pages/category/[slug].astro`
- [ ] Fetch categories from Strapi
- [ ] Filter posts by category
- [ ] Display filtered results

### Components
- [ ] Create blog card component
- [ ] Create author card component
- [ ] Create category badge component
- [ ] Add loading states

### Features
- [ ] SEO meta tags for each page
- [ ] Open Graph images
- [ ] Responsive design
- [ ] Navigation improvements
- [ ] Search functionality (optional)

### Testing
- [ ] Test all pages load correctly
- [ ] Test API integration
- [ ] Check SEO tags
- [ ] Test responsive design
- [ ] Verify build process

### Deployment
- [ ] Deploy Strapi to Railway/Render
- [ ] Update STRAPI_URL in Astro
- [ ] Deploy Astro to Vercel/Netlify
- [ ] Test production site

**Status:** 🔜 Coming soon

---

## Quick Links

**Start Here:**
- `START_HERE.md` ⭐ - Your action plan

**Guides:**
- `STRAPI_QUICK_SETUP.md` - Quick checklist
- `STRAPI_SETUP_GUIDE.md` - Detailed guide
- `ARCHITECTURE.md` - System overview

**Reference:**
- `COMPLETE_SETUP_STATUS.md` - Current status
- `strapi-schemas/` - Content type examples

---

## Progress Tracker

```
Phase 1: Astro    ████████████████████ 100% ✅
Phase 2: Strapi   ░░░░░░░░░░░░░░░░░░░░   0% ⏳
Phase 3: Features ░░░░░░░░░░░░░░░░░░░░   0% 🔜
```

**Current Step:** Create Strapi project

**Next Command:**
```bash
cd /home/fawwazmw/Documents/wardayadev
npx create-strapi-app@latest wardayahub-cms
```

---

**Last Updated:** 2026-02-03
