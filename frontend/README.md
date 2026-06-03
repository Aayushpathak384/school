# School Website - Modern CMS-Driven Platform

A modern, responsive school website built with **React (Next.js)**, **Sanity CMS**, and **Tailwind CSS**. Fully managed from Sanity dashboard with no custom backend required.

## 🎯 Features

✅ **Dynamic Content Management** - All content editable from Sanity CMS  
✅ **Fully Responsive** - Perfect on mobile, tablet, and desktop  
✅ **Modern UI/UX** - Clean design with smooth animations  
✅ **Performance Optimized** - Image optimization, lazy loading, fast CDN  
✅ **SEO Friendly** - Structured data, meta tags, sitemap ready  
✅ **Easy Deployment** - One-click deploy to Vercel  
✅ **No Backend Required** - Uses Sanity Cloud exclusively  

## 📚 Pages & Sections

- **Home** - Hero banner, welcome message, latest notices, featured gallery
- **About** - Mission, vision, highlights, principal message, school history
- **Faculty** - Teacher profiles with search and filtering
- **Notices** - Announcement board with categories and PDF attachments
- **Gallery** - Image galleries by category with lightbox
- **Videos** - YouTube/Vimeo videos with filtering
- **Testimonials** - Parent & student reviews with ratings
- **Achievements** - School awards and accomplishments
- **Contact** - Contact form, info, office hours, Google Maps, WhatsApp

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Sanity CMS account (free tier available)

### Installation

1. **Clone/Setup the repository**
```bash
cd /Users/aayushraj/Desktop/school/frontend
npm install
```

2. **Configure Environment Variables**
```bash
# Copy .env.example to .env.local and fill in your Sanity credentials
cp .env.example .env.local
```

3. **Get Sanity Credentials**
   - Go to [Sanity Dashboard](https://manage.sanity.io/)
   - Create a new project or use existing one
   - Get your **Project ID** and **Dataset** name
   - Add to `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

4. **Start Development Server**
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── pages/              # Next.js pages/routes
│   │   ├── index.tsx       # Home page
│   │   ├── about.tsx       # About page
│   │   ├── faculty.tsx     # Faculty page
│   │   ├── notices.tsx     # Notices page
│   │   ├── gallery.tsx     # Gallery page
│   │   ├── videos.tsx      # Videos page
│   │   ├── testimonials.tsx # Testimonials page
│   │   ├── achievements.tsx # Achievements page
│   │   ├── contact.tsx     # Contact page
│   │   ├── _app.tsx        # App wrapper
│   │   ├── _document.tsx   # Document root
│   │   └── 404.tsx         # 404 page
│   ├── components/         # Reusable React components
│   │   ├── layout/         # Header, Footer, Container
│   │   ├── sections/       # Page sections
│   │   ├── common/         # Common UI components
│   │   └── ui/             # Small UI components
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities
│   ├── types/              # TypeScript types
│   └── styles/             # Global styles
├── public/                 # Static assets
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── vercel.json             # Vercel deployment config
└── .env.local              # Environment variables (not in git)
```

## 📝 Content Management

### Editing Content in Sanity

1. **Go to Sanity Studio**
```bash
# In sanity folder
cd ../sanity
npm run dev
# Visit http://localhost:3333
```

2. **Update Each Section**
   - **Homepage** - Hero banner, CTA buttons, welcome message
   - **About** - School info, mission, vision, highlights
   - **Faculty** - Add/edit teacher profiles
   - **Notices** - Create announcements with PDF attachments
   - **Gallery** - Upload images and organize by category
   - **Videos** - Add YouTube/Vimeo video links
   - **Testimonials** - Add parent and student reviews
   - **Achievements** - Add school awards and achievements
   - **Contact** - Update contact info, office hours, Google Maps embed

Changes publish instantly to the website!

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:
```javascript
colors: {
  primary: {
    600: '#your-color',
    // ... more shades
  }
}
```

### Fonts
Fonts are loaded from Google Fonts in `_document.tsx`. Change the font URL there.

### Logo
Replace the text "School" in `Header.tsx` with an image logo:
```tsx
<Image src="/logo.png" width={40} height={40} alt="Logo" />
```

## 🔧 Building for Production

```bash
npm run build
npm run start
```

Or deploy directly to Vercel:
```bash
# Push to GitHub, connect Vercel, and it auto-deploys
```

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push
```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `NEXT_PUBLIC_SANITY_API_VERSION`
   - Click Deploy

3. **Custom Domain**
   - In Vercel, go to Settings > Domains
   - Add your custom domain
   - Update DNS records per Vercel instructions

### Environment Variables in Vercel

```
NEXT_PUBLIC_SANITY_PROJECT_ID = your_project_id
NEXT_PUBLIC_SANITY_DATASET = production
NEXT_PUBLIC_SANITY_API_VERSION = 2024-01-01
```

## 🎯 Performance Optimization

- **Images** - Automatic optimization via Next.js Image component
- **Lazy Loading** - Components load on viewport intersection
- **Code Splitting** - Each page bundles only needed code
- **CDN** - Sanity images served via edge-cached CDN
- **Caching** - Static pages cached and revalidated on demand

## 🔐 Security

- No sensitive data exposed in frontend
- Sanity CDN handles all file serving
- CORS properly configured
- No backend vulnerabilities

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Test locally
4. Push and create PR
5. Review and merge

## 📄 License

This project is provided as-is for school use.

## 📞 Support

For issues or questions:
1. Check the [Sanity Documentation](https://www.sanity.io/docs)
2. Review [Next.js Documentation](https://nextjs.org/docs)
3. Check GitHub Issues

## 🎓 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Sanity CMS](https://www.sanity.io/docs)
- [React Hooks](https://react.dev/reference/react)

---

**Built with ❤️ for education**
