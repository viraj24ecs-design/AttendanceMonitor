const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// MongoDB connection helper
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const connection = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedDb = connection;
  return connection;
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

// Validation middleware helper
async function validateRequest(req, validations) {
  await Promise.all(validations.map(validation => validation.run(req)));
  const errors = validationResult(req);
  return errors;
}

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

    // Validate request
    const validations = [
      body('username').notEmpty().withMessage('Username is required'),
      body('password').notEmpty().withMessage('Password is required'),
    ];

    const errors = await validateRequest(req, validations);
    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

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

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        rollNumber: user.rollNumber,
        lecturesAttended: user.lecturesAttended,
        totalLectures: user.totalLectures,
        attendancePercentage: user.attendancePercentage
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
