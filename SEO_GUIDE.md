# SEO Best Practices - Implementation Guide

## ✅ What's Implemented

This project follows **modern SEO best practices** for maximum search engine visibility and social sharing.

---

## 🎯 Core SEO Features

### 1. Meta Tags

**Implementation:** `src/components/seo/SEO.astro`

✅ **Basic Meta Tags**
- Title tag (optimized length)
- Meta description (155 chars)
- Robots directives (index/noindex, follow/nofollow)
- Canonical URLs

✅ **Open Graph (Facebook, LinkedIn)**
- og:type (website/article)
- og:title
- og:description
- og:image (with alt text)
- og:url
- og:site_name
- og:locale

✅ **Twitter Cards**
- twitter:card (summary_large_image)
- twitter:title
- twitter:description
- twitter:image (with alt)

✅ **Article-Specific**
- article:published_time
- article:modified_time
- article:author
- article:tag
- article:section

---

### 2. Structured Data (JSON-LD)

**Schema.org** markup for rich snippets in search results.

#### Website Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WardayaHub",
  "url": "https://wardayahub.vercel.app",
  "description": "..."
}
```

#### Article Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Post Title",
  "datePublished": "2026-02-03",
  "dateModified": "2026-02-03",
  "author": {
    "@type": "Person",
    "name": "John Doe"
  },
  "publisher": {
    "@type": "Organization",
    "name": "WardayaHub"
  }
}
```

**Benefits:**
- Rich snippets in Google search
- Article cards with author info
- Enhanced mobile search results

---

### 3. Sitemap Generation

**Implementation:** `@astrojs/sitemap` integration

**File:** `astro.config.mjs`

Automatically generates:
- `sitemap-index.xml` - Main sitemap index
- `sitemap-0.xml` - Pages sitemap

**Features:**
- Auto-updates on build
- Includes all static pages
- Proper priority and changefreq
- Submitted to search engines via robots.txt

**Access:** https://yourdomain.com/sitemap-index.xml

---

### 4. Robots.txt

**File:** `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://wardayahub.vercel.app/sitemap-index.xml
```

**Purpose:**
- Guide search engine crawlers
- Point to sitemap location
- Control crawling behavior

---

### 5. Accessible HTML Structure

**Semantic HTML5:**
- `<header role="banner">` - Site header
- `<nav role="navigation">` - Navigation menus
- `<main role="main">` - Main content
- `<article>` - Blog posts
- `<footer role="contentinfo">` - Site footer

**ARIA Attributes:**
- `aria-label` - Descriptive labels
- `aria-current="page"` - Current page indicator
- `aria-hidden` - Hide decorative elements

**Keyboard Navigation:**
- Skip to main content link
- Focus visible styles
- Proper tab order

**Screen Reader Support:**
- Alt text on images
- Semantic heading hierarchy (h1 → h2 → h3)
- Descriptive link text

---

## 📚 SEO Utilities

**File:** `src/utils/seo.ts`

### Available Functions

#### `generateTitle(pageTitle, siteName)`
Creates consistent title format with site name.
```typescript
generateTitle('Blog Post', 'WardayaHub')
// Returns: "Blog Post | WardayaHub"
```

#### `truncateDescription(description, maxLength)`
Ensures meta descriptions are optimal length.
```typescript
truncateDescription(longText, 155)
// Returns: "First 155 chars..."
```

#### `getOgImageUrl(imagePath, siteUrl)`
Converts relative URLs to absolute for social sharing.
```typescript
getOgImageUrl('/images/post.jpg', 'https://example.com')
// Returns: "https://example.com/images/post.jpg"
```

#### `calculateReadingTime(content)`
Estimates reading time for articles.
```typescript
calculateReadingTime(postContent)
// Returns: 5 (minutes)
```

#### `generateBreadcrumbSchema(items)`
Creates breadcrumb structured data.
```typescript
generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Blog', url: '/blog' },
  { name: 'Post Title', url: '/blog/post-slug' }
])
```

---

## 🎨 Usage Examples

### Basic Page SEO
```astro
<BaseLayout
  seo={{
    title: 'Page Title',
    description: 'Page description',
    type: 'website',
  }}
>
  <!-- Content -->
</BaseLayout>
```

### Blog Post SEO
```astro
<BaseLayout
  seo={{
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    type: 'article',
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author.name,
    tags: post.tags,
  }}
>
  <article itemscope itemtype="https://schema.org/Article">
    <!-- Post content with microdata -->
  </article>
</BaseLayout>
```

### 404 or Error Pages
```astro
<BaseLayout
  seo={{
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
    noindex: true,  // Don't index error pages
    nofollow: true,
  }}
>
  <!-- Error content -->
</BaseLayout>
```

---

## 🔍 SEO Checklist

### On Every Page

- [ ] Unique `<title>` tag (50-60 chars)
- [ ] Unique meta description (155 chars)
- [ ] Canonical URL set
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Proper heading hierarchy (only one h1)
- [ ] Alt text on all images
- [ ] Semantic HTML structure

### On Blog Posts

- [ ] Article schema (JSON-LD)
- [ ] Published date
- [ ] Modified date
- [ ] Author information
- [ ] Tags/keywords
- [ ] Cover image with alt text
- [ ] Proper content structure (h2, h3)
- [ ] Internal links to related posts

### Site-Wide

- [ ] Sitemap generated and submitted
- [ ] Robots.txt configured
- [ ] HTTPS enabled
- [ ] Mobile responsive
- [ ] Fast page load (<3s)
- [ ] Accessible (WCAG AA)
- [ ] Clean URLs (no special chars)

---

## 🧪 Testing Your SEO

### 1. Meta Tags

**Use these tools:**
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

**Test:**
1. Enter your page URL
2. Check preview looks correct
3. Verify image, title, description

### 2. Structured Data

**Use:**
- [Google Rich Results Test](https://search.google.com/test/rich-results)

**Test:**
1. Enter page URL or code
2. Check for errors
3. Preview how it appears in search

### 3. Sitemap

**Check:**
```bash
# Visit your sitemap
https://yourdomain.com/sitemap-index.xml

# Should show XML with all pages
```

**Submit to:**
- Google Search Console
- Bing Webmaster Tools

### 4. Accessibility

**Use:**
- [WAVE Web Accessibility Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Chrome Lighthouse

**Test:**
1. Run accessibility audit
2. Fix errors and warnings
3. Ensure keyboard navigation works

### 5. Mobile Friendliness

**Use:**
- [Google Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**Check:**
- Text readable without zooming
- Touch targets large enough
- No horizontal scrolling

---

## 📊 Performance Tips

### Image Optimization
```astro
<!-- Use optimized images -->
<img 
  src={post.coverImage}
  alt={post.title}
  loading="lazy"  <!-- Lazy load -->
  width="800"     <!-- Specify dimensions -->
  height="600"
/>
```

### Preconnect to External Domains
```html
<link rel="preconnect" href="https://api.example.com" />
```

### Prefetch Critical Pages
```html
<link rel="prefetch" href="/blog" />
```

---

## 🎯 Content Guidelines

### Title Tag Best Practices
- Keep under 60 characters
- Include primary keyword
- Make it compelling/clickable
- Be unique per page
- Format: `Page Title | Site Name`

### Meta Description
- 155 characters max
- Include call-to-action
- Use active voice
- Include keywords naturally
- Be unique and relevant

### URL Structure
- Use hyphens, not underscores
- Lowercase only
- Short and descriptive
- Include keywords
- Avoid special characters

**Good:**
```
/blog/getting-started-with-astro
/category/web-development
```

**Bad:**
```
/blog/post?id=123
/category_WebDevelopment
```

### Heading Hierarchy
```html
<h1>Page Title</h1>        <!-- Only one per page -->
<h2>Section Title</h2>      <!-- Main sections -->
<h3>Subsection</h3>         <!-- Under h2 -->
```

---

## 🚀 Deployment SEO Setup

### Before Launch

1. **Update site URL**
   ```env
   PUBLIC_SITE_URL=https://yourdomain.com
   ```

2. **Update robots.txt**
   ```txt
   Sitemap: https://yourdomain.com/sitemap-index.xml
   ```

3. **Update astro.config.mjs**
   ```js
   site: 'https://yourdomain.com'
   ```

### After Launch

1. **Submit Sitemap**
   - Google Search Console
   - Bing Webmaster Tools

2. **Verify Ownership**
   - Add meta tag verification
   - Or use DNS verification

3. **Request Indexing**
   - Submit important pages manually
   - Use URL inspection tool

4. **Monitor Performance**
   - Track rankings
   - Monitor crawl errors
   - Check Core Web Vitals

---

## 🔧 Advanced SEO Features

### Reading Time
```typescript
import { calculateReadingTime } from '../utils/seo';

const readingTime = calculateReadingTime(post.content);
// Display: "5 min read"
```

### Breadcrumbs
```astro
<nav aria-label="Breadcrumb">
  <ol itemscope itemtype="https://schema.org/BreadcrumbList">
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/" itemprop="item">Home</a>
      <meta itemprop="position" content="1" />
    </li>
    <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      <a href="/blog" itemprop="item">Blog</a>
      <meta itemprop="position" content="2" />
    </li>
  </ol>
</nav>
```

### FAQ Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "What is WardayaHub?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "WardayaHub is..."
    }
  }]
}
```

---

## 📖 Resources

**Official Docs:**
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Cards](https://developer.twitter.com/en/docs/twitter-for-websites/cards)

**Tools:**
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Screaming Frog](https://www.screamingfrog.co.uk/seo-spider/)

**Testing:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

---

## ✅ Summary

**SEO Features Implemented:**
✅ Meta tags (title, description, robots)
✅ Open Graph tags (Facebook, LinkedIn)
✅ Twitter Cards
✅ JSON-LD structured data
✅ Sitemap generation
✅ Robots.txt
✅ Accessible HTML structure
✅ Semantic markup
✅ ARIA attributes
✅ SEO utility functions

**Ready for:**
- Google indexing
- Social media sharing
- Rich snippets
- Voice search
- Mobile-first indexing

**Your site is SEO-optimized! 🚀**
