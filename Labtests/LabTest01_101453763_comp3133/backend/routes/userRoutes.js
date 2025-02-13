// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // for JWT protection

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  logoutUser,
} = require('../controllers/userController');

// CREATE
router.post('/', createUser);

// READ ALL
router.get('/', getAllUsers);

// READ SINGLE
router.get('/:id', getUserById);

// UPDATE
router.put('/:id', updateUser);

// DELETE
router.delete('/:id', deleteUser);

// LOGOUT
router.post('/logout', protect, logoutUser);

module.exports = router;
