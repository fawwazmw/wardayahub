# Strapi Quick Setup - Step by Step

## 🎯 Quick Start (5 Minutes)

### Step 1: Create Strapi Project (2 min)
```bash
cd /home/fawwazmw/Documents/wardayadev
npx create-strapi-app@latest wardayahub-cms
```
**Prompts:**
- ✅ Choose "Quickstart"
- ✅ Skip cloud login
- ⏳ Wait for installation

### Step 2: Start Strapi (1 min)
```bash
cd wardayahub-cms
npm run develop
```
**Opens:** http://localhost:1337/admin

### Step 3: Create Admin User (30 sec)
Fill the form:
- Email: your-email@example.com
- Password: (strong password)
- Click "Let's start"

---

## 📝 Content Types Setup (10 Minutes)

### Author (2 min)
**Content-Type Builder** → **Create collection type** → Name: `Author`

| Field | Type | Required |
|-------|------|----------|
| name | Text | ✅ |
| email | Email | - |
| avatar | Media (Single) | - |
| bio | Text (Long) | - |

**Save** → Wait for restart

---

### Category (2 min)
**Create collection type** → Name: `Category`

| Field | Type | Required |
|-------|------|----------|
| name | Text | ✅ |
| slug | UID → name | ✅ |
| description | Text (Long) | - |

**Save** → Wait for restart

---

### Post (3 min)
**Create collection type** → Name: `Post`

| Field | Type | Required |
|-------|------|----------|
| title | Text | ✅ |
| slug | UID → title | ✅ |
| content | Rich Text | ✅ |
| excerpt | Text (Long) | - |
| coverImage | Media (Single) | - |
| publishedAt | DateTime | - |

**Add Relations:**
1. **Relation** → Post **has one** Author
2. **Relation** → Post **has one** Category

**Save** → Wait for restart

---

## 🔓 Enable API Access (2 Minutes)

### Settings → Roles → Public
For each: **Author**, **Category**, **Post**

Check these boxes:
- ✅ find
- ✅ findOne

**Save** (top right)

---

## ✨ Create Sample Data (5 Minutes)

### Content Manager → Author → Create new entry
- Name: John Doe
- Email: john@example.com
- Bio: Senior writer
- **Save** + **Publish**

### Content Manager → Category → Create new entry
- Name: Technology
- **Save** + **Publish**

Repeat for: Lifestyle, Business

### Content Manager → Post → Create new entry
- Title: Getting Started with Astro
- Content: (write something)
- Excerpt: Quick intro to Astro
- Author: John Doe
- Category: Technology
- **Save** + **Publish**

---

## 🧪 Test API (1 Minute)

Open browser:
```
http://localhost:1337/api/posts?populate=*
http://localhost:1337/api/categories
http://localhost:1337/api/authors
```

Should see JSON data ✅

---

## 🔑 Generate API Token (Optional)

**Settings** → **API Tokens** → **Create**
- Name: Astro Frontend
- Type: Read-only
- Duration: Unlimited
- Permissions: find, findOne (all types)

**Copy the token!**

Add to `wardayahub/.env`:
```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_token_here
```

---

## ✅ Checklist

- [ ] Strapi installed and running
- [ ] Admin user created
- [ ] Author content type created
- [ ] Category content type created
- [ ] Post content type created
- [ ] Public API permissions enabled
- [ ] Sample data added
- [ ] API tested in browser
- [ ] API token generated (optional)

---

## 🚀 Next: Integrate with Astro Frontend

See `STRAPI_SETUP_GUIDE.md` for detailed instructions.

---

## ⚡ Quick Commands

```bash
# Start dev server
npm run develop

# Build admin
npm run build

# Production mode
npm start

# Check version
npx strapi version
```

---

## 🆘 Troubleshooting

**Can't create project?**
→ Check Node.js version (need 18+)

**API returns empty?**
→ Make sure entries are Published (not Draft)

**403 Forbidden?**
→ Check Settings → Roles → Public permissions

**Port in use?**
→ `lsof -ti:1337 | xargs kill -9`
