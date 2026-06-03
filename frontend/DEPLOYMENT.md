# Deployment Guide - Vercel

Complete step-by-step guide to deploy your school website to Vercel.

## Prerequisites

✅ GitHub account (free)  
✅ Vercel account (free, sign up with GitHub)  
✅ Sanity CMS project with credentials  
✅ Custom domain (optional)  

## Step-by-Step Deployment

### 1. Prepare Your Code

```bash
# Navigate to frontend directory
cd /Users/aayushraj/Desktop/school/frontend

# Verify dependencies are installed
npm install

# Build locally to check for errors
npm run build

# If successful, you should see:
# ✓ Compiled successfully
```

### 2. Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: School website with all pages and components"

# Add GitHub repository remote
git remote add origin https://github.com/your-username/school-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up"
3. Choose "Continue with GitHub"
4. Authorize Vercel
5. Create a team (optional) or skip

### 4. Import Project to Vercel

1. In Vercel dashboard, click "Add New" → "Project"
2. Find your GitHub repository (or connect GitHub account)
3. Select your repository
4. Click "Import"

### 5. Configure Environment Variables

**IMPORTANT:** Add your Sanity credentials before deploying!

1. In the import dialog, look for "Environment Variables"
2. Add the following:

```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id_here
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
```

**How to find your credentials:**
- Go to [manage.sanity.io](https://manage.sanity.io)
- Select your project
- Go to "Settings" → "API" → "Public API"
- Copy **Project ID** from URL or API settings
- **Dataset** is usually "production"
- **API Version** is the date format (we use 2024-01-01)

### 6. Deploy

1. Click "Deploy"
2. Wait for deployment to complete (usually 2-3 minutes)
3. You'll get a preview URL like: `https://school-website.vercel.app`

### 7. Verify Deployment

1. Click the preview URL
2. Test all pages:
   - Home page loads with hero banner
   - Navigation menu works
   - About page displays content from Sanity
   - Faculty page shows teachers
   - Gallery loads images
   - Contact form displays
   - No console errors (check DevTools)

### 8. Connect Custom Domain (Optional)

#### Option A: Domain from Vercel

1. In Vercel project settings → "Domains"
2. Click "Add" button
3. Enter your domain (e.g., myschool.com)
4. Follow instructions to point domain to Vercel

#### Option B: Domain from Another Provider (GoDaddy, Namecheap, etc.)

1. In Vercel project settings → "Domains"
2. Add your domain
3. Vercel shows you the **Nameservers** to add
4. Go to your domain provider's DNS settings
5. Replace nameservers with Vercel's nameservers
6. Wait 24-48 hours for DNS propagation

#### Verify Custom Domain Works

```bash
# From terminal
nslookup yourdomain.com
# Should return Vercel's IP addresses

# Or just visit in browser
# https://yourdomain.com
```

## Continuous Deployment

After initial setup, **any push to GitHub automatically deploys**!

```bash
# Make changes locally
# Then push to GitHub
git add .
git commit -m "Update: Added new testimonials"
git push

# Vercel automatically:
# 1. Pulls latest code
# 2. Installs dependencies
# 3. Builds project
# 4. Deploys to production

# Check deployment status at vercel.com dashboard
```

## Environment Variables Reference

Update environment variables in Vercel:

1. Project Settings → Environment Variables
2. Add/Edit variables
3. They automatically apply to next deployment

### Available Variables

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01

# Optional (for future features)
SANITY_API_TOKEN = (for authenticated API access)
```

## Troubleshooting Deployment

### Issue: "Build failed"

**Solution:**
```bash
# Try building locally to see full error
npm run build

# Common fixes:
# 1. Check environment variables are set
# 2. Verify Sanity project ID is correct
# 3. Make sure dependencies are installed: npm install
# 4. Check for TypeScript errors: npm run lint
```

### Issue: "Environment variables not found"

**Solution:**
- Go to Vercel Project Settings → Environment Variables
- Add all three required variables
- Redeploy project

### Issue: "Images not loading"

**Solution:**
- Verify Sanity credentials are correct
- Check that images are uploaded in Sanity CMS
- Try purging cache: Go to Deployments → right-click latest → Purge Cache

### Issue: "Data not updating"

**Solution:**
- Check that Sanity project ID is correct
- Verify dataset name matches (usually "production")
- Check Sanity project is public (readable without auth)
- Wait a few seconds for Sanity CDN to update

### Issue: Custom domain not working

**Solution:**
```bash
# DNS propagation takes time
# Check status at: https://dnschecker.org
# Enter your domain name

# If still not working:
# 1. Verify nameservers changed at domain provider
# 2. Wait 24-48 hours
# 3. Clear browser cache (Ctrl+Shift+Delete)
```

## Rollback to Previous Version

If something breaks after deploy:

1. Go to Vercel Dashboard
2. Click on your project
3. Go to "Deployments" tab
4. Find the previous working deployment
5. Click the three dots → "Promote to Production"

## Performance Monitoring

### View Deployment Logs

1. Go to Vercel Dashboard
2. Click project → "Deployments"
3. Click on deployment → "View Logs"

### Check Analytics

1. Project → "Analytics" tab
2. View:
   - Page views
   - Error rate
   - Response time
   - Bandwidth usage

## SSL Certificate

✅ Automatically included with Vercel!
- All sites get free SSL certificate
- HTTPS enabled by default
- Auto-renews annually

## Advanced Configuration

### Change Build Settings

1. Project Settings → "Build & Development Settings"
2. Options:
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Development Command**: `npm run dev`

### Configure Redirects/Rewrites

Edit `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/old-page",
      "destination": "/new-page",
      "permanent": true
    }
  ]
}
```

## CDN & Caching

Vercel automatically:
- ✅ Serves static files from edge locations
- ✅ Caches images from Sanity CDN
- ✅ Gzips CSS and JavaScript
- ✅ Minifies assets

## Monitoring & Analytics

Enable analytics in Vercel:

1. Project Settings → "Analytics"
2. Enable "Web Analytics"
3. View real-time metrics

## Backup & Recovery

### Backup Your Content

Your content is stored in Sanity Cloud and automatically backed up.

To manually export:

```bash
# In sanity folder
npm run export

# Creates: backup.tar.gz
```

### Restore Website

1. If Vercel deployment fails, manual rollback:
   - Go to Vercel Dashboard
   - Select previous working deployment
   - Click "Promote to Production"

2. If Sanity data is corrupted:
   - Restore from backup.tar.gz
   - Contact Sanity support

## Performance Optimization

### Recommended Optimizations

1. **Enable ISR (Incremental Static Regeneration)**
   - Pages cache for 60 seconds
   - Update without rebuilding entire site

2. **Optimize Images in Sanity**
   - Resize large images before uploading
   - Use WebP format where possible

3. **Monitor Bundle Size**
   ```bash
   npm run build -- --analyze
   ```

## Security Checklist

✅ HTTPS enabled (automatic)  
✅ Environment variables not in code  
✅ Sanity project is read-only public  
✅ No sensitive data in frontend  
✅ CORS properly configured  
✅ Headers set for security  

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **Sanity CDN**: https://www.sanity.io/docs/presentation
- **Vercel Support**: https://vercel.com/support

## Next Steps After Deployment

1. ✅ Set up analytics (Google Analytics)
2. ✅ Configure email notifications for deployment errors
3. ✅ Set up monitoring for uptime
4. ✅ Add form submission backend (Formspree, Netlify Forms, etc.)
5. ✅ Enable Sanity Preview for draft content
6. ✅ Set up automatic backups

---

**Deployment complete! Your school website is now live! 🚀**
