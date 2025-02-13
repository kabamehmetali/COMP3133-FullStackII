// backend/routes/privateMessageRoutes.js
const express = require('express');
const router = express.Router();
const {
  createPrivateMessage,
  getAllPrivateMessages,
  getPrivateMessageById,
  updatePrivateMessage,
  deletePrivateMessage,
} = require('../controllers/privateMessageController');

// CREATE
router.post('/', createPrivateMessage);

// READ ALL
router.get('/', getAllPrivateMessages);

// READ SINGLE
router.get('/:id', getPrivateMessageById);

// UPDATE
router.put('/:id', updatePrivateMessage);

// DELETE
router.delete('/:id', deletePrivateMessage);

module.exports = router;
