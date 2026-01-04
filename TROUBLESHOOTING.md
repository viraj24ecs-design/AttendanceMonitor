# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. MongoDB Connection Issues

#### Problem: "MongoDB connection error"

**Symptoms:**
```
❌ MongoDB connection error: MongooseServerSelectionError
```

**Solutions:**

**A. MongoDB Not Running**
```bash
# Check if MongoDB is running
pgrep mongod

# macOS - Start MongoDB
brew services start mongodb-community

# Linux - Start MongoDB
sudo systemctl start mongod

# Manual start
mongod --dbpath /path/to/data
```

**B. Wrong Connection String**
- Check `backend/.env` file
- Default: `mongodb://localhost:27017/attendance_monitoring`
- For Atlas: Get connection string from MongoDB Atlas dashboard

**C. MongoDB Not Installed**
```bash
# macOS
brew install mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb

# For other systems, visit: https://www.mongodb.com/docs/manual/installation/
```

### 2. Port Already in Use

#### Problem: "EADDRINUSE: address already in use :::5000"

**Solution A: Kill the process**
```bash
# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9

# For port 3000
lsof -ti:3000 | xargs kill -9
```

**Solution B: Change the port**

Backend (`backend/.env`):
```env
PORT=5001
```

Frontend:
```bash
PORT=3001 npm start
```

### 3. Dependencies Not Installed

#### Problem: "Cannot find module 'express'" or similar

**Solution:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### 4. CORS Errors

#### Problem: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solutions:**

**A. Check Backend is Running**
```bash
# Make sure backend is running on port 5000
curl http://localhost:5000
```

**B. Verify Proxy Setting**

In `frontend/package.json`:
```json
{
  "proxy": "http://localhost:5000"
}
```

**C. Restart Frontend**
```bash
cd frontend
# Stop the server (Ctrl+C)
npm start
```

### 5. Login/Register Not Working

#### Problem: "Cannot POST /api/auth/login" or 404 errors

**Checklist:**
1. ✅ Backend server is running
2. ✅ MongoDB is connected
3. ✅ No errors in backend console
4. ✅ Proxy is set in frontend/package.json
5. ✅ Frontend is making requests to correct endpoint

**Test Backend Directly:**
```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "username": "testuser",
    "rollNumber": "TEST001",
    "password": "test123"
  }'
```

### 6. White Screen or Blank Page

#### Problem: Frontend shows blank page

**Solutions:**

**A. Check Browser Console**
- Open DevTools (F12)
- Look for errors in Console tab
- Check Network tab for failed requests

**B. Clear Cache**
```bash
cd frontend
rm -rf build node_modules/.cache
npm start
```

**C. Check React Errors**
- Look for syntax errors in .js files
- Verify all imports are correct
- Check for missing components

### 7. Authentication Not Persisting

#### Problem: Redirected to login after refresh

**Solution:**

Check if localStorage is working:
```javascript
// Open browser console (F12) and run:
localStorage.setItem('test', 'value')
localStorage.getItem('test')
```

If it returns null, check:
- Browser privacy settings
- Incognito/Private mode (localStorage doesn't persist)
- Browser extensions blocking localStorage

### 8. Styling Not Loading

#### Problem: Page has no styles

**Solutions:**

**A. CSS Import Check**
Verify imports in component files:
```javascript
import './LandingPage.css';
```

**B. Restart Dev Server**
```bash
cd frontend
# Ctrl+C to stop
npm start
```

**C. Check File Paths**
Make sure CSS files exist in the correct location

### 9. Environment Variables Not Loading

#### Problem: undefined process.env variables

**Solutions:**

**A. Check .env File Location**
- Must be in `backend/` directory
- Name must be exactly `.env`

**B. Check .env Format**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/attendance_monitoring
JWT_SECRET=your_secret_key
```
No quotes needed, no spaces around =

**C. Restart Server**
```bash
cd backend
# Ctrl+C to stop
npm run dev
```

### 10. Password Not Hashing

#### Problem: Passwords stored in plain text

**Check:**
```javascript
// In backend/routes/auth.js
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
```

**Verify in MongoDB:**
```bash
mongosh
use attendance_monitoring
db.users.find().pretty()
```

Password should look like:
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

### 11. Build Errors

#### Problem: "Failed to compile" or build errors

**Common Causes:**

**A. Missing Dependencies**
```bash
npm install
```

**B. Outdated Dependencies**
```bash
npm update
```

**C. Syntax Errors**
- Check for missing imports
- Verify all brackets are closed
- Check for typos in component names

**D. Node Version**
```bash
node --version  # Should be v14 or higher
```

### 12. MongoDB Atlas Connection

#### Problem: Can't connect to MongoDB Atlas

**Solutions:**

**A. Whitelist IP Address**
1. Go to MongoDB Atlas Dashboard
2. Network Access
3. Add Current IP Address (or 0.0.0.0/0 for testing)

**B. Correct Connection String**
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/attendance_monitoring?retryWrites=true&w=majority
```

**C. Check Credentials**
- Username and password are correct
- Special characters in password are URL-encoded

### 13. JWT Token Issues

#### Problem: "JsonWebTokenError: invalid token"

**Solutions:**

**A. Check JWT_SECRET**
- Same secret in .env as used to create token
- No spaces or special characters

**B. Clear Storage**
```javascript
// In browser console (F12)
localStorage.clear()
```

**C. Re-login**
- Logout and login again
- New token will be generated

### 14. React Router Issues

#### Problem: "Cannot GET /dashboard" on refresh

**Solution:**

This is expected in development. In production, configure server:

**For local testing:**
- Always use navigation in the app
- Don't manually type URLs

**For deployment:**
- Configure redirects (Netlify, Vercel)
- Or use HashRouter instead of BrowserRouter

### 15. Slow Performance

#### Problem: App is slow or laggy

**Solutions:**

**A. Check Network Tab**
- Open DevTools → Network
- Look for slow requests
- Check file sizes

**B. Optimize Images**
- Use compressed images
- Proper image sizes

**C. Check Console for Warnings**
- Fix any React warnings
- Remove console.logs

## 🆘 Still Having Issues?

### Debugging Steps:

1. **Check All Servers Are Running**
   ```bash
   # Terminal 1 - Backend
   cd backend && npm run dev
   
   # Terminal 2 - Frontend  
   cd frontend && npm start
   
   # Terminal 3 - MongoDB
   mongod
   ```

2. **Check Console for Errors**
   - Backend terminal
   - Frontend terminal
   - Browser console (F12)

3. **Verify File Structure**
   ```bash
   tree -L 3 -I 'node_modules'
   ```

4. **Test API Endpoints**
   - Use Postman or curl
   - Test registration and login

5. **Check MongoDB**
   ```bash
   mongosh
   show dbs
   use attendance_monitoring
   show collections
   db.users.find()
   ```

### Clean Slate Restart:

If nothing works, try a complete restart:

```bash
# 1. Stop all servers (Ctrl+C in all terminals)

# 2. Kill all node processes
pkill -9 node

# 3. Stop MongoDB
brew services stop mongodb-community  # macOS
sudo systemctl stop mongod            # Linux

# 4. Clean install
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install

# 5. Start MongoDB
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux

# 6. Start backend
cd backend
npm run dev

# 7. Start frontend (new terminal)
cd frontend
npm start
```

## 📞 Getting Help

If you're still stuck:

1. Check the error message carefully
2. Google the exact error message
3. Check Stack Overflow
4. Review the README.md
5. Check the QUICK_START.md guide

## 🎯 Common Error Messages Decoded

| Error | Meaning | Solution |
|-------|---------|----------|
| EADDRINUSE | Port already in use | Kill process or change port |
| ECONNREFUSED | Can't connect to server | Start the server |
| MongooseServerSelectionError | Can't reach MongoDB | Start MongoDB |
| Cannot find module | Missing dependency | Run npm install |
| CORS error | Frontend can't reach backend | Check proxy setting |
| 404 Not Found | Wrong endpoint | Check URL and routes |
| 401 Unauthorized | No/invalid token | Login again |
| 500 Internal Server Error | Backend error | Check backend console |

---

**Remember:** Most issues are solved by:
1. Restarting servers
2. Checking if MongoDB is running
3. Reinstalling dependencies
4. Checking console for error messages
