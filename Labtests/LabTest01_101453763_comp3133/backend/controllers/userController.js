// backend/controllers/userController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');

// CREATE User
exports.createUser = async (req, res) => {
  try {
    const { username, firstname, lastname, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = new User({
      username,
      firstname,
      lastname,
      password: hashedPassword,
    });

    await newUser.save();
    return res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ created_on: -1 });
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET Single User by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('-password'); // remove password field
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE User by ID
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, password } = req.body;

    let updateData = { firstname, lastname };
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE User by ID
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};

/**
 * Logout User
 * This can be used for blacklisting tokens or performing any logout-related logic.
 * Typically, the client should just remove the JWT, but you can do extra logic here if desired.
 */
exports.logoutUser = async (req, res) => {
  try {
    // Optionally: add the token to a blacklist, or perform other cleanup
    // e.g., store the current token in a DB or memory store so it can’t be reused
    
    return res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
};
