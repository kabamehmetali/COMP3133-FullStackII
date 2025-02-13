// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();

const {
  getAvailableRooms,
  getMessagesForRoom,
  getPrivateMessages,
} = require('../controllers/chatController');

const { protect } = require('../middleware/authMiddleware');

// All of these routes now require a valid JWT
router.get('/rooms', protect, getAvailableRooms);
router.get('/room-messages/:room', protect, getMessagesForRoom);
router.get('/private-messages/:username', protect, getPrivateMessages);

module.exports = router;
