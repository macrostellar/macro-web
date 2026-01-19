# Vercel Deployment Guide

## Overview

This guide explains how to deploy the Macrostellar Tracking App to Vercel.

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub, GitLab, or Bitbucket repository with this project
- Supabase credentials ready

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Push to Git Repository
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

#### Step 2: Import Project to Vercel

1. Go to [https://vercel.com/new](https://vercel.com/new)
2. Select your Git provider (GitHub, GitLab, or Bitbucket)
3. Authorize Vercel to access your repositories
4. Select the repository containing this project
5. Click "Import"

#### Step 3: Configure Project

**Project Settings:**
- Framework Preset: Next.js (should auto-detect)
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`
- Development Command: `npm run dev`

#### Step 4: Set Environment Variables

In the "Environment Variables" section, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PROJECT_NAME=Macrostellar
PROJECT_ID=your-project-id
```

**Important**: Environment variables starting with `NEXT_PUBLIC_` are exposed to the browser.

#### Step 5: Deploy

Click "Deploy" and wait for the build to complete (typically 2-5 minutes).

### Method 2: Deploy via Vercel CLI

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Authenticate
```bash
vercel login
```

#### Step 3: Deploy
```bash
vercel
```

#### Step 4: Follow the Prompts
- Link to existing project or create new one
- Set production domain
- Configure environment variables when prompted

#### Step 5: Deploy to Production
```bash
vercel --prod
```

### Method 3: GitHub Actions Auto-Deploy

Vercel automatically deploys on every push to `main` branch if connected via GitHub.

## Environment Variables Configuration

### For Vercel Dashboard:

1. Go to your project → Settings → Environment Variables
2. Add each variable with its corresponding value
3. Select which environments (Production, Preview, Development) should have access
4. Click "Save"

**Recommended setup:**
- **Production**: All variables
- **Preview**: All variables (for testing)
- **Development**: Only NEXT_PUBLIC_* variables

### For Local Development:

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
PROJECT_NAME=Macrostellar
PROJECT_ID=your-project-id
```

## Project Configuration

The app is configured in `vercel.json` and `next.config.ts`:

**Base Path**: `/macrotracking`
- Your app will be accessible at: `your-vercel-url/macrotracking`
- All routes automatically prefixed with `/macrotracking`

**Node Version**: 18.x (configured in vercel.json)

## Accessing Your Deployed App

After deployment, Vercel provides:

1. **Default URL**: `your-project-name.vercel.app`
2. **Production URL**: If you configured a custom domain
3. **Preview URLs**: For each pull request

All URLs will include the `/macrotracking` base path.

Example:
- Dashboard: `your-domain.vercel.app/macrotracking/dashboard`
- Sign In: `your-domain.vercel.app/macrotracking/signin`
- Alerts: `your-domain.vercel.app/macrotracking/alerts`

## Monitoring & Logs

### View Logs:
1. Go to Vercel Dashboard → Select your project
2. Click "Deployments" tab
3. Select a deployment to view logs
4. Scroll through build and runtime logs

### Monitor Performance:
1. Go to "Analytics" tab
2. View Web Vitals and performance metrics
3. Check Core Web Vitals scores

## Custom Domain Setup

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain
4. Update DNS records as instructed by Vercel
5. Vercel auto-generates SSL certificate

## Continuous Deployment

After initial setup, Vercel automatically:
- ✅ Deploys on every push to `main`
- ✅ Creates preview deployments for pull requests
- ✅ Generates unique URLs for each deployment
- ✅ Handles SSL certificates automatically

## Troubleshooting

### Issue: Build fails with "Missing environment variables"
**Solution**: Ensure all required variables are set in Vercel dashboard

### Issue: Static assets not loading
**Solution**: Verify `basePath: '/macrotracking'` is set in next.config.ts

### Issue: API routes return 404
**Solution**: Check that API routes exist and are using correct paths with `/macrotracking` prefix

### Issue: Supabase connection fails
**Solution**: 
1. Verify credentials are correct
2. Check Supabase project is active
3. Verify RLS policies allow access

### Issue: Pages are slow to load
**Solution**:
1. Check Vercel Analytics for performance bottlenecks
2. Optimize images (already configured)
3. Check database query performance

## Rollback

To rollback to a previous deployment:

1. Go to Deployments tab
2. Find the deployment to rollback to
3. Click the three dots menu
4. Select "Promote to Production"

## Security Checklist

- ✅ `.env.local` is in `.gitignore` (never commit secrets)
- ✅ `NEXT_PUBLIC_*` variables are exposed to browser (OK for public keys)
- ✅ Service role key is kept secret (only backend use)
- ✅ Vercel provides automatic HTTPS/SSL
- ✅ Configure CORS if needed for API access

## Advanced Configuration

### Custom Build Command:
If you need a custom build process, edit `vercel.json`

### Function Configuration:
Vercel automatically optimizes Next.js, but you can customize in next.config.ts

### Rewrite Rules:
Currently configured with `basePath` for URL prefix handling

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support

## Tips for Production

1. Monitor error logs regularly
2. Set up uptime monitoring alerts
3. Keep dependencies updated
4. Test preview deployments before merging
5. Use preview URLs for stakeholder review
6. Monitor database usage and costs
7. Regular backups of Supabase data

---

**Deployment Status**: Ready for Vercel
**Last Updated**: January 20, 2026
**Next.js Version**: 16.0.5
**Node.js Requirement**: 18+
