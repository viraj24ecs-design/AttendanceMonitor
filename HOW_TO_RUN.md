# 🚀 HOW TO RUN - Simple Guide

## ⚡ The Fastest Way to Start

### Step 1: Install MongoDB (One-time only)

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux (Ubuntu/Debian):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

**OR use MongoDB Atlas (Cloud - No installation needed):**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `backend/.env` with your connection string

### Step 2: Start MongoDB

**macOS:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

**Manual (any OS):**
```bash
mongod --dbpath ~/data/db
```

### Step 3: Open Two Terminals

**Terminal 1 - Backend:**
```bash
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/backend"
npm run dev
```

Wait for: `✅ MongoDB connected successfully` and `🚀 Server is running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/frontend"
npm start
```

Your browser will automatically open to http://localhost:3000

### Step 4: Use the Application!

1. You'll see the landing page
2. Click **Sign Up** to create an account
3. Fill in your details
4. You'll be automatically logged in and see your dashboard

---

## 🎯 First Time? Run This:

```bash
# 1. Install backend dependencies
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/backend"
npm install

# 2. Install frontend dependencies
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/frontend"
npm install

# 3. Start MongoDB (macOS)
brew services start mongodb-community

# 4. Now follow Step 3 above (open two terminals)
```

---

## 🎬 Complete Command Sequence (Copy & Paste)

### For macOS:

```bash
# Start MongoDB
brew services start mongodb-community

# Terminal 1 - Backend (run this in first terminal)
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/backend" && npm run dev

# Terminal 2 - Frontend (run this in second terminal)
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/frontend" && npm start
```

---

## ✅ What You Should See

### Backend Terminal:
```
[nodemon] starting `node server.js`
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

### Frontend Terminal:
```
Compiled successfully!

You can now view attendance-monitoring-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Browser:
- Opens automatically to http://localhost:3000
- Shows beautiful landing page with Login/Sign Up buttons

---

## 🛑 To Stop

1. Press `Ctrl + C` in both terminals
2. Optionally stop MongoDB:
   ```bash
   brew services stop mongodb-community  # macOS
   sudo systemctl stop mongod            # Linux
   ```

---

## 🔄 Next Time You Want to Run

Just repeat Step 2 and Step 3:

```bash
# Terminal 1
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/backend"
npm run dev

# Terminal 2  
cd "/Users/bruisedknuckles/Desktop/Attendance Monitoring website/frontend"
npm start
```

That's it! 🎉

---

## ⚠️ Quick Troubleshooting

**Problem:** Port 5000 already in use
```bash
lsof -ti:5000 | xargs kill -9
```

**Problem:** Port 3000 already in use
```bash
lsof -ti:3000 | xargs kill -9
```

**Problem:** MongoDB won't connect
```bash
# Check if running
pgrep mongod

# Start it
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

**Problem:** Module not found errors
```bash
cd backend
npm install

cd frontend  
npm install
```

---

## 🎨 Using the App

### Create Account:
1. Click "Sign Up"
2. Enter:
   - Name: Your Full Name
   - Username: your username (any)
   - Roll Number: Your Roll Number
   - Password: minimum 6 characters
3. Click "Sign Up"

### Login:
1. Click "Login"
2. Enter username and password
3. Click "Login"

### Dashboard:
- View your attendance stats
- See lectures attended
- Check attendance percentage
- Logout when done

---

## 🎯 URLs to Remember

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **API Health Check:** http://localhost:5000/api/auth

---

## 📱 Tips

✅ Keep both terminals open while using the app
✅ Backend must be running for login/signup to work
✅ Don't close MongoDB while the app is running
✅ Clear browser cache if styles don't load
✅ Use incognito mode to test with fresh session

---

**That's all! Enjoy your Attendance Monitoring System! 🎓**
