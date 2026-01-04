const mongoose = require('mongoose');

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

// Method to calculate attendance percentage
userSchema.methods.calculateAttendance = function() {
  if (this.totalLectures === 0) {
    this.attendancePercentage = 0;
  } else {
    this.attendancePercentage = ((this.lecturesAttended / this.totalLectures) * 100).toFixed(2);
  }
  return this.attendancePercentage;
};

module.exports = mongoose.model('User', userSchema);
