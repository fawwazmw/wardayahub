# Deployment Guide - Strapi to Railway

## 🚀 Deploy Strapi Backend to Railway

### Prerequisites

- ✅ GitHub account
- ✅ Railway account (free tier: $5 credit/month)
- ✅ Strapi project ready
- ✅ PostgreSQL database (Railway provides)

---

## Step 1: Prepare Strapi for Production

### Update Database Configuration

**File:** `config/database.js` (in wardayahub-cms)

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
    debug: false,
  },
});
```

### Install PostgreSQL Client

```bash
cd /home/fawwazmw/Documents/wardayadev/wardayahub-cms
npm install pg
```

### Update package.json

**Add production script:**

```json
{
  "scripts": {
    "develop": "strapi develop",
    "start": "strapi start",
    "build": "strapi build",
    "strapi": "strapi"
  }
}
```

### Create .gitignore

```bash
# Create .gitignore if not exists
cat > .gitignore << 'EOF'
############################
# OS X
############################
.DS_Store
.AppleDouble
.LSOverride
Icon
.Spotlight-V100
.Trashes
._*

############################
# Linux
############################
*~

############################
# Windows
############################
Thumbs.db
ehthumbs.db
Desktop.ini
$RECYCLE.BIN/
*.cab
*.msi
*.msm
*.msp

############################
# Packages
############################
*.7z
*.csv
*.dat
*.dmg
*.gz
*.iso
*.jar
*.rar
*.tar
*.zip
*.com
*.class
*.dll
*.exe
*.o
*.seed
*.so
*.swo
*.swp
*.swn
*.swm
*.out
*.pid

############################
# Logs and databases
############################
.tmp
*.log
*.sql
*.sqlite
*.sqlite3

############################
# Misc.
############################
*#
ssl
.idea
nbproject

############################
# Node.js
############################
lib-cov
lcov.info
pids
logs
results
node_modules
.node_history

############################
# Tests
############################
coverage

############################
# Strapi
############################
.env
license.txt
exports
.cache
dist
build
.strapi-updater.json
.strapi

############################
# Database
############################
.tmp/
.env
database/
EOF
```

---

## Step 2: Push Strapi to GitHub

### Initialize Git Repository

```bash
cd /home/fawwazmw/Documents/wardayadev/wardayahub-cms

# Initialize git
git init
git add .
git commit -m "Initial commit - WardayaHub Strapi CMS"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/wardayahub-cms.git
git branch -M main
git push -u origin main
```

---

## Step 3: Sign Up for Railway

1. **Go to:** https://railway.app
2. **Click:** "Login"
3. **Choose:** "Login with GitHub"
4. **Authorize:** Railway to access GitHub

**Free Tier:**
- $5 in credits per month
- Enough for small projects
- PostgreSQL database included

---

## Step 4: Create New Project

### From Railway Dashboard

1. **Click:** "New Project"
2. **Select:** "Deploy from GitHub repo"
3. **Choose:** Your Strapi repository (`wardayahub-cms`)
4. **Click:** "Deploy Now"

Railway will:
- Clone your repository
- Detect Node.js app
- Start deployment

---

## Step 5: Add PostgreSQL Database

### Add Database Service

1. **In your project,** click "New"
2. **Select:** "Database"
3. **Choose:** "Add PostgreSQL"

Railway will:
- Create PostgreSQL instance
- Generate connection URL
- Make available as environment variables

### Database Variables (Auto-Generated)

Railway automatically creates:
- `DATABASE_URL` - Full connection string
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGUSER` - Database user
- `PGPASSWORD` - Database password
- `PGDATABASE` - Database name

---

## Step 6: Configure Environment Variables

### In Railway Dashboard

**Click on Strapi service** → **Variables** tab

#### Required Variables

Add these variables:

```env
# App Settings
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# App Keys (generate secure random strings)
APP_KEYS=toBeModified1,toBeModified2,toBeModified3,toBeModified4
API_TOKEN_SALT=toBeModified
ADMIN_JWT_SECRET=toBeModified
TRANSFER_TOKEN_SALT=toBeModified
JWT_SECRET=toBeModified

# Database (use Railway's generated values)
DATABASE_CLIENT=postgres
DATABASE_HOST=${{PGHOST}}
DATABASE_PORT=${{PGPORT}}
DATABASE_NAME=${{PGDATABASE}}
DATABASE_USERNAME=${{PGUSER}}
DATABASE_PASSWORD=${{PGPASSWORD}}
DATABASE_SSL=true

# CORS
CLIENT_URL=https://your-vercel-app.vercel.app
```

#### Generate Secure Keys

**Run locally to generate:**

```bash
# Generate random strings
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Run 5 times and use for:
- APP_KEYS (4 values, comma-separated)
- API_TOKEN_SALT
- ADMIN_JWT_SECRET
- TRANSFER_TOKEN_SALT
- JWT_SECRET

**Example:**
```env
APP_KEYS=abc123xyz,def456uvw,ghi789rst,jkl012mno
API_TOKEN_SALT=pqr345stu
ADMIN_JWT_SECRET=vwx678yz1
TRANSFER_TOKEN_SALT=bcd901efg
JWT_SECRET=hij234klm
```

---

## Step 7: Configure CORS

### Update Strapi CORS Settings

**File:** `config/middlewares.js`

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'dl.airtable.com',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: [
        'http://localhost:4321',
        'http://localhost:3000',
        process.env.CLIENT_URL,
        'https://*.vercel.app',
      ],
      credentials: true,
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

**Commit and push:**
```bash
git add config/middlewares.js
git commit -m "Configure CORS for production"
git push
```

Railway will auto-deploy!

---

## Step 8: Deploy and Verify

### Check Deployment

1. **In Railway dashboard**, watch deployment logs
2. **Wait for:** "Build successful"
3. **Click:** "View Logs" to monitor

### Get Your Railway URL

Railway generates a URL like:
```
https://your-project.up.railway.app
```

**Find it:**
- Settings tab → Domains
- Or check deployment logs

### Test Strapi Admin

Visit:
```
https://your-project.up.railway.app/admin
```

**Create admin user** (first time):
1. Fill in admin details
2. Email, password, name
3. Click "Let's start"

---

## Step 9: Configure Railway Settings

### Custom Domain (Optional)

**Settings → Domains:**
1. Click "Generate Domain"
2. Or add custom domain

**Update DNS (if custom domain):**
```
Type: CNAME
Name: api (or your subdomain)
Value: your-project.up.railway.app
```

### Build Settings

**Settings → Deploy:**
- Build Command: `npm run build`
- Start Command: `npm run start`
- Root Directory: `/`

### Restart Policy

**Settings → Deployment:**
- Restart on failure: ✅ Enabled
- Health check: ✅ Enabled

---

## Step 10: Enable Auto-Deploy

### GitHub Integration

Railway auto-deploys by default:
- ✅ Every push to `main` branch
- ✅ Automatic builds
- ✅ Zero-downtime deployments

**Configure:**
- Settings → Source → Branch: `main`
- Auto-deploy: ✅ Enabled

---

## Step 11: Update Astro Environment

### Update Vercel Variables

In Vercel project:

**Environment Variables:**
```env
STRAPI_URL=https://your-project.up.railway.app
```

**Don't include** `/api` - Astro handles it!

**Redeploy Astro** to apply changes.

---

## 🔧 Railway Configuration File (Optional)

Create `railway.json` in project root:

```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build"
  },
  "deploy": {
    "startCommand": "npm run start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 📊 Database Management

### Access Database

**Railway Dashboard:**
1. Click PostgreSQL service
2. Go to "Data" tab
3. Use built-in query editor

### Connect with External Tool

**Get connection string:**
```
Settings → Connect → Connection String
```

**Use with tools:**
- TablePlus
- pgAdmin
- Postico
- DBeaver

---

## 🔍 Monitoring and Logs

### View Logs

**Railway Dashboard:**
- Click Strapi service
- "Logs" tab shows real-time logs

**Filter logs:**
```
Error logs only
Build logs
Runtime logs
```

### Metrics

**Metrics tab shows:**
- CPU usage
- Memory usage
- Network I/O
- Request count

---

## 🐛 Troubleshooting

### Build Fails

**Check:**
1. `package.json` has all dependencies
2. `build` script exists
3. Node version compatible

**View logs:**
```
Railway → Deployment → Logs
```

### Database Connection Error

**Check:**
1. PostgreSQL service running
2. Database variables set correctly
3. DATABASE_SSL=true

**Test connection:**
```javascript
// In Strapi
console.log('DB Config:', strapi.config.database);
```

### Admin Panel Won't Load

**Check:**
1. Deployment successful
2. URL correct (ends with `/admin`)
3. CORS configured
4. Build completed

### CORS Errors

**Update `middlewares.js`:**
```javascript
origin: [
  process.env.CLIENT_URL,
  'https://*.vercel.app', // Allow all Vercel preview URLs
],
```

### Out of Memory

**Increase Railway plan:**
- Free tier: 512MB RAM
- Hobby: 8GB RAM
- Settings → Resources

---

## ✅ Post-Deployment Checklist

### Verify Everything Works

- [ ] Strapi admin accessible
- [ ] Can login to admin panel
- [ ] Database connection works
- [ ] API endpoints respond
- [ ] Content types visible
- [ ] Can create/edit content
- [ ] CORS allows Astro requests

### Test API

```bash
# Test posts endpoint
curl https://your-railway-url.up.railway.app/api/posts

# Should return posts (if published)
```

### Security

- [ ] Change default admin password
- [ ] Set strong APP_KEYS
- [ ] Enable API rate limiting
- [ ] Configure public permissions correctly

### Performance

- [ ] Check response times
- [ ] Monitor memory usage
- [ ] Set up health checks

---

## 🔐 Security Best Practices

### API Tokens

**Create read-only token for Astro:**

1. Settings → API Tokens
2. Create new token
3. Name: "Astro Frontend"
4. Type: Read-only
5. Copy token

**Add to Vercel:**
```env
STRAPI_API_TOKEN=your_token_here
```

### Rate Limiting

**Install plugin:**
```bash
npm install @strapi/plugin-users-permissions
```

**Configure in Strapi admin:**
- Settings → Roles → Public
- Set rate limits per endpoint

### HTTPS Only

Railway provides HTTPS by default ✅

---

## 💰 Cost Estimation

### Railway Free Tier

**Included:**
- $5 credit/month
- ~500 hours runtime
- PostgreSQL database
- 100GB bandwidth

**Typical usage:**
- Strapi backend: ~$3-4/month
- PostgreSQL: Included
- Total: ~$3-4/month

### If You Exceed Free Tier

**Hobby Plan:** $5/month
- Removes credit limit
- Higher resource limits

---

## 🎯 Advanced: Multiple Environments

### Production + Staging

**Create separate Railway projects:**

1. **Production:**
   - Branch: `main`
   - URL: `api.yourdomain.com`

2. **Staging:**
   - Branch: `staging`
   - URL: `staging-api.yourdomain.com`

**Environment variables differ per project**

---

## 📈 Scaling

### Vertical Scaling

**Increase resources:**
- Settings → Resources
- Adjust RAM/CPU
- Costs increase proportionally

### Horizontal Scaling

Railway doesn't support multiple instances on free tier.

**Alternatives:**
- Use Railway Pro
- Or deploy to different service (AWS, GCP)

---

## 🔗 Useful Links

**Railway:**
- Dashboard: https://railway.app/dashboard
- Docs: https://docs.railway.app/
- Status: https://status.railway.app/

**Your URLs:**
- Production: https://your-project.up.railway.app
- Admin: https://your-project.up.railway.app/admin
- API: https://your-project.up.railway.app/api

---

## ✅ Summary

**Deployment Steps:**
1. ✅ Update database config for PostgreSQL
2. ✅ Push Strapi to GitHub
3. ✅ Deploy to Railway
4. ✅ Add PostgreSQL database
5. ✅ Configure environment variables
6. ✅ Set up CORS
7. ✅ Create admin user
8. ✅ Test API endpoints

**Auto-Deploy:**
- ✅ Push to main = auto-deploy
- ✅ Zero-downtime deployments
- ✅ Automatic builds

**Your Strapi backend is now live! 🚀**

---

**Next:** Update Astro to use production Strapi URL
