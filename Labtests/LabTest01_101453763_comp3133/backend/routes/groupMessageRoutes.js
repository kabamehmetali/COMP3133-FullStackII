// backend/routes/groupMessageRoutes.js
const express = require('express');
const router = express.Router();
const {
  createGroupMessage,
  getAllGroupMessages,
  getGroupMessageById,
  updateGroupMessage,
  deleteGroupMessage,
} = require('../controllers/groupMessageController');

// CREATE
router.post('/', createGroupMessage);

// READ ALL
router.get('/', getAllGroupMessages);

// READ SINGLE
router.get('/:id', getGroupMessageById);

// UPDATE
router.put('/:id', updateGroupMessage);

// DELETE
router.delete('/:id', deleteGroupMessage);

module.exports = router;
