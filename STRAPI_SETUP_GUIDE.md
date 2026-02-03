# Strapi CMS Setup Guide - WardayaHub

## Step 1: Create Strapi Project

Since automated installation has interactive prompts, here's the **manual step-by-step approach**:

### Option A: Using npx (Recommended)
```bash
# Navigate to parent directory
cd /home/fawwazmw/Documents/wardayadev

# Create Strapi project (will prompt for configuration)
npx create-strapi-app@latest wardayahub-cms

# When prompted:
# - Choose "Quickstart (recommended)"
# - Skip cloud login
# - Select SQLite as database (default)
# - Wait for installation to complete
```

### Option B: Manual Installation
If npx doesn't work, follow these steps:

```bash
# 1. Create project directory
mkdir wardayahub-cms && cd wardayahub-cms

# 2. Initialize npm project
npm init -y

# 3. Install Strapi
npm install @strapi/strapi

# 4. Create basic Strapi structure
npx strapi new . --quickstart
```

---

## Step 2: Start Strapi for First Time

```bash
cd /home/fawwazmw/Documents/wardayadev/wardayahub-cms
npm run develop
```

This will:
- Build the admin panel
- Start Strapi on http://localhost:1337
- Open admin panel at http://localhost:1337/admin

---

## Step 3: Create Admin User

When the admin panel opens in your browser:
1. Fill in admin user details:
   - **Email**: your-email@example.com
   - **Password**: (strong password)
   - **Username**: admin
2. Click "Let's start"

---

## Step 4: Create Content Types

### 4.1 Create Author Content Type

1. Go to **Content-Type Builder** (left sidebar)
2. Click **"Create new collection type"**
3. Enter display name: `Author`
4. Click **Continue**

**Add these fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| name | Text | Required, Short text |
| email | Email | - |
| avatar | Media | Single media |
| bio | Text | Long text |

5. Click **Save** and wait for server restart

---

### 4.2 Create Category Content Type

1. Click **"Create new collection type"**
2. Enter display name: `Category`
3. Click **Continue**

**Add these fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| name | Text | Required, Short text |
| slug | UID | Attached to "name" |
| description | Text | Long text |

4. Click **Save** and wait for server restart

---

### 4.3 Create Post Content Type

1. Click **"Create new collection type"**
2. Enter display name: `Post`
3. Click **Continue**

**Add these fields:**

| Field Name | Type | Settings |
|------------|------|----------|
| title | Text | Required, Short text |
| slug | UID | Attached to "title" |
| content | Rich Text | Required |
| excerpt | Text | Long text |
| coverImage | Media | Single media |
| publishedAt | DateTime | - |

**Add Relations:**

5. Click **"Add another field"** → **Relation**
6. Configure **Author** relation:
   - Post **has one** Author
   - Author **has many** Posts
   - Click **Finish**

7. Click **"Add another field"** → **Relation**
8. Configure **Category** relation:
   - Post **has one** Category
   - Category **has many** Posts
   - Click **Finish**

9. Click **Save** and wait for server restart

---

## Step 5: Enable REST API Permissions

### 5.1 Public Access for Reading

1. Go to **Settings** (left sidebar)
2. Under **USERS & PERMISSIONS PLUGIN**, click **Roles**
3. Click on **Public** role
4. Find each content type (Author, Category, Post) and check:
   - ✅ **find** (get all)
   - ✅ **findOne** (get single)
5. Click **Save** (top right)

### 5.2 Optional: Enable Authenticated Access

For **Authenticated** role:
1. Click on **Authenticated** role
2. Enable same permissions as Public
3. Additionally enable:
   - ✅ **create**
   - ✅ **update**
   - ✅ **delete**
4. Click **Save**

---

## Step 6: Create Sample Data

### Create Sample Authors
1. Go to **Content Manager** (left sidebar)
2. Click **Author** → **Create new entry**
3. Fill in:
   - **Name**: John Doe
   - **Email**: john@example.com
   - **Bio**: Senior content writer
4. Click **Save** and **Publish**

### Create Sample Categories
1. Click **Category** → **Create new entry**
2. Fill in:
   - **Name**: Technology
   - **Slug**: technology (auto-generated)
   - **Description**: Tech news and tutorials
3. Click **Save** and **Publish**

Repeat for: "Lifestyle", "Business"

### Create Sample Posts
1. Click **Post** → **Create new entry**
2. Fill in:
   - **Title**: Getting Started with Astro
   - **Slug**: getting-started-with-astro
   - **Content**: (Write some content)
   - **Excerpt**: Quick introduction to Astro
   - **Author**: Select John Doe
   - **Category**: Select Technology
   - **Published At**: (select date/time)
3. Click **Save** and **Publish**

---

## Step 7: Test API Endpoints

### Open in browser or use curl:

```bash
# Get all posts
curl http://localhost:1337/api/posts?populate=*

# Get all categories
curl http://localhost:1337/api/categories

# Get all authors
curl http://localhost:1337/api/authors

# Get single post with relations
curl http://localhost:1337/api/posts/1?populate=author,category
```

---

## Step 8: Generate API Token (Optional, for Astro Integration)

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Fill in:
   - **Name**: Astro Frontend
   - **Token type**: Read-only
   - **Token duration**: Unlimited
4. Select permissions:
   - Post: find, findOne
   - Category: find, findOne
   - Author: find, findOne
5. Click **Save**
6. **Copy the token** (you'll need it for `.env` file)

---

## Step 9: Update Astro Environment Variables

In your Astro project (`wardayahub/.env`):

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_generated_token_here
PUBLIC_SITE_URL=https://wardayahub.vercel.app
PUBLIC_SITE_NAME=WardayaHub
PUBLIC_SITE_DESCRIPTION=Headless CMS Blog Platform
```

---

## Useful Commands

```bash
# Start Strapi in development mode
npm run develop

# Build admin panel
npm run build

# Start in production mode
npm start

# Check Strapi version
npx strapi version
```

---

## Project Structure (After Setup)

```
wardayahub-cms/
├── .tmp/              # Temporary files
├── config/            # Configuration files
│   └── database.js    # Database config
├── database/          # SQLite database
├── node_modules/
├── public/            # Public assets
├── src/
│   ├── admin/         # Admin customization
│   ├── api/           # API routes
│   │   ├── author/
│   │   ├── category/
│   │   └── post/
│   └── index.js
├── .env               # Environment variables
├── package.json
└── README.md
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 1337
lsof -ti:1337 | xargs kill -9
```

### Database Issues
```bash
# Delete and recreate database
rm -rf .tmp database
npm run develop
```

### Permission Issues
- Make sure you saved permissions in Settings → Roles → Public
- Check if content is published (not draft)

---

## Next Steps

Once Strapi is running:
1. ✅ Content types created
2. ✅ API permissions enabled
3. ✅ Sample data added
4. ✅ API token generated

**You can now integrate with Astro frontend!**

---

## Need Help?

**Common Issues:**
- **Can't access admin panel**: Make sure `npm run develop` is running
- **API returns 403**: Check permissions in Settings → Roles → Public
- **No data returned**: Make sure entries are published (not drafts)
- **Relations not showing**: Use `?populate=*` query parameter

**Official Docs:**
- https://docs.strapi.io/
- https://strapi.io/blog/how-to-create-a-blog-with-strapi
