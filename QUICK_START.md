# 🚀 Quick Start Guide

## Prerequisites Check

Before starting, make sure you have:

1. ✅ **Node.js installed** (v14 or higher)
   - Check: `node --version`
   - Download from: https://nodejs.org/

2. ✅ **MongoDB installed and running**
   - Check if running: `pgrep mongod` (should return a process ID)
   - Install on macOS: `brew install mongodb-community`
   - Install on Linux: Follow MongoDB docs
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## 🎯 Option 1: Quick Start (Automated)

### Step 1: Start MongoDB (if not already running)

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Or start MongoDB manually:**
```bash
mongod --dbpath /path/to/your/data/directory
```

### Step 2: Run the Application

From the project root directory:
```bash
./start.sh
```

This will automatically:
- Start the backend server on http://localhost:5000
- Start the frontend server on http://localhost:3000
- Open your browser automatically

## 🛠️ Option 2: Manual Start

### Terminal 1 - Backend

```bash
# Navigate to backend
cd backend

# Start the server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

### Terminal 2 - Frontend

```bash
# Navigate to frontend
cd frontend

# Start React app
npm start
```

Your browser should open automatically to http://localhost:3000

## 📱 Using the Application

### 1. **Landing Page**
   - You'll see an attractive landing page with animated background
   - Two main buttons: **Login** and **Sign Up**

### 2. **Create an Account (First Time Users)**
   - Click **Sign Up**
   - Fill in the registration form:
     - Full Name (e.g., "John Doe")
     - Username (e.g., "johndoe" - will be lowercase)
     - Roll Number (e.g., "2024001")
     - Password (minimum 6 characters)
     - Confirm Password
   - Click **Sign Up**
   - You'll be automatically logged in and redirected to the dashboard

### 3. **Login (Returning Users)**
   - Click **Login**
   - Enter your username and password
   - Click **Login**
   - You'll be redirected to your dashboard

### 4. **Dashboard**
   - View your profile information
   - See your attendance statistics:
     - Lectures Attended
     - Total Lectures
     - Attendance Percentage
   - Click **Logout** to return to the landing page

## 🔧 Configuration

### MongoDB Connection String

The default configuration uses a local MongoDB instance:
```
mongodb://localhost:27017/attendance_monitoring
```

If you want to use **MongoDB Atlas** (cloud):

1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get your connection string
4. Update `backend/.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance_monitoring
   ```

### Ports

Default ports:
- **Backend:** 5000
- **Frontend:** 3000

To change the backend port, edit `backend/.env`:
```env
PORT=5001
```

To change the frontend port:
```bash
PORT=3001 npm start
```

## 🐛 Troubleshooting

### Problem: "MongoDB connection error"

**Solution:**
1. Check if MongoDB is running:
   ```bash
   # macOS
   brew services list
   
   # Linux
   sudo systemctl status mongod
   ```

2. Start MongoDB if it's not running:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   ```

### Problem: "Port 5000 already in use"

**Solution:**
1. Find and kill the process using port 5000:
   ```bash
   lsof -ti:5000 | xargs kill -9
   ```

2. Or change the port in `backend/.env`

### Problem: "Port 3000 already in use"

**Solution:**
- When prompted, type 'y' to run on a different port
- Or kill the process: `lsof -ti:3000 | xargs kill -9`

### Problem: "Cannot POST /api/auth/register" or CORS errors

**Solution:**
- Make sure the backend server is running
- Check that `proxy` is set in `frontend/package.json`:
  ```json
  "proxy": "http://localhost:5000"
  ```

### Problem: Dependencies not installed

**Solution:**
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

## 📊 Testing the Application

### Test Registration:
1. Go to http://localhost:3000
2. Click "Sign Up"
3. Enter test data:
   - Name: Test User
   - Username: testuser
   - Roll Number: TEST001
   - Password: test123
4. Submit

### Test Login:
1. Click "Login"
2. Enter:
   - Username: testuser
   - Password: test123
3. Submit

### View in MongoDB:

```bash
# Connect to MongoDB shell
mongosh

# Switch to database
use attendance_monitoring

# View users
db.users.find().pretty()
```

## 🎨 Features Demonstrated

✅ **Landing Page:**
- Gradient background with floating animations
- Responsive design
- Smooth transitions

✅ **Authentication:**
- Secure registration with bcrypt
- JWT token-based authentication
- Form validation
- Error handling

✅ **Dashboard:**
- User information display
- Attendance statistics
- Protected route (requires login)
- Logout functionality

## 🚀 Next Steps

Now that your basic system is working, you can:

1. **Add Attendance Tracking:**
   - Create API endpoints to mark attendance
   - Add buttons to increment lectures
   - Calculate percentages automatically

2. **Add More Features:**
   - View attendance history
   - Subject-wise tracking
   - Export reports
   - Email notifications

3. **Deploy:**
   - Backend: Heroku, Railway, or Render
   - Frontend: Vercel, Netlify, or GitHub Pages
   - Database: MongoDB Atlas

## 📞 Need Help?

If you encounter any issues:

1. Check the browser console for errors (F12)
2. Check the backend terminal for error messages
3. Verify MongoDB is running
4. Make sure all dependencies are installed
5. Check that both servers are running

## 🎉 Success Indicators

You know everything is working when:

- ✅ Backend shows: "MongoDB connected successfully" and "Server is running on port 5000"
- ✅ Frontend opens at http://localhost:3000
- ✅ You can see the landing page with animations
- ✅ You can register a new user
- ✅ You can login with the created user
- ✅ You're redirected to the dashboard after login
- ✅ The dashboard shows your information

---

**Congratulations! Your Attendance Monitoring System is ready! 🎊**
