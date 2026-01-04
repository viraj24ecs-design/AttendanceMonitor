const mongoose = require('mongoose');

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
  name: String,
  username: String,
  rollNumber: String,
  password: String,
  lecturesAttended: { type: Number, default: 0 },
  totalLectures: { type: Number, default: 0 },
  attendancePercentage: { type: Number, default: 0 },
  attendanceRecords: [{
    day: String,
    timeSlot: String,
    status: String,
    markedAt: Date
  }],
  createdAt: Date
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        rollNumber: user.rollNumber,
        lecturesAttended: user.lecturesAttended,
        totalLectures: user.totalLectures,
        attendancePercentage: user.attendancePercentage,
        attendanceRecords: user.attendanceRecords || []
      }
    });
  } catch (err) {
    console.error('Get user error:', err);
    res.status(500).json({ 
      message: 'Server error. Please try again later.',
      error: err.message
    });
  }
};
