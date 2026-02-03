# 🚀 Quick Deployment Checklist

## Pre-Deployment

### Local Testing
- [ ] `npm run check` passes (0 errors)
- [ ] `npm run build` succeeds
- [ ] Site works locally with `npm run dev`
- [ ] All pages load correctly
- [ ] No console errors

### Code Quality
- [ ] Git repo is clean
- [ ] All changes committed
- [ ] Pushed to GitHub
- [ ] No sensitive data in code
- [ ] `.env` files in `.gitignore`

---

## Strapi Deployment (Railway)

### Setup
- [ ] Railway account created
- [ ] GitHub repository ready
- [ ] PostgreSQL package installed: `npm install pg`
- [ ] Database config updated for PostgreSQL

### Deploy
- [ ] New project created on Railway
- [ ] GitHub repo connected
- [ ] PostgreSQL database added
- [ ] Environment variables set:
  - [ ] `HOST=0.0.0.0`
  - [ ] `PORT=1337`
  - [ ] `NODE_ENV=production`
  - [ ] `APP_KEYS` (4 random strings)
  - [ ] `API_TOKEN_SALT`
  - [ ] `ADMIN_JWT_SECRET`
  - [ ] `JWT_SECRET`
  - [ ] `TRANSFER_TOKEN_SALT`
  - [ ] Database variables (auto from Railway)
  - [ ] `DATABASE_SSL=true`
- [ ] Deployment successful
- [ ] Railway URL copied

### Verify
- [ ] Admin panel loads: `https://your-app.up.railway.app/admin`
- [ ] Created first admin user
- [ ] Can login to admin
- [ ] Database connected
- [ ] Can create content
- [ ] API responds: `/api/posts`

---

## Astro Deployment (Vercel)

### Setup
- [ ] Vercel account created
- [ ] GitHub repository ready
- [ ] URLs updated in config files

### Deploy
- [ ] New project created on Vercel
- [ ] GitHub repo imported
- [ ] Framework detected: Astro
- [ ] Environment variables set:
  - [ ] `PUBLIC_SITE_URL`
  - [ ] `PUBLIC_SITE_NAME`
  - [ ] `PUBLIC_SITE_DESCRIPTION`
  - [ ] `STRAPI_URL` (from Railway)
  - [ ] `STRAPI_API_TOKEN` (optional)
- [ ] Deployment successful
- [ ] Vercel URL copied

### Verify
- [ ] Site loads at Vercel URL
- [ ] All pages accessible
- [ ] Data loads from Strapi
- [ ] Images display
- [ ] Navigation works
- [ ] No console errors

---

## Post-Deployment

### Update URLs
- [ ] Update `astro.config.mjs` with Vercel URL
- [ ] Update `robots.txt` with Vercel URL
- [ ] Update `PUBLIC_SITE_URL` in Vercel
- [ ] Update `CLIENT_URL` in Railway
- [ ] Redeploy both services

### CORS Configuration
- [ ] Update Strapi `middlewares.js`
- [ ] Add Vercel URL to allowed origins
- [ ] Add `*.vercel.app` for previews
- [ ] Push to GitHub to redeploy

### Integration Test
- [ ] Frontend connects to backend
- [ ] Posts display on frontend
- [ ] Categories work
- [ ] Author info shows
- [ ] Images from Strapi load

---

## SEO Setup

### Search Engines
- [ ] Sitemap accessible: `/sitemap-index.xml`
- [ ] Robots.txt accessible: `/robots.txt`
- [ ] Google Search Console:
  - [ ] Site verified
  - [ ] Sitemap submitted
- [ ] Bing Webmaster Tools:
  - [ ] Site verified
  - [ ] Sitemap submitted

### Social Media
- [ ] Test Open Graph:
  - [ ] Facebook Debugger
  - [ ] Twitter Card Validator
  - [ ] LinkedIn Inspector
- [ ] Preview looks correct
- [ ] Image displays properly

### Performance
- [ ] PageSpeed Insights run
- [ ] Performance score > 90
- [ ] SEO score > 95
- [ ] Accessibility score > 95
- [ ] Core Web Vitals pass

---

## Auto-Deploy Verification

### Vercel
- [ ] Push to `main` triggers deploy
- [ ] Preview URLs on PRs
- [ ] Build notifications work
- [ ] Deployment webhook active

### Railway
- [ ] Push to `main` triggers deploy
- [ ] Zero-downtime deployment
- [ ] Health checks passing
- [ ] Logs accessible

---

## Security

### Strapi
- [ ] Admin password strong
- [ ] API tokens secure
- [ ] Public permissions correct
- [ ] CORS configured properly
- [ ] HTTPS enabled (auto)

### Astro
- [ ] No API keys in frontend code
- [ ] Environment variables secure
- [ ] Security headers configured
- [ ] HTTPS enabled (auto)

---

## Monitoring

### Setup Monitoring
- [ ] Vercel Analytics enabled
- [ ] Railway metrics reviewed
- [ ] Error tracking configured
- [ ] Uptime monitoring (optional)

### Check Regularly
- [ ] Deployment logs
- [ ] Error rates
- [ ] Response times
- [ ] Resource usage

---

## Documentation

### Update Docs
- [ ] README with live URLs
- [ ] Deployment guide complete
- [ ] Environment variables documented
- [ ] Troubleshooting guide ready

### Team Access
- [ ] Team members added to Vercel
- [ ] Team members added to Railway
- [ ] GitHub permissions set
- [ ] Access documented

---

## Final Checks

### Functionality
- [ ] All features working
- [ ] Forms submit (if any)
- [ ] Links not broken
- [ ] Mobile responsive
- [ ] Cross-browser tested

### Content
- [ ] Sample posts created
- [ ] Categories set up
- [ ] Authors configured
- [ ] Images uploaded

### Analytics
- [ ] Google Analytics (optional)
- [ ] Tracking code installed
- [ ] Goals configured
- [ ] Events tracked

---

## Launch

### Pre-Launch
- [ ] Final content review
- [ ] SEO meta tags verified
- [ ] Social sharing tested
- [ ] Performance checked

### Launch Day
- [ ] Announce on social media
- [ ] Share with network
- [ ] Monitor for issues
- [ ] Respond to feedback

### Post-Launch
- [ ] Monitor analytics
- [ ] Check error logs
- [ ] Fix any issues
- [ ] Plan next features

---

## Maintenance

### Weekly
- [ ] Check deployment logs
- [ ] Review error rates
- [ ] Monitor performance
- [ ] Update content

### Monthly
- [ ] Update dependencies
- [ ] Review analytics
- [ ] Optimize performance
- [ ] Plan improvements

---

## Emergency Rollback

### Vercel
1. Go to Deployments
2. Find last working deployment
3. Click "Promote to Production"
4. Instant rollback ✅

### Railway
1. Go to Deployments
2. Find last working deployment
3. Click "Redeploy"
4. Rollback in ~1 minute ✅

---

## 📊 Success Metrics

### Track These

**Traffic:**
- [ ] Daily visitors
- [ ] Page views
- [ ] Bounce rate

**Performance:**
- [ ] Load time < 3s
- [ ] Lighthouse scores > 90
- [ ] No errors

**Engagement:**
- [ ] Time on page
- [ ] Pages per session
- [ ] Return visitors

---

## ✅ You're Live When...

- [x] Both deployments successful
- [x] Site loads at production URL
- [x] Data flows from Strapi to Astro
- [x] SEO configured and tested
- [x] Auto-deploy working
- [x] Monitoring set up
- [x] No critical errors

## 🎉 Congratulations!

**Your site is live and ready for the world!**

**URLs:**
- Frontend: https://wardayahub.vercel.app
- Backend: https://wardayahub-cms.up.railway.app
- Admin: https://wardayahub-cms.up.railway.app/admin

**Now focus on:**
- Creating great content
- Growing your audience
- Improving based on feedback

**Happy blogging! 🚀**
