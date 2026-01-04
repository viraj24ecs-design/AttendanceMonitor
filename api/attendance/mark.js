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
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST' && req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectToDatabase();

    const { userId, day, timeSlot, status } = req.body;

    if (!userId || !day || !timeSlot || !status) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (!['attended', 'bunked', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find existing record for this lecture
    const existingRecordIndex = user.attendanceRecords.findIndex(
      record => record.day === day && record.timeSlot === timeSlot
    );

    let oldStatus = null;
    if (existingRecordIndex !== -1) {
      oldStatus = user.attendanceRecords[existingRecordIndex].status;
      // Update existing record
      user.attendanceRecords[existingRecordIndex].status = status;
      user.attendanceRecords[existingRecordIndex].markedAt = new Date();
    } else {
      // Add new record
      user.attendanceRecords.push({
        day,
        timeSlot,
        status,
        markedAt: new Date()
      });
    }

    // Recalculate attendance statistics
    const attendedCount = user.attendanceRecords.filter(r => r.status === 'attended').length;
    const bunkedCount = user.attendanceRecords.filter(r => r.status === 'bunked').length;
    const totalCount = attendedCount + bunkedCount;

    user.lecturesAttended = attendedCount;
    user.totalLectures = totalCount;
    user.attendancePercentage = totalCount > 0 ? ((attendedCount / totalCount) * 100).toFixed(2) : 0;

    await user.save();

    res.status(200).json({
      message: 'Attendance marked successfully',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        rollNumber: user.rollNumber,
        lecturesAttended: user.lecturesAttended,
        totalLectures: user.totalLectures,
        attendancePercentage: user.attendancePercentage,
        attendanceRecords: user.attendanceRecords
      }
    });
  } catch (err) {
    console.error('Mark attendance error:', err);
    res.status(500).json({ 
      message: 'Server error. Please try again later.',
      error: err.message
    });
  }
};
