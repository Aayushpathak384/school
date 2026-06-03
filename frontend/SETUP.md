# Development Setup Guide

Complete guide to set up your development environment for the school website.

## System Requirements

- **Node.js**: 18.17 or later
- **npm**: 9.x or later
- **Git**: Latest version
- **Code Editor**: VS Code (recommended)

## Installation Steps

### 1. Install Node.js

#### macOS (Recommended via Homebrew)
```bash
# Install Homebrew first if not installed
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node

# Verify installation
node --version  # Should be 18.x or later
npm --version   # Should be 9.x or later
```

#### Windows
1. Download from [nodejs.org](https://nodejs.org/)
2. Run installer (.msi file)
3. Follow setup wizard (use defaults)
4. Open Command Prompt and verify:
   ```cmd
   node --version
   npm --version
   ```

#### Linux (Ubuntu/Debian)
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### 2. Install Git

#### macOS
```bash
brew install git
```

#### Windows
Download from [git-scm.com](https://git-scm.com/)

#### Linux
```bash
sudo apt-get install git
```

### 3. Clone the Repository

```bash
# Navigate to desired location
cd /Users/aayushraj/Desktop

# Clone repository (or use your GitHub URL)
git clone https://github.com/your-username/school-website.git

# Navigate to project
cd school-website/frontend
```

### 4. Install Dependencies

```bash
# Install npm packages
npm install

# This may take a few minutes
# When complete, you should see: "added XXX packages"
```

### 5. Set Up Environment Variables

```bash
# Copy example file
cp .env.example .env.local

# Edit .env.local with your editor
# Add your Sanity credentials (see below)
```

### Get Sanity Credentials

1. Visit [manage.sanity.io](https://manage.sanity.io)
2. Sign in or create account
3. Create new project or select existing
4. Go to "Settings" → "API" → "Public API"
5. Copy:
   - **Project ID** (alphanumeric string)
   - **Dataset** (usually "production")
   - **API Version** (we use "2024-01-01")

### 6. Configure .env.local

Open `.env.local` in your editor and update:

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc1234567890def (your actual ID)
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Site Configuration
NEXT_PUBLIC_SITE_NAME=Your School Name
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Running Development Server

### Start the Server

```bash
# From frontend directory
npm run dev
```

You should see:
```
> next dev
  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local
```

### Access the Website

Open browser and visit:
- Frontend: **http://localhost:3000**
- Sanity Studio: **http://localhost:3333** (if running in sanity folder)

### Hot Reload

Changes save automatically! Just edit a file and see updates instantly.

## Development Workflow

### Daily Development

```bash
# 1. Start development server
npm run dev

# 2. Make changes to files in src/

# 3. Changes auto-reload in browser

# 4. When satisfied, commit changes
git add .
git commit -m "Description of changes"
git push
```

### Useful Commands

```bash
# Format code
npm run lint

# Build for production
npm run build

# Run production build locally
npm run start

# Check TypeScript errors
npx tsc --noEmit
```

## Editing Sanity Content

### Access Sanity Studio

```bash
# Navigate to sanity folder
cd ../sanity

# Start Sanity Studio
npm run dev

# Visit http://localhost:3333
```

### Create Test Content

1. In Sanity Studio (http://localhost:3333)
2. Create sample data for each schema:
   - Homepage (hero section)
   - About (mission, vision)
   - Faculty (2-3 teachers)
   - Notices (3-5 announcements)
   - Gallery (sample images)
   - Etc.

3. Return to frontend and verify displays correctly

## Debugging

### Browser DevTools

Open in browser:
```
F12 or Right-click → Inspect
```

Check for:
- Console errors (red messages)
- Network errors (red request status)
- Component warnings (yellow messages)

### Common Issues

**Issue: "Cannot find module"**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules
npm install
npm run dev
```

**Issue: Port 3000 already in use**
```bash
# Use different port
npm run dev -- -p 3001
```

**Issue: Sanity data not loading**
```bash
# Check:
# 1. .env.local has correct Project ID
# 2. Sanity project is set to public read access
# 3. Data exists in Sanity studio
# 4. Network tab shows request to sanity.io
```

**Issue: Images not displaying**
```bash
# Check:
# 1. Images uploaded in Sanity CMS
# 2. Browser console for errors
# 3. Network tab for image request status
```

## Code Structure

### Understanding the Codebase

```
src/
├── pages/              # Routes (becomes URLs)
│   ├── index.tsx       → http://localhost:3000/
│   ├── about.tsx       → http://localhost:3000/about
│   └── contact.tsx     → http://localhost:3000/contact
├── components/
│   ├── layout/         # Reused across all pages (Header, Footer)
│   ├── sections/       # Page sections (HeroSection, etc.)
│   ├── common/         # Generic components (Button, Card)
│   └── ui/             # Small components (Badge, Stars)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript interfaces
└── styles/             # CSS (Tailwind)
```

### How Data Flows

```
Sanity CMS (Backend)
    ↓
lib/sanity.ts (Fetch functions)
    ↓
usesFetch hook (Data loading)
    ↓
React Components (Display)
    ↓
Browser (User sees page)
```

## Making Changes

### Adding a New Component

1. Create file in appropriate folder:
   ```
   src/components/common/MyComponent.tsx
   ```

2. Write component:
   ```tsx
   interface MyComponentProps {
     title: string
     onClick?: () => void
   }

   export default function MyComponent({ title, onClick }: MyComponentProps) {
     return <button onClick={onClick}>{title}</button>
   }
   ```

3. Use in page:
   ```tsx
   import MyComponent from '@/components/common/MyComponent'

   export default function Page() {
     return <MyComponent title="Click me" />
   }
   ```

### Modifying a Page

1. Open page in `src/pages/`
2. Make changes
3. Browser auto-refreshes
4. Test on different screen sizes (DevTools)

### Styling with Tailwind

Use Tailwind utility classes:

```tsx
<div className="flex items-center justify-between gap-4 p-6 bg-blue-600 rounded-lg shadow-lg hover:shadow-xl transition">
  <h2 className="text-2xl font-bold text-white">Title</h2>
  <button className="px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition">
    Click
  </button>
</div>
```

Reference: [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Git Workflow

### Commit Your Changes

```bash
# See what changed
git status

# Add specific files
git add src/pages/about.tsx

# Or add all changes
git add .

# Create commit
git commit -m "Update: Improved About page layout"

# Push to GitHub
git push
```

### Commit Message Guidelines

Good message:
```
Update: Added testimonial carousel
Fix: Contact form validation error
Feature: Added dark mode toggle
```

Bad message:
```
asdf
changes
update
```

## Testing Your Changes

### Manual Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation menu works on mobile
- [ ] Images load quickly
- [ ] Forms are functional
- [ ] Links work (internal and external)
- [ ] No console errors (F12)
- [ ] Responsive on: mobile (375px), tablet (768px), desktop (1920px)

### Device Testing

1. **Chrome DevTools** (built-in)
   - F12 → Responsive Design Mode (Ctrl+Shift+M)
   - Test at different screen sizes

2. **Actual Devices**
   - Test on real phone/tablet when possible
   - iOS: Safari
   - Android: Chrome

## Performance Monitoring

### Check Build Size

```bash
npm run build

# Look for output like:
# ○ (Static)  revalidated in 1s
# ● (SSG)     33.5 kB

# Smaller is better
```

### Slow Page Performance

```bash
# Enable React StrictMode (already enabled)
# This shows potential issues

# Profile with DevTools:
# 1. Open DevTools (F12)
# 2. Performance tab
# 3. Record interaction
# 4. Analyze results
```

## VS Code Setup (Optional but Recommended)

### Install Extensions

1. **ES7+ React/Redux/React-Native snippets**
   - Quick component boilerplate

2. **Tailwind CSS IntelliSense**
   - Autocomplete for Tailwind classes

3. **TypeScript Vue Plugin**
   - Better TypeScript support

4. **Prettier - Code formatter**
   - Auto-format code on save

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Troubleshooting Development Setup

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `npm run dev -- -p 3001` |
| Module not found | `npm install` then restart |
| Styles not loading | Clear `.next` folder: `rm -rf .next` |
| Environment vars not working | Restart dev server |
| Git not working | Check git is installed: `git --version` |

## Next Steps

1. ✅ Complete setup above
2. ✅ Start development server
3. ✅ Visit http://localhost:3000
4. ✅ Make a small change and verify hot-reload works
5. ✅ Commit change to Git
6. ✅ Ready to develop!

## Resources

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Sanity CMS**: https://www.sanity.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

**Development environment ready! Happy coding! 🚀**
