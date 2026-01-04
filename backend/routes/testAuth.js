const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route   POST api/auth/create-test-user
// @desc    Create a test user for local development
// @access  Public (only for development)
router.post('/create-test-user', async (req, res) => {
  try {
    // Check if test user already exists
    let user = await User.findOne({ username: 'testuser' });

    if (user) {
      // Test user exists, return their credentials
      const payload = {
        user: {
          id: user.id,
          username: user.username,
          rollNumber: user.rollNumber
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
          res.json({
            message: 'Test user already exists. Logged in.',
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
            credentials: {
              username: 'testuser',
              password: 'test123'
            }
          });
        }
      );
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);

    // Create new test user
    user = new User({
      name: 'Test User',
      username: 'testuser',
      rollNumber: 'TEST001',
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

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({
          message: 'Test user created successfully',
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
          credentials: {
            username: 'testuser',
            password: 'test123'
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
