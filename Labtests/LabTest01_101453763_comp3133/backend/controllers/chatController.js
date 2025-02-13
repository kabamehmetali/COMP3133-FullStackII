// backend/controllers/chatController.js
const GroupMessage = require('../models/GroupMessage');
const PrivateMessage = require('../models/PrivateMessage');

// Example: Hard-coded rooms (or you can keep them in DB)
const availableRooms = ['devops', 'cloud computing', 'covid19', 'sports', 'nodeJS'];

exports.getAvailableRooms = (req, res) => {
  // Return the predefined list of rooms
  return res.status(200).json({ rooms: availableRooms });
};

// Store group message in DB
exports.addMessageToRoom = async (data) => {
  try {
    const newGroupMsg = new GroupMessage({
      from_user: data.from_user,
      room: data.room,
      message: data.message,
      date_sent: data.date_sent,
    });
    await newGroupMsg.save();
  } catch (error) {
    console.error('Error saving group message:', error);
  }
};

// Store private message in DB
exports.addPrivateMessage = async (data) => {
  try {
    const newPrivateMsg = new PrivateMessage({
      from_user: data.from_user,
      to_user: data.to_user,
      message: data.message,
      date_sent: data.date_sent,
    });
    await newPrivateMsg.save();
  } catch (error) {
    console.error('Error saving private message:', error);
  }
};

// Get messages for a given room
exports.getMessagesForRoom = async (req, res) => {
  try {
    const { room } = req.params;
    const messages = await GroupMessage.find({ room }).sort({ _id: 1 }); // sort ascending
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching room messages:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// Get private messages (for a given user)
exports.getPrivateMessages = async (req, res) => {
  try {
    const { username } = req.params;
    // Return private messages either sent to or from this user
    const messages = await PrivateMessage.find({
      $or: [{ from_user: username }, { to_user: username }],
    }).sort({ _id: 1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching private messages:', error);
    return res.status(500).json({ error: 'Server error' });
  }
};
