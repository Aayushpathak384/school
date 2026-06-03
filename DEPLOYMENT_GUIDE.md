# KIRAN PUBLIC SCHOOL — Deployment Guide

## Stack
- **Frontend**: Next.js 14 + Tailwind CSS → Deployed on **Vercel**
- **CMS**: Sanity Studio → Deployed on **Sanity Cloud** (free tier)
- **Database**: Sanity Cloud CDN (automatic, no setup needed)

---

## Step 1: Set Up Sanity Project

### 1.1 Create Sanity Account
1. Go to [https://sanity.io](https://sanity.io) and sign up
2. Create a **new project**: "KIRAN PUBLIC SCHOOL"
3. Choose dataset: `production`
4. Note your **Project ID** (e.g., `abc12345`)

### 1.2 Configure Sanity Studio
```bash
cd /Users/aayushraj/Desktop/school/sanity
npm install
```

Edit `sanity.cli.ts` with your Project ID:
```ts
// Already configured for KIRAN PUBLIC SCHOOL CMS
```

### 1.3 Add CORS Origin for local dev
In [Sanity Manage](https://sanity.io/manage) → API → CORS Origins:
- Add `http://localhost:3000`
- Add `https://kiranpublicschool.vercel.app`

### 1.4 Deploy Sanity Studio
```bash
cd sanity
npx sanity deploy
# Choose a hostname: kiran-public-school
# Studio will be at: https://kiran-public-school.sanity.studio
```

---

## Step 2: Configure Frontend Environment

### 2.1 Update `.env.local`
Edit `/school/frontend/.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc12345   # ← Replace with your Sanity Project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

NEXT_PUBLIC_SITE_NAME=KIRAN PUBLIC SCHOOL
NEXT_PUBLIC_SITE_URL=https://kiranpublicschool.vercel.app
NEXT_PUBLIC_SITE_PHONE=9065104078
NEXT_PUBLIC_SITE_EMAIL=8541064924suraj@gmail.com
NEXT_PUBLIC_SITE_ADDRESS=Pachpakari Road, Barharwa, Siwan-845418
NEXT_PUBLIC_WHATSAPP_NUMBER=919065104078
```

### 2.2 Test Locally
```bash
cd frontend
npm install
npm run dev
# Open: http://localhost:3000
```

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Install Vercel CLI (optional)
```bash
npm i -g vercel
```

### 3.2 Push to GitHub
```bash
cd /Users/aayushraj/Desktop/school
git init
git add .
git commit -m "KIRAN PUBLIC SCHOOL — Initial Deployment"
git remote add origin https://github.com/YOUR_USERNAME/kiran-public-school.git
git push -u origin main
```

### 3.3 Import to Vercel
1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. **Root Directory**: `frontend`
4. **Framework Preset**: Next.js (auto-detected)

### 3.4 Add Environment Variables in Vercel
In Vercel Dashboard → Settings → Environment Variables, add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `abc12345` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-01-01` |
| `NEXT_PUBLIC_SITE_NAME` | `KIRAN PUBLIC SCHOOL` |
| `NEXT_PUBLIC_SITE_URL` | `https://kiranpublicschool.vercel.app` |
| `NEXT_PUBLIC_SITE_PHONE` | `9065104078` |
| `NEXT_PUBLIC_SITE_EMAIL` | `8541064924suraj@gmail.com` |
| `NEXT_PUBLIC_SITE_ADDRESS` | `Pachpakari Road, Barharwa, Siwan-845418` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `919065104078` |

### 3.5 Deploy
Click **Deploy**. Vercel will build and deploy automatically.

---

## Step 4: Set Up CMS Content

After deploying Sanity Studio, the school owner can login at:
`https://kiran-public-school.sanity.studio`

### Content to Add First:

#### 1. Hero Banners (Homepage Carousel)
- Go to **Hero Banners** → Create document
- Upload 3–5 high-quality banner images (1920×1080px recommended)
- Set autoplay interval (default: 5 seconds)

#### 2. School Logo
- Go to **School Logo** → Create document
- Upload school logo (PNG with transparent background)
- Set alt text: "KIRAN PUBLIC SCHOOL Logo"

#### 3. Home Page Settings
- Go to **Home Page** → Create document
- Set Hero Title, Tagline, Welcome Message
- Configure CTA buttons

#### 4. About Page
- Go to **About Page** → Create document
- Fill: School Name, Mission, Vision, History, Principal's Message
- Upload Principal's photo (optional)
- Add school highlights

#### 5. Notices
- Go to **Notice** → Create new notices
- Set title, date, mark important ones
- Attach PDF files if needed

#### 6. Gallery
- Go to **Gallery** → Create gallery collections
- Categories: Event Images, Campus Photos, Annual Function, Activity Photos

#### 7. Videos
- Go to **Video** → Add video entries
- Paste YouTube/Vimeo URLs

#### 8. Contact Information
- Go to **Contact** → Create document
- Fill: phone, email, address, WhatsApp number
- Add Google Maps embed URL
- Set office hours

---

## Architecture Diagram

```
School Owner
    ↓
Sanity Studio (kiran-public-school.sanity.studio)
    ↓
Sanity Cloud CDN (cdn.sanity.io)
    ↓
Next.js Frontend → Vercel (kiranpublicschool.vercel.app)
    ↓
Visitor's Browser
```

## Live URLs
- **Website**: https://kiranpublicschool.vercel.app
- **CMS Admin**: https://kiran-public-school.sanity.studio

---

## Key Features Summary

| Feature | How it Works |
|---------|-------------|
| Banner Carousel | Upload images to "Hero Banners" collection → auto-rotates on homepage |
| School Logo | Upload to "School Logo" → appears in navbar + about page |
| Notices | Add to "Notice" collection → appear on homepage + notices page |
| Gallery | Upload to "Gallery" → categorized with lightbox |
| Videos | Add YouTube/Vimeo URLs → embedded video modal |
| Contact Form | Form → WhatsApp redirect with pre-filled message |
| WhatsApp Button | Floating button → direct chat to 919065104078 |
