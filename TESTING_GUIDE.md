# Testing Guide - Blog Integration

## 🧪 Testing Scenarios

### Scenario 1: Test with Strapi Running (Ideal)

**Prerequisites:**
- Strapi running on http://localhost:1337
- At least 2-3 posts created and published
- At least 1 category created
- At least 1 author created

**Steps:**

1. **Start Strapi:**
   ```bash
   cd /home/fawwazmw/Documents/wardayadev/wardayahub-cms
   npm run develop
   ```

2. **Verify Strapi API:**
   Open in browser:
   ```
   http://localhost:1337/api/posts?populate=*
   ```
   Should see JSON with your posts.

3. **Start Astro:**
   ```bash
   cd /home/fawwazmw/Documents/wardayadev/wardayahub
   npm run dev
   ```

4. **Test Home Page:**
   - Visit: http://localhost:4321
   - ✅ Should see "Recent Posts" section
   - ✅ Should see 3 post cards (or fewer if you have less)
   - ✅ Click "View All Posts" → goes to /blog

5. **Test Blog List:**
   - Visit: http://localhost:4321/blog
   - ✅ Should see all published posts
   - ✅ Grid layout looks good
   - ✅ Post cards show image, title, excerpt
   - ✅ Category badges visible
   - ✅ Hover effects work

6. **Test Blog Detail:**
   - Click any post card
   - ✅ URL: /blog/[post-slug]
   - ✅ Full post content displayed
   - ✅ Cover image shown
   - ✅ Author card visible
   - ✅ Category badge clickable
   - ✅ "Back to Blog" button works

7. **Test Category Page:**
   - Click category badge on any post
   - ✅ URL: /category/[category-slug]
   - ✅ Shows all posts in that category
   - ✅ Category name and description shown
   - ✅ Post count correct
   - ✅ "All Posts" button works

---

### Scenario 2: Test WITHOUT Strapi (Graceful Degradation)

**Steps:**

1. **Make sure Strapi is NOT running:**
   ```bash
   # Kill Strapi if running
   lsof -ti:1337 | xargs kill -9
   ```

2. **Start Astro:**
   ```bash
   npm run dev
   ```

3. **Test Home Page:**
   - Visit: http://localhost:4321
   - ✅ Features section still shows
   - ✅ NO "Recent Posts" section (expected)
   - ✅ No errors in console

4. **Test Blog List:**
   - Visit: http://localhost:4321/blog
   - ✅ Shows empty state
   - ✅ Message: "No blog posts available yet."
   - ✅ "Go Home" button works

5. **Test Direct Post URL:**
   - Visit: http://localhost:4321/blog/any-slug
   - ✅ Shows 404 or empty state
   - ✅ No crash

---

### Scenario 3: Test Build Process (Static Generation)

**Steps:**

1. **Ensure Strapi is running with data**

2. **Build the site:**
   ```bash
   npm run build
   ```

   **Expected output:**
   ```
   ✓ Building...
   ✓ Generating static routes
   ✓ [slug].astro → /blog/[each-post-slug]
   ✓ [slug].astro → /category/[each-category-slug]
   ```

3. **Preview the build:**
   ```bash
   npm run preview
   ```

4. **Test static site:**
   - Visit: http://localhost:4321
   - ✅ All pages load instantly
   - ✅ No API calls (check Network tab)
   - ✅ Everything pre-rendered

5. **Test WITHOUT Strapi:**
   - Stop Strapi
   - Refresh pages in preview
   - ✅ Still works! (because it's static)

---

## 🔍 Manual Testing Checklist

### Visual Testing

- [ ] **Responsive Design**
  - [ ] Desktop (1920px)
  - [ ] Tablet (768px)
  - [ ] Mobile (375px)

- [ ] **Post Cards**
  - [ ] Images load correctly
  - [ ] Text doesn't overflow
  - [ ] Hover effects smooth
  - [ ] Author avatars circular

- [ ] **Post Detail**
  - [ ] Hero image full width
  - [ ] Content readable
  - [ ] Code blocks styled (if any)
  - [ ] Images in content responsive

- [ ] **Typography**
  - [ ] Headings hierarchy clear
  - [ ] Body text readable
  - [ ] Links distinguishable
  - [ ] Proper line height

### Functional Testing

- [ ] **Navigation**
  - [ ] Home → Blog works
  - [ ] Blog → Post detail works
  - [ ] Post → Category works
  - [ ] Category → Blog works
  - [ ] Back buttons work

- [ ] **Links**
  - [ ] All internal links work
  - [ ] Category badges clickable
  - [ ] Author names (if linked)

- [ ] **Data Display**
  - [ ] Post titles correct
  - [ ] Dates formatted properly
  - [ ] Excerpts truncated well
  - [ ] Author info accurate

### Error Handling

- [ ] **Network Errors**
  - [ ] Stop Strapi mid-session
  - [ ] Refresh page
  - [ ] Error state shown
  - [ ] "Try Again" button works

- [ ] **Empty States**
  - [ ] No posts → empty state
  - [ ] No category posts → empty message
  - [ ] Clear messaging

- [ ] **404 Handling**
  - [ ] Invalid post slug → error
  - [ ] Invalid category → error
  - [ ] Doesn't crash app

---

## 🧰 Testing Tools

### Browser DevTools

1. **Console:**
   - Check for errors
   - Look for Strapi API logs

2. **Network:**
   - See API calls to Strapi
   - Check image loading
   - Verify no 404s

3. **Elements:**
   - Inspect styling
   - Check responsive breakpoints

### TypeScript Check

```bash
npm run check
```

Expected: `0 errors, 0 warnings`

### Build Test

```bash
npm run build
```

Expected: Successful build, no errors

---

## 🐛 Common Issues & Solutions

### Issue: "No posts showing"

**Check:**
1. Is Strapi running?
   ```bash
   curl http://localhost:1337/api/posts
   ```

2. Are posts published?
   - Strapi → Content Manager → Posts
   - Check "Published" column

3. Are permissions enabled?
   - Settings → Roles → Public
   - Posts: find ✅, findOne ✅

**Solution:**
- Ensure posts are **Published** not Draft
- Enable Public permissions

---

### Issue: "Images not loading"

**Check:**
1. Image URLs in browser console
2. STRAPI_URL in .env

**Solution:**
- Verify STRAPI_URL=http://localhost:1337
- No trailing slash
- Check Strapi uploads folder has images

---

### Issue: "Build fails"

**Error:** "Cannot read property 'attributes' of undefined"

**Solution:**
- Ensure Strapi is running during build
- Check all content types have data
- Try: `npm run build` with Strapi running

---

### Issue: "TypeScript errors"

**Check:**
```bash
npm run check
```

**Solution:**
- Fix reported type errors
- Check imports are correct
- Verify types match Strapi response

---

## 📊 Test Data Requirements

For complete testing, create in Strapi:

### Authors (minimum 1)
```
- Name: John Doe
- Email: john@example.com
- Avatar: Upload any image
- Bio: Short bio text
```

### Categories (minimum 2)
```
1. Technology
   - Slug: technology
   - Description: Tech articles

2. Lifestyle
   - Slug: lifestyle
   - Description: Life tips
```

### Posts (minimum 3)
```
1. Getting Started with Astro
   - Slug: getting-started-with-astro
   - Content: (rich text)
   - Excerpt: Quick intro
   - Category: Technology
   - Author: John Doe
   - Cover Image: Upload
   - Published: ✅

2. TypeScript Best Practices
   - Slug: typescript-best-practices
   - Content: (rich text)
   - Category: Technology
   - Author: John Doe
   - Published: ✅

3. Work-Life Balance Tips
   - Slug: work-life-balance
   - Content: (rich text)
   - Category: Lifestyle
   - Author: John Doe
   - Published: ✅
```

---

## ✅ Test Results Template

Use this to track your testing:

```markdown
## Test Run: [Date]

### Environment
- Node version: ___
- Strapi version: ___
- Astro version: ___

### Scenario 1: With Strapi
- [ ] Home page: ___
- [ ] Blog list: ___
- [ ] Blog detail: ___
- [ ] Category: ___

### Scenario 2: Without Strapi
- [ ] Home page: ___
- [ ] Blog list: ___
- [ ] Error handling: ___

### Scenario 3: Build
- [ ] Build succeeds: ___
- [ ] Preview works: ___
- [ ] Static pages load: ___

### Issues Found
1. ___
2. ___

### Notes
___
```

---

## 🎯 Success Criteria

All tests pass when:

✅ Pages load without errors
✅ Data displays correctly from Strapi
✅ Empty states work gracefully
✅ Error states handle failures
✅ Responsive design looks good
✅ Navigation works smoothly
✅ Build process completes
✅ TypeScript check passes
✅ No console errors

**Ready for production when all ✅!**
