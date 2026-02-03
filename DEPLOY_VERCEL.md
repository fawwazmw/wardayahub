# Deployment Guide - Astro to Vercel

## 🚀 Deploy Astro Frontend to Vercel

### Prerequisites

- ✅ GitHub account
- ✅ Vercel account (free tier is fine)
- ✅ Astro project in GitHub repository
- ✅ Strapi backend deployed (or will be deployed)

---

## Step 1: Prepare Your Repository

### Push to GitHub

If not already done:

```bash
cd /home/fawwazmw/Documents/wardayadev/wardayahub

# Initialize git (if needed)
git init
git add .
git commit -m "Initial commit - WardayaHub Astro frontend"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/wardayahub.git
git branch -M main
git push -u origin main
```

### Project Structure Check

Ensure you have:
```
wardayahub/
├── package.json          ✅
├── astro.config.mjs      ✅
├── tsconfig.json         ✅
├── src/                  ✅
└── public/               ✅
```

---

## Step 2: Sign Up for Vercel

1. **Go to:** https://vercel.com
2. **Click:** "Sign Up"
3. **Choose:** "Continue with GitHub"
4. **Authorize:** Vercel to access your GitHub

---

## Step 3: Import Project

### From Vercel Dashboard

1. **Click:** "Add New..." → "Project"
2. **Select:** Your GitHub repository (`wardayahub`)
3. **Click:** "Import"

### Configure Project

**Framework Preset:** Astro (auto-detected)

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Root Directory:** `./` (leave as default)

---

## Step 4: Configure Environment Variables

### In Vercel Dashboard

Click **"Environment Variables"** section:

#### Required Variables

| Variable | Value | Notes |
|----------|-------|-------|
| `PUBLIC_SITE_URL` | `https://your-project.vercel.app` | Your Vercel URL |
| `PUBLIC_SITE_NAME` | `WardayaHub` | Site name |
| `PUBLIC_SITE_DESCRIPTION` | `Headless CMS Blog Platform` | Description |
| `STRAPI_URL` | `https://your-strapi.railway.app` | Strapi production URL |
| `STRAPI_API_TOKEN` | `your_token_here` | From Strapi (optional) |

**How to add:**
1. Enter variable name
2. Enter value
3. Select environments: Production, Preview, Development
4. Click "Add"

#### Get Your Vercel URL

After first deployment, Vercel assigns a URL like:
```
https://wardayahub.vercel.app
or
https://wardayahub-abc123.vercel.app
```

Update `PUBLIC_SITE_URL` with this value.

---

## Step 5: Deploy

1. **Click:** "Deploy"
2. **Wait:** 1-3 minutes for build
3. **Result:** Live site at `https://your-project.vercel.app`

### Deployment Output

```
✓ Building for production...
✓ Static site generated
✓ Deployment ready
```

---

## Step 6: Configure Custom Domain (Optional)

### Add Custom Domain

1. **Go to:** Project Settings → Domains
2. **Enter:** your-domain.com
3. **Follow:** DNS configuration steps

**Update DNS Records:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME  
Name: www
Value: cname.vercel-dns.com
```

**Wait:** 24-48 hours for DNS propagation

### Update Environment Variables

After domain is active:
```env
PUBLIC_SITE_URL=https://yourdomain.com
```

Redeploy to apply changes.

---

## Step 7: Enable Auto-Deploy

### Automatic Deployments

Vercel auto-deploys by default:
- ✅ **Production:** Every push to `main` branch
- ✅ **Preview:** Every pull request
- ✅ **Development:** Branch deployments

### Configure Branch Settings

**Project Settings → Git:**

**Production Branch:** `main`
**Automatically Deploy:** ✅ Enabled

---

## Step 8: Update Astro Config

### Update Site URL

**File:** `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://your-project.vercel.app', // Update this
  // ... rest of config
});
```

**Commit and push:**
```bash
git add astro.config.mjs
git commit -m "Update production URL"
git push
```

Vercel will auto-deploy!

---

## Step 9: Update Sitemap and Robots

### Update Robots.txt

**File:** `public/robots.txt`

```txt
User-agent: *
Allow: /

Sitemap: https://your-project.vercel.app/sitemap-index.xml
```

### Commit Changes

```bash
git add public/robots.txt
git commit -m "Update sitemap URL for production"
git push
```

---

## 🔧 Vercel Configuration File (Optional)

Create `vercel.json` in project root for advanced settings:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/sitemap.xml",
      "destination": "/sitemap-index.xml"
    }
  ]
}
```

---

## 📊 Deployment Workflow

### Typical Development Flow

1. **Make changes locally**
   ```bash
   npm run dev  # Test locally
   ```

2. **Commit and push**
   ```bash
   git add .
   git commit -m "Add new feature"
   git push
   ```

3. **Vercel auto-deploys**
   - Build starts automatically
   - Preview URL generated
   - Goes live in 1-3 minutes

4. **Check deployment**
   - Visit your Vercel dashboard
   - Check build logs
   - Test live site

---

## 🔍 Vercel Dashboard Features

### Deployments Tab
- See all deployments
- View build logs
- Rollback if needed
- Check deployment status

### Analytics Tab
- Page views
- Top pages
- Visitor locations
- Performance metrics

### Logs Tab
- Real-time logs
- Error tracking
- Function logs
- Build output

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
1. Build succeeds locally: `npm run build`
2. All dependencies in `package.json`
3. No TypeScript errors: `npm run check`
4. Environment variables set correctly

**Common Issues:**
```bash
# Missing dependencies
npm install

# TypeScript errors
npm run check

# Build locally first
npm run build
```

### Environment Variables Not Working

**Check:**
1. Variable names match exactly
2. Values don't have quotes in Vercel UI
3. Selected correct environments
4. Redeployed after adding variables

### Sitemap Not Generated

**Check:**
1. `@astrojs/sitemap` installed
2. `site` configured in `astro.config.mjs`
3. Build completed successfully
4. Visit `/sitemap-index.xml`

### Images Not Loading

**If from Strapi:**
1. Check `STRAPI_URL` is correct
2. Ensure HTTPS (not HTTP)
3. Verify CORS settings in Strapi

---

## ✅ Post-Deployment Checklist

### Verify Everything Works

- [ ] Site loads at Vercel URL
- [ ] All pages accessible
- [ ] Images load correctly
- [ ] API connection to Strapi works
- [ ] Navigation works
- [ ] Forms work (if any)
- [ ] SEO meta tags present
- [ ] Sitemap accessible
- [ ] Robots.txt accessible

### Test Performance

- [ ] Run PageSpeed Insights
- [ ] Check Core Web Vitals
- [ ] Test on mobile devices
- [ ] Verify load time < 3s

### SEO Setup

- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Verify ownership in Search Console
- [ ] Test social sharing previews

---

## 🎯 Advanced: Preview Deployments

### For Pull Requests

1. Create a branch
   ```bash
   git checkout -b feature/new-feature
   ```

2. Make changes and push
   ```bash
   git add .
   git commit -m "Add feature"
   git push origin feature/new-feature
   ```

3. Create Pull Request on GitHub

4. Vercel creates preview deployment
   - Comment on PR with preview URL
   - Test before merging

---

## 🔐 Security Headers

Add to `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=63072000; includeSubDomains; preload"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    }
  ]
}
```

---

## 📈 Monitoring

### Vercel Analytics (Free)

**Enable in:**
- Project Settings → Analytics
- Toggle "Enable Analytics"

**Metrics:**
- Page views
- Unique visitors
- Top pages
- Geography

### Real User Monitoring

**Add to layout:**
```html
<script>
  // Vercel Analytics
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

---

## 🎓 Pro Tips

1. **Use Preview Deployments**
   - Test before merging to main
   - Share with team/clients

2. **Environment Variables**
   - Never commit secrets
   - Use different values per environment

3. **Caching**
   - Vercel handles caching automatically
   - Edge network globally

4. **Rollbacks**
   - Easy one-click rollback
   - Keep last 100 deployments

5. **Build Time**
   - Typical: 1-3 minutes
   - Optimized for Astro

---

## 🔗 Useful Links

**Vercel:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Astro Guide: https://vercel.com/guides/deploying-astro-with-vercel

**Your URLs:**
- Production: https://your-project.vercel.app
- Preview: Auto-generated per PR
- Analytics: Vercel dashboard

---

## ✅ Summary

**Deployment Steps:**
1. ✅ Push code to GitHub
2. ✅ Import project on Vercel
3. ✅ Configure environment variables
4. ✅ Deploy (automatic)
5. ✅ Verify site works
6. ✅ (Optional) Add custom domain

**Auto-Deploy:**
- ✅ Enabled by default
- ✅ Push to main = deploy to production
- ✅ PRs get preview URLs

**Your Astro site is now live! 🚀**

---

**Next:** Deploy Strapi to Railway (see `DEPLOY_STRAPI_RAILWAY.md`)
