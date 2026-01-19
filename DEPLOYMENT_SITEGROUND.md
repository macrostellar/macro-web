# Deployment Notes for SiteGround (Admin Dashboard)

## Base Path
- The app is configured to run under `/macrotracking` using Next.js `basePath`.
- All internal navigation and asset paths use the basePath helper or environment variable.

## Environment Variables
- Set `NEXT_PUBLIC_BASE_PATH=/macrotracking` in your environment for correct routing.
- All API endpoints and secrets should be managed via environment variables (never hardcoded).

## Build & Deploy
1. Run `npm run build` to generate the production build.
2. Deploy the `.next`, `public`, and all app files to your SiteGround Node.js hosting.
3. Ensure your server/proxy routes `/macrotracking/*` to the Next.js app entry.

## Static Assets
- Only admin dashboard assets are included. No marketing/public images or styles remain.

## Security
- The app entry point is authentication (`/signin`).
- All admin routes are protected; unauthenticated users are redirected to `/signin`.

## Clean Routing
- No public/landing page routes exist. Only admin dashboard routes are present.

---

For any issues, check your environment variables and SiteGround's Node.js app routing settings.
