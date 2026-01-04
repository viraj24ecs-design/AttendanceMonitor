# ⚡ Quick Vercel Deployment Checklist

## Before You Start
- [ ] GitHub repository with your code
- [ ] Vercel account (free): [vercel.com](https://vercel.com)
- [ ] MongoDB Atlas account (free): [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

## Step 1: MongoDB Atlas (5 minutes)
1. [ ] Create free cluster (M0)
2. [ ] Add IP `0.0.0.0/0` to Network Access
3. [ ] Create database user (username + password)
4. [ ] Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/attendance-monitor
   ```

## Step 2: Deploy to Vercel (3 minutes)
1. [ ] Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. [ ] Click "Add New..." → "Project"
3. [ ] Import your GitHub repository
4. [ ] Add Environment Variables:
   - [ ] **MONGODB_URI**: Your MongoDB connection string
   - [ ] **JWT_SECRET**: Random secure string (32+ chars)
   - [ ] Select all environments (Production, Preview, Development)
5. [ ] Click "Deploy"
6. [ ] Wait 2-3 minutes

## Step 3: Test (1 minute)
- [ ] Visit `https://your-project.vercel.app`
- [ ] Register a new user
- [ ] Log in successfully
- [ ] ✅ Done!

## If Something Goes Wrong

### Backend not working?
→ Check environment variables in Vercel Settings → Environment Variables → Redeploy

### MongoDB connection error?
→ Verify connection string and IP whitelist (0.0.0.0/0)

### Build fails?
→ Check Vercel build logs for specific errors

## Your App URLs
- **Frontend**: `https://your-project.vercel.app`
- **Register API**: `https://your-project.vercel.app/api/auth/register`
- **Login API**: `https://your-project.vercel.app/api/auth/login`

## Next Time You Deploy
Just push to GitHub → Vercel auto-deploys! 🎉

---

**Need detailed help?** See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete guide with troubleshooting.
