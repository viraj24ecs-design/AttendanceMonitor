const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// MongoDB connection helper
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    });

    cachedDb = connection;
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// User Schema (inline for serverless)
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    trim: true,
    lowercase: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  lecturesAttended: {
    type: Number,
    default: 0,
    min: 0
  },
  totalLectures: {
    type: Number,
    default: 0,
    min: 0
  },
  attendancePercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.calculateAttendance = function() {
  if (this.totalLectures === 0) {
    this.attendancePercentage = 0;
  } else {
    this.attendancePercentage = ((this.lecturesAttended / this.totalLectures) * 100).toFixed(2);
  }
  return this.attendancePercentage;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Connect to database
    await connectToDatabase();

    // Simple validation (no express-validator needed)
    const { name, username, rollNumber, password } = req.body;

    const errors = [];
    if (!name || name.trim() === '') errors.push({ field: 'name', message: 'Name is required' });
    if (!username || username.trim() === '') errors.push({ field: 'username', message: 'Username is required' });
    if (!rollNumber || rollNumber.trim() === '') errors.push({ field: 'rollNumber', message: 'Roll number is required' });
    if (!password || password.length < 6) errors.push({ field: 'password', message: 'Password must be at least 6 characters long' });

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation failed', errors });
    }

    // Check if user already exists
    let user = await User.findOne({ 
      $or: [{ username: username.toLowerCase() }, { rollNumber }] 
    });

    if (user) {
      return res.status(400).json({ 
        message: 'User with this username or roll number already exists' 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
      name,
      username: username.toLowerCase(),
      rollNumber,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        rollNumber: user.rollNumber
      },
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        rollNumber: user.rollNumber,
        attendancePercentage: user.attendancePercentage
      },
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ 
      message: 'Server error. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
