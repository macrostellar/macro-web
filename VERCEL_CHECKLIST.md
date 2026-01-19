# Vercel Deployment Checklist

## Pre-Deployment

- [x] Build is successful (`npm run build`)
- [x] No TypeScript errors
- [x] All routes configured with `basePath: '/macrotracking'`
- [x] Environment variables documented
- [x] `.gitignore` includes `.env.local`
- [x] `vercel.json` configured
- [x] `.vercelignore` created
- [x] Package.json has correct build scripts
- [x] Node version specified (18.x)

## Deployment Steps

### Step 1: Push to Git
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Visit https://vercel.com/new
2. Select your Git provider
3. Import your repository
4. Select this project

### Step 3: Configure Settings
- Framework: Next.js ✓
- Build Command: `npm run build` ✓
- Output Directory: `.next` ✓
- Install Command: `npm install` ✓

### Step 4: Add Environment Variables
In Vercel Dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
PROJECT_NAME
PROJECT_ID
```

**Set for**: Production, Preview, Development

### Step 5: Deploy
Click "Deploy" button

### Step 6: Verify Deployment
After deployment completes:
- [ ] Navigate to `your-domain/macrotracking`
- [ ] Verify sign-in page loads
- [ ] Check browser console for errors
- [ ] Test API endpoints (`/api/mock-device`)
- [ ] Verify Supabase connection
- [ ] Test a few navigation routes

## Post-Deployment

- [ ] Verify all routes working
- [ ] Check error logs in Vercel dashboard
- [ ] Monitor performance in Analytics
- [ ] Set up custom domain (optional)
- [ ] Configure production environment
- [ ] Set up monitoring/alerts
- [ ] Document deployment URL

## Quick Access URLs

After deployment at `your-project.vercel.app`:

| Page | URL |
|------|-----|
| Root | `https://your-project.vercel.app/macrotracking` |
| Sign In | `https://your-project.vercel.app/macrotracking/signin` |
| Dashboard | `https://your-project.vercel.app/macrotracking/dashboard` |
| Alerts | `https://your-project.vercel.app/macrotracking/alerts` |
| Vehicles | `https://your-project.vercel.app/macrotracking/vehicles` |
| Drivers | `https://your-project.vercel.app/macrotracking/owners` |

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Check logs in Vercel dashboard, verify env vars |
| App not loading | Verify `basePath` in next.config.ts |
| API 404 errors | Check API routes exist in app/api/ |
| Styles not loading | Clear browser cache, verify CSS imports |
| Database errors | Verify Supabase credentials and RLS policies |

## Rollback Plan

1. Go to Vercel Dashboard → Deployments
2. Find previous successful deployment
3. Click menu → "Promote to Production"
4. Confirm promotion

## Monitoring

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Analytics**: View Web Vitals and performance
- **Deployments**: Track all deployments
- **Logs**: Real-time application logs

## Files Created for Vercel

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel configuration |
| `.vercelignore` | Files to exclude from deployment |
| `VERCEL_DEPLOYMENT.md` | Detailed deployment guide |
| This file | Quick reference checklist |

## Notes

- Vercel provides free tier with good performance
- Automatic SSL/TLS certificates
- Global CDN for fast delivery
- Preview deployments for PRs
- Analytics included
- Serverless functions at scale

---

**Status**: ✅ Ready for Vercel Deployment
**Last Updated**: January 20, 2026
