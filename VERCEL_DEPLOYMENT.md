# Deploying Attendance Monitor to Vercel

## 🚀 Complete Deployment Guide

This guide will help you deploy your full-stack Attendance Monitoring System to Vercel with a working backend.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) for free cloud database
3. **GitHub Repository**: Your code should be in a GitHub repository

## Step 1: Set Up MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new account or log in
3. Create a new cluster (free tier M0 is perfect)
4. Wait for the cluster to be provisioned (2-3 minutes)
5. Click "Connect" on your cluster
6. Whitelist your IP address or allow access from anywhere (0.0.0.0/0) for Vercel
7. Create a database user with username and password
8. Click "Choose a connection method" → "Connect your application"
9. Copy the connection string (looks like):
   ```
   mongodb+srv://username:password@cluster.mongodb.net/attendance-monitor?retryWrites=true&w=majority
   ```
10. Replace `<password>` with your actual database user password
11. Replace `myFirstDatabase` with `attendance-monitor` (or your preferred database name)

## Step 2: Prepare Your Repository

Your repository is already configured with:
- ✅ `vercel.json` - Vercel configuration for routing
- ✅ `api/` directory - Serverless functions for backend
- ✅ `frontend/` directory - React application
- ✅ `.env.example` - Template for environment variables

### Important Files Created:

**`vercel.json`** - Routes API requests to serverless functions and frontend requests to React app

**`api/auth/register.js`** - Serverless function for user registration

**`api/auth/login.js`** - Serverless function for user login

**`api/package.json`** - Dependencies for serverless functions

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration
5. **Before deploying**, click "Environment Variables"
6. Add the following environment variables:

   **MONGODB_URI**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/attendance-monitor?retryWrites=true&w=majority
   ```
   *(Use your actual MongoDB connection string from Step 1)*

   **JWT_SECRET**
   ```
   your-super-secure-random-string-here-make-it-long-and-complex
   ```
   *(Generate a secure random string - at least 32 characters)*

   **Important**: Select all environments (Production, Preview, Development) for both variables

7. Click "Deploy"
8. Wait for the build to complete (2-3 minutes)
9. Your app will be live at `https://your-project-name.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from your project root
cd "/Users/bruisedknuckles/Desktop/Amrut dada website/github repo/AttendanceMonitor"
vercel

# Follow the prompts and add environment variables when asked
```

## Step 4: Verify Deployment

1. Visit your deployed URL: `https://your-project-name.vercel.app`
2. Try registering a new user
3. Try logging in
4. Check the browser console (F12) for any errors
5. Check Vercel deployment logs if issues occur

## Step 5: Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

## Troubleshooting Common Issues

### Backend Not Working / 500 Errors

**Cause**: Missing or incorrect environment variables

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `MONGODB_URI` and `JWT_SECRET` are set correctly
3. Redeploy the project (Deployments → ... → Redeploy)

### MongoDB Connection Errors

**Cause**: IP address not whitelisted or incorrect connection string

**Solution**:
1. In MongoDB Atlas, go to Network Access
2. Add IP address `0.0.0.0/0` to allow access from anywhere (Vercel uses dynamic IPs)
3. Verify your connection string includes the correct username, password, and database name
4. Ensure the password doesn't contain special characters that need URL encoding

### CORS Errors

**Cause**: CORS headers not properly configured

**Solution**: The serverless functions already include CORS headers. If you still see errors:
1. Check browser console for specific CORS error
2. Verify the API routes are being called with `/api/auth/...` prefix
3. Check Vercel deployment logs for errors

### Build Fails

**Cause**: Missing dependencies or incorrect build configuration

**Solution**:
1. Check Vercel build logs for specific errors
2. Verify `frontend/package.json` has `vercel-build` script
3. Ensure all dependencies are listed in `package.json` files
4. Try building locally first: `cd frontend && npm run build`

### Functions Timeout

**Cause**: MongoDB connection takes too long or cold start

**Solution**:
1. Verify MongoDB Atlas cluster is active
2. Use connection pooling (already configured in the serverless functions)
3. Consider upgrading Vercel plan for longer timeout limits

## Project Structure on Vercel

```
your-project.vercel.app/
├── /                          → React Frontend
├── /api/auth/register         → User Registration Endpoint
├── /api/auth/login            → User Login Endpoint
└── (future API routes here)
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/attendance-monitor` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-secure-random-string-here` |

## Monitoring Your Deployment

1. **Vercel Dashboard**: Monitor deployment status, build logs, and analytics
2. **MongoDB Atlas**: Monitor database usage, connections, and performance
3. **Browser DevTools**: Check network requests and console errors
4. **Vercel Logs**: Real-time function logs (Dashboard → Deployments → Select deployment → Functions)

## Updating Your Deployment

Every time you push to your GitHub repository's main branch, Vercel will automatically:
1. Build your project
2. Deploy the new version
3. Run tests (if configured)
4. Update the live site with zero downtime

## Local Development vs Production

### Local Development
- Backend runs on `http://localhost:5001`
- Frontend runs on `http://localhost:3000`
- Frontend proxy forwards `/api/*` requests to backend
- Use local MongoDB or MongoDB Atlas
- Use `.env` file in backend directory

### Production (Vercel)
- Frontend and API served from same domain
- `/api/*` routes handled by serverless functions
- Environment variables set in Vercel dashboard
- Automatic HTTPS and CDN
- Serverless functions with cold starts

## Cost Breakdown

**Free Tier Limits:**
- Vercel: 100GB bandwidth/month, unlimited deployments
- MongoDB Atlas: 512MB storage, shared cluster
- **Total Cost**: $0/month for hobby projects

**When to Upgrade:**
- More than 100GB bandwidth on Vercel
- Need more than 512MB database storage
- Require dedicated MongoDB cluster
- Need commercial licenses or support

## Next Steps

1. ✅ Deploy to Vercel
2. ✅ Set up environment variables
3. ✅ Test registration and login
4. 🔄 Add more features (attendance tracking, etc.)
5. 🔄 Set up monitoring and error tracking
6. 🔄 Configure custom domain

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review browser console errors
4. Check this troubleshooting guide
5. Review Vercel documentation: [vercel.com/docs](https://vercel.com/docs)

---

**Note**: The backend has been converted to serverless functions, which means:
- Each API route is a separate serverless function
- Functions are deployed globally on Vercel's edge network
- Cold starts may occur (first request after inactivity may be slower)
- No need to manage servers or scaling
- Pay only for execution time (free tier is generous)
