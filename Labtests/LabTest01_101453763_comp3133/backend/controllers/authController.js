// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signupUser = async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });
    await newUser.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid username or password' });
    }

    // Create a JWT token
    // Use a secret from your .env if possible, e.g. process.env.JWT_SECRET
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET || 'secret_key', // fallback if not set in .env
      { expiresIn: '1h' }
    );

    // Return the token + some user info
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
