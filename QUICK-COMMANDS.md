# 🚀 Quick Commands for Acroeduvos

## Git Commands

```bash
# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub (HTTPS)
git push origin main

# Push to GitHub (SSH)
git push ssh main

# Pull latest changes
git pull origin main

# Check remote URLs
git remote -v
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Visit: http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Check for issues
npm run lint
```

## Deployment Commands

```bash
# Vercel CLI (if installed)
vercel --prod

# GitHub CLI (if installed)
gh repo clone Acroeduvos/v0-acroeduvos-website
gh auth login
gh repo deploy
```

## Repository URLs

**HTTPS**: `https://github.com/Acroeduvos/v0-acroeduvos-website.git`
**SSH**: `git@github.com:Acroeduvos/v0-acroeduvos-website.git`

## Quick Links

- **Repository**: https://github.com/Acroeduvos/v0-acroeduvos-website
- **Vercel Dashboard**: https://vercel.com
- **Local Development**: http://localhost:3000

## Environment Setup

```bash
# Create .env.local file
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" > .env.local
echo "NEXT_PUBLIC_APP_NAME=Acroeduvos" >> .env.local
echo "NEXT_PUBLIC_APP_DESCRIPTION=Learn to Code with Real Interview Questions" >> .env.local
```
