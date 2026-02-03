# SEO Quick Checklist

## ✅ Pre-Launch SEO Checklist

### Configuration
- [ ] Update `PUBLIC_SITE_URL` in `.env` to production URL
- [ ] Update `site` in `astro.config.mjs` to production URL
- [ ] Update sitemap URL in `robots.txt`

### Meta Tags (Every Page)
- [ ] Unique page title (50-60 chars)
- [ ] Unique meta description (155 chars)
- [ ] Open Graph image (1200x630px recommended)
- [ ] Proper canonical URL

### Content
- [ ] Only one H1 per page
- [ ] Logical heading hierarchy (H1 → H2 → H3)
- [ ] Alt text on all images
- [ ] Descriptive link text (no "click here")
- [ ] Internal links to related content

### Technical
- [ ] HTTPS enabled
- [ ] Mobile responsive (test on real devices)
- [ ] Page load speed < 3 seconds
- [ ] No broken links (404s)
- [ ] Clean URL structure (lowercase, hyphens)
- [ ] XML sitemap generated
- [ ] Robots.txt accessible

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader friendly
- [ ] Color contrast ratio meets WCAG AA
- [ ] Skip to main content link

### Schema.org
- [ ] WebSite schema on home page
- [ ] Article schema on blog posts
- [ ] Author information on posts
- [ ] Published/modified dates

---

## 🧪 Post-Launch Testing

### Validate Meta Tags
- [ ] Test with [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Test with [LinkedIn Inspector](https://www.linkedin.com/post-inspector/)

### Validate Structured Data
- [ ] Test with [Google Rich Results](https://search.google.com/test/rich-results)
- [ ] No errors in structured data
- [ ] Preview looks correct

### Check Sitemap
- [ ] Access `/sitemap-index.xml`
- [ ] All important pages listed
- [ ] No 404 pages in sitemap

### Submit to Search Engines
- [ ] Google Search Console - Submit sitemap
- [ ] Bing Webmaster Tools - Submit sitemap
- [ ] Request indexing for key pages

### Performance
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/)
- [ ] Score > 90 for Performance
- [ ] Score > 90 for SEO
- [ ] Score > 90 for Accessibility
- [ ] Fix any issues

### Accessibility
- [ ] Run [WAVE](https://wave.webaim.org/)
- [ ] No errors
- [ ] Resolve warnings if possible

### Mobile
- [ ] Test with [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)
- [ ] Passes all checks
- [ ] Test on actual mobile devices

---

## 📊 Ongoing Monitoring

### Weekly
- [ ] Check Search Console for errors
- [ ] Monitor Core Web Vitals
- [ ] Review new crawl issues

### Monthly
- [ ] Check rankings for target keywords
- [ ] Review top-performing pages
- [ ] Analyze bounce rate and engagement
- [ ] Update outdated content

### Quarterly
- [ ] Comprehensive SEO audit
- [ ] Update meta descriptions if needed
- [ ] Refresh old content
- [ ] Build new quality backlinks

---

## 🎯 Per-Page SEO Checklist

Use this for each new page/post:

### Before Publishing
- [ ] Title optimized (keyword + compelling)
- [ ] Description written (155 chars, CTA)
- [ ] URL slug is clean (lowercase, hyphens)
- [ ] H1 matches title or intent
- [ ] At least 300 words of content
- [ ] Images optimized (compressed, alt text)
- [ ] Internal links added (2-3 minimum)
- [ ] External links checked (open in new tab)
- [ ] Schema markup added if applicable
- [ ] Mobile preview checked

### After Publishing
- [ ] Test all links work
- [ ] Check social media preview
- [ ] Verify in sitemap
- [ ] Request indexing (Search Console)
- [ ] Share on social media

---

## 🚨 Common SEO Issues to Avoid

### ❌ Don't
- Use duplicate titles across pages
- Stuff keywords unnaturally
- Use generic meta descriptions
- Have broken links
- Use images without alt text
- Create thin content (< 300 words)
- Have slow page load times
- Ignore mobile users
- Block pages in robots.txt that should be indexed
- Use multiple H1 tags

### ✅ Do
- Write unique, compelling titles
- Use keywords naturally
- Create unique, descriptive meta descriptions
- Check and fix broken links regularly
- Add descriptive alt text to images
- Create comprehensive, valuable content
- Optimize for speed (< 3s load time)
- Ensure mobile-friendly design
- Use robots.txt correctly
- Use proper heading hierarchy

---

## 📈 Success Metrics

Track these in Google Analytics / Search Console:

### Traffic
- [ ] Organic search traffic growing
- [ ] Impressions in search results increasing
- [ ] Click-through rate (CTR) improving

### Engagement
- [ ] Bounce rate decreasing
- [ ] Time on page increasing
- [ ] Pages per session increasing

### Technical
- [ ] No increase in crawl errors
- [ ] Page speed scores maintained
- [ ] Mobile usability issues = 0

### Rankings
- [ ] Target keywords ranking
- [ ] Featured snippets earned
- [ ] Rich results appearing

---

## 🎓 Quick Tips

**Title Tags:**
- Include primary keyword near the start
- Keep under 60 characters
- Make it unique and compelling

**Meta Descriptions:**
- Include a call-to-action
- Use active voice
- Include primary and secondary keywords
- 155 characters max

**Images:**
- Compress before upload (use TinyPNG)
- Use descriptive filenames (blog-post-seo.jpg)
- Add alt text for accessibility and SEO
- Specify width and height attributes

**Internal Linking:**
- Link to related content
- Use descriptive anchor text
- Don't overdo it (2-5 links per post)

**Content:**
- Write for humans first, search engines second
- Answer user questions thoroughly
- Use natural language
- Break up text with headings and lists

---

## 🔗 Quick Links

**Your SEO Pages:**
- Sitemap: https://yourdomain.com/sitemap-index.xml
- Robots: https://yourdomain.com/robots.txt

**Testing Tools:**
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

**Documentation:**
- Full SEO Guide: `SEO_GUIDE.md`
- Blog Integration: `BLOG_INTEGRATION.md`
- Testing Guide: `TESTING_GUIDE.md`

---

**Print this checklist and use it for every page! ✅**
