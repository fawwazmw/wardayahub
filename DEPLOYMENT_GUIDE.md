# Complete Deployment Guide - WardayaHub

## 🚀 Full Deployment Workflow

This guide covers deploying both Astro frontend (Vercel) and Strapi backend (Railway) with auto-deploy.

---

## 📋 Pre-Deployment Checklist

### Code Ready
- [ ] All features tested locally
- [ ] TypeScript check passes: `npm run check`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors
- [ ] Git repo clean

### Accounts Created
- [ ] GitHub account (free)
- [ ] Vercel account (free)
- [ ] Railway account (free, $5 credit/month)

### Repositories Ready
- [ ] Astro project in GitHub
- [ ] Strapi project in GitHub (separate repo)

---

## 🎯 Deployment Order

**Deploy in this order:**

1. ✅ **First:** Deploy Strapi to Railway (backend)
2. ✅ **Second:** Deploy Astro to Vercel (frontend)

**Why this order?**
- Astro needs Strapi URL during build
- Frontend pulls data from backend

---

## Part 1: Deploy Strapi Backend to Railway

### Step 1: Prepare Strapi

**Navigate to Strapi project:**
```bash
cd /home/fawwazmw/Documents/wardayadev/wardayahub-cms
```

**Install PostgreSQL:**
```bash
npm install pg
```

**Update database config:**

**File:** `config/database.js`
```javascript
module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', '127.0.0.1'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi'),
      user: env('DATABASE_USERNAME', 'strapi'),
      password: env('DATABASE_PASSWORD', 'strapi'),
      ssl: env.bool('DATABASE_SSL', false) && {
        rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
      },
    },
  },
});
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Prepare for Railway deployment"

# Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/wardayahub-cms.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Railway

1. **Go to:** https://railway.app
2. **Login:** with GitHub
3. **New Project:** Deploy from GitHub repo
4. **Select:** `wardayahub-cms`
5. **Add:** PostgreSQL database (New → Database → PostgreSQL)

### Step 4: Set Environment Variables

**In Railway (Strapi service → Variables):**

```env
# Generate these with:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

HOST=0.0.0.0
PORT=1337
NODE_ENV=production

APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=salt_value
ADMIN_JWT_SECRET=secret_value
TRANSFER_TOKEN_SALT=salt_value
JWT_SECRET=secret_value

DATABASE_CLIENT=postgres
DATABASE_HOST=${{PGHOST}}
DATABASE_PORT=${{PGPORT}}
DATABASE_NAME=${{PGDATABASE}}
DATABASE_USERNAME=${{PGUSER}}
DATABASE_PASSWORD=${{PGPASSWORD}}
DATABASE_SSL=true

CLIENT_URL=https://your-vercel-app.vercel.app
```

### Step 5: Get Strapi URL

**After deployment:**
- Settings → Domains
- Copy URL: `https://wardayahub-cms.up.railway.app`

### Step 6: Create Admin User

Visit: `https://your-railway-url.up.railway.app/admin`

Create first admin user.

---

## Part 2: Deploy Astro Frontend to Vercel

### Step 1: Update Astro Config

**File:** `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://wardayahub.vercel.app', // Will update after first deploy
  // ... rest
});
```

### Step 2: Push to GitHub

```bash
cd /home/fawwazmw/Documents/wardayadev/wardayahub

git add .
git commit -m "Prepare for Vercel deployment"

git remote add origin https://github.com/YOUR_USERNAME/wardayahub.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy to Vercel

1. **Go to:** https://vercel.com
2. **Login:** with GitHub
3. **New Project:** Import repository
4. **Select:** `wardayahub`
5. **Framework:** Astro (auto-detected)

### Step 4: Set Environment Variables

**In Vercel (Project Settings → Environment Variables):**

```env
PUBLIC_SITE_URL=https://wardayahub.vercel.app
PUBLIC_SITE_NAME=WardayaHub
PUBLIC_SITE_DESCRIPTION=Headless CMS Blog Platform
STRAPI_URL=https://your-railway-url.up.railway.app
STRAPI_API_TOKEN=your_token_from_strapi
```

### Step 5: Deploy

Click **Deploy** → Wait 1-3 minutes

### Step 6: Get Vercel URL

After first deploy:
- Copy URL: `https://wardayahub.vercel.app`

### Step 7: Update URLs

**Update these files:**

**1. `astro.config.mjs`:**
```javascript
site: 'https://wardayahub.vercel.app',
```

**2. `public/robots.txt`:**
```txt
Sitemap: https://wardayahub.vercel.app/sitemap-index.xml
```

**3. Vercel environment variable:**
```env
PUBLIC_SITE_URL=https://wardayahub.vercel.app
```

**Commit and push:**
```bash
git add .
git commit -m "Update production URLs"
git push
```

Vercel auto-deploys!

### Step 8: Update Railway CORS

**In Railway, update Strapi variable:**
```env
CLIENT_URL=https://wardayahub.vercel.app
```

**And update `config/middlewares.js`:**
```javascript
origin: [
  'https://wardayahub.vercel.app',
  'https://*.vercel.app', // For preview deployments
],
```

Push to trigger Railway deployment.

---

## 🔄 Auto-Deploy Setup

### Vercel Auto-Deploy

**Already enabled by default!**

**How it works:**
1. Push to `main` branch
2. Vercel detects push (GitHub webhook)
3. Builds and deploys automatically
4. Live in 1-3 minutes

**For PRs:**
- Creates preview deployment
- Comments on PR with URL
- Test before merging

### Railway Auto-Deploy

**Already enabled by default!**

**How it works:**
1. Push to `main` branch
2. Railway detects push (GitHub webhook)
3. Builds and deploys automatically
4. Zero-downtime deployment

---

## 📊 Complete Deployment Workflow

### Daily Development

```bash
# 1. Make changes locally
git checkout -b feature/new-feature

# 2. Test locally
cd wardayahub && npm run dev        # Frontend
cd wardayahub-cms && npm run develop # Backend

# 3. Commit changes
git add .
git commit -m "Add new feature"

# 4. Push and create PR
git push origin feature/new-feature
# Create PR on GitHub

# 5. Vercel creates preview URL
# Test preview deployment

# 6. Merge PR
# Auto-deploys to production
```

### Production Deployment

```bash
# For frontend
cd wardayahub
git add .
git commit -m "Update frontend"
git push origin main
# → Auto-deploys to Vercel

# For backend  
cd wardayahub-cms
git add .
git commit -m "Update backend"
git push origin main
# → Auto-deploys to Railway
```

---

## 🔐 Environment Variables Summary

### Astro (Vercel)

| Variable | Example | Where |
|----------|---------|-------|
| `PUBLIC_SITE_URL` | `https://wardayahub.vercel.app` | Vercel UI |
| `PUBLIC_SITE_NAME` | `WardayaHub` | Vercel UI |
| `PUBLIC_SITE_DESCRIPTION` | `Blog Platform` | Vercel UI |
| `STRAPI_URL` | `https://cms.railway.app` | Vercel UI |
| `STRAPI_API_TOKEN` | `abc123...` | Vercel UI |

### Strapi (Railway)

| Variable | Example | Source |
|----------|---------|--------|
| `HOST` | `0.0.0.0` | Manual |
| `PORT` | `1337` | Manual |
| `NODE_ENV` | `production` | Manual |
| `APP_KEYS` | `key1,key2,key3,key4` | Generated |
| `API_TOKEN_SALT` | `random_string` | Generated |
| `ADMIN_JWT_SECRET` | `random_string` | Generated |
| `JWT_SECRET` | `random_string` | Generated |
| `DATABASE_HOST` | Auto | Railway PostgreSQL |
| `DATABASE_PORT` | Auto | Railway PostgreSQL |
| `DATABASE_NAME` | Auto | Railway PostgreSQL |
| `DATABASE_USERNAME` | Auto | Railway PostgreSQL |
| `DATABASE_PASSWORD` | Auto | Railway PostgreSQL |
| `DATABASE_SSL` | `true` | Manual |
| `CLIENT_URL` | `https://wardayahub.vercel.app` | Manual |

---

## ✅ Post-Deployment Verification

### Strapi Backend

- [ ] Admin panel loads: `/admin`
- [ ] Can login
- [ ] Database connected
- [ ] API responds: `/api/posts`
- [ ] CORS working
- [ ] Content editable

**Test:**
```bash
curl https://your-railway-url.up.railway.app/api/posts
```

### Astro Frontend

- [ ] Site loads
- [ ] All pages work
- [ ] API data displays
- [ ] Images load
- [ ] Navigation works
- [ ] No console errors

**Test:**
```bash
curl https://your-vercel-url.vercel.app
```

### Integration

- [ ] Frontend fetches from backend
- [ ] Posts display correctly
- [ ] Categories work
- [ ] Author info shows
- [ ] Images from Strapi load

---

## 🐛 Common Issues

### "Failed to fetch posts"

**Check:**
1. Strapi is deployed and running
2. `STRAPI_URL` is correct in Vercel
3. CORS configured in Strapi
4. Posts are published (not draft)
5. Public permissions enabled

### "CORS Error"

**Fix in Strapi:**
```javascript
// config/middlewares.js
origin: [
  process.env.CLIENT_URL,
  'https://*.vercel.app',
],
credentials: true,
```

Redeploy Strapi.

### Images Not Loading

**Check:**
1. `STRAPI_URL` doesn't end with `/api`
2. Images uploaded to Strapi
3. Railway public folder accessible

### Build Fails

**Astro:**
```bash
# Test locally first
npm run check
npm run build
```

**Strapi:**
```bash
# Check dependencies
npm install
npm run build
```

---

## 📈 Monitoring

### Vercel Dashboard

**Analytics:**
- Page views
- Top pages
- Performance metrics

**Deployments:**
- View all deployments
- Check build logs
- Rollback if needed

### Railway Dashboard

**Metrics:**
- CPU usage
- Memory usage
- Database size

**Logs:**
- Real-time logs
- Error tracking
- Query logs

---

## 💰 Cost Summary

### Free Tier Limits

**Vercel (Free):**
- Unlimited projects
- 100GB bandwidth/month
- Automatic HTTPS
- Preview deployments

**Railway (Free):**
- $5 credit/month (~500 hours)
- PostgreSQL included
- 100GB bandwidth

**Total: $0-5/month** for small projects

---

## 🎯 Production Checklist

### Before Going Live

- [ ] All features tested
- [ ] TypeScript passes
- [ ] Build succeeds
- [ ] SEO configured
- [ ] Analytics set up
- [ ] Error tracking enabled
- [ ] Backups configured

### After Going Live

- [ ] Submit sitemap to Google
- [ ] Submit sitemap to Bing
- [ ] Monitor errors
- [ ] Check performance
- [ ] Test on mobile
- [ ] Share on social media

---

## 🔗 Your Live URLs

**Production:**
- Frontend: `https://wardayahub.vercel.app`
- Backend API: `https://wardayahub-cms.up.railway.app/api`
- Admin Panel: `https://wardayahub-cms.up.railway.app/admin`

**Dashboards:**
- Vercel: https://vercel.com/dashboard
- Railway: https://railway.app/dashboard

---

## 📚 Documentation References

**Detailed Guides:**
- `DEPLOY_VERCEL.md` - Complete Vercel guide
- `DEPLOY_STRAPI_RAILWAY.md` - Complete Railway guide
- `SEO_GUIDE.md` - SEO optimization
- `BLOG_INTEGRATION.md` - API integration

---

## ✅ Summary

**What You've Deployed:**

1. ✅ **Strapi Backend** on Railway
   - PostgreSQL database
   - Auto-deploy from GitHub
   - Admin panel accessible
   - API endpoints live

2. ✅ **Astro Frontend** on Vercel
   - Static site generation
   - Auto-deploy from GitHub
   - Fast global CDN
   - Preview deployments

3. ✅ **Auto-Deploy** enabled
   - Push to GitHub = deploy
   - PR previews
   - Zero-downtime

**Your full-stack blog is now live! 🎉**

---

## 🚀 Next Steps

1. **Add content** in Strapi admin
2. **Share** your site
3. **Monitor** analytics
4. **Iterate** and improve
5. **Scale** as needed

**Happy deploying! 🌟**
