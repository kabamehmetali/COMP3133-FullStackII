// backend/controllers/groupMessageController.js
const GroupMessage = require('../models/GroupMessage');

// CREATE
exports.createGroupMessage = async (req, res) => {
  try {
    const { from_user, room, message } = req.body;
    const newMsg = new GroupMessage({
      from_user,
      room,
      message,
      date_sent: new Date().toLocaleString(),
    });
    await newMsg.save();
    return res.status(201).json(newMsg);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// READ ALL
exports.getAllGroupMessages = async (req, res) => {
  try {
    const messages = await GroupMessage.find().sort({ _id: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// READ SINGLE
exports.getGroupMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await GroupMessage.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Group message not found' });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE
exports.updateGroupMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const updatedMessage = await GroupMessage.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Group message not found' });
    }
    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE
exports.deleteGroupMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await GroupMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Group message not found' });
    }
    return res.status(200).json({ message: 'Group message deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
