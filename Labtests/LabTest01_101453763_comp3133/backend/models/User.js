// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // ensure unique usernames
    trim: true,
  },
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_on: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
