const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

// @route   POST api/auth/register
// @desc    Register a new user
// @access  Public
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('rollNumber').notEmpty().withMessage('Roll number is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, username, rollNumber, password } = req.body;

    try {
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

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
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
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
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

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '7d' },
        (err, token) => {
          if (err) throw err;
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
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  }
);

module.exports = router;
