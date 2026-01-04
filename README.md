# 🎓 Attendance Monitoring System

A modern MERN stack web application for tracking student attendance with a beautiful, user-friendly interface.

## ✨ Features

- **Secure Authentication**: Login and registration with bcrypt password hashing
- **User Management**: Store and manage student information (name, username, roll number)
- **Attendance Tracking**: Track lectures attended and calculate attendance percentage
- **Responsive Design**: Beautiful gradient UI with animations that works on all devices
- **MongoDB Integration**: Persistent data storage with MongoDB

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling with gradients and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas account)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Edit the .env file with your settings:
# - PORT: Server port (default: 5000)
# - MONGODB_URI: Your MongoDB connection string
# - JWT_SECRET: Your secret key for JWT tokens

# Start MongoDB (if using local installation)
# On macOS with Homebrew:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

The frontend application will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
Attendance Monitoring website/
├── backend/
│   ├── models/
│   │   └── User.js           # User schema
│   ├── routes/
│   │   └── auth.js           # Authentication routes
│   ├── .env                  # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js             # Express server
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── LandingPage.js      # Landing page
    │   │   ├── LandingPage.css
    │   │   ├── LoginModal.js       # Login modal
    │   │   ├── RegisterModal.js    # Registration modal
    │   │   ├── AuthModal.css       # Modal styles
    │   │   ├── Dashboard.js        # User dashboard
    │   │   └── Dashboard.css
    │   ├── App.js
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    ├── .gitignore
    └── package.json
```

## 🔐 MongoDB Schema

The User model includes the following fields:

```javascript
{
  name: String,              // Student's full name
  username: String,          // Unique username (lowercase)
  rollNumber: String,        // Unique roll number
  password: String,          // Hashed password
  lecturesAttended: Number,  // Number of lectures attended (default: 0)
  totalLectures: Number,     // Total lectures (default: 0)
  attendancePercentage: Number, // Calculated percentage (0-100)
  createdAt: Date           // Account creation date
}
```

## 🎯 API Endpoints

### Authentication

#### Register User
```
POST /api/auth/register
Body: {
  "name": "John Doe",
  "username": "johndoe",
  "rollNumber": "2024001",
  "password": "password123"
}
```

#### Login User
```
POST /api/auth/login
Body: {
  "username": "johndoe",
  "password": "password123"
}
```

## 🎨 Features Showcase

### Landing Page
- Animated gradient background
- Floating circles animation
- Centered Login/Sign Up buttons with hover effects
- Feature cards showcasing app capabilities
- Fully responsive design

### Authentication Modals
- Smooth slide-up animation
- Form validation
- Error handling with animated messages
- Easy switching between login and registration
- Password strength requirements

### Dashboard
- Welcome message with user info
- Statistics cards showing:
  - Lectures attended
  - Total lectures
  - Attendance percentage
- Gradient design matching the landing page
- Logout functionality

## 🔧 Configuration

### MongoDB Connection

**Local MongoDB:**
```
MONGODB_URI=mongodb://localhost:27017/attendance_monitoring
```

**MongoDB Atlas:**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/attendance_monitoring
```

### Environment Variables

Create or modify `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `brew services list` (macOS) or `sudo systemctl status mongod` (Linux)
- Check if the connection string in `.env` is correct
- For MongoDB Atlas, whitelist your IP address

### Port Already in Use
- Backend: Change PORT in `.env` file
- Frontend: Set PORT environment variable: `PORT=3001 npm start`

### CORS Issues
- Ensure the proxy is set correctly in `frontend/package.json`
- Check that the backend is running on the correct port

## 🚀 Future Enhancements

- [ ] Mark attendance for specific lectures
- [ ] View attendance history
- [ ] Export attendance reports
- [ ] Subject-wise attendance tracking
- [ ] Email notifications for low attendance
- [ ] Admin panel for teachers
- [ ] Bulk attendance marking
- [ ] Calendar view for attendance

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Development

### Running in Development Mode

**Backend:**
```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

**Frontend:**
```bash
cd frontend
npm start    # React development server with hot reload
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📧 Contact

For any questions or suggestions, please feel free to reach out.

---

Made with ❤️ using MERN Stack
# AttendanceMonitor
