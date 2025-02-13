// backend/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use your own MongoDB connection string or environment variable
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/chat_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Stop the app if we can't connect to DB
  }
};

module.exports = connectDB;
