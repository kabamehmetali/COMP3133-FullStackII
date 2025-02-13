// backend/controllers/privateMessageController.js
const PrivateMessage = require('../models/PrivateMessage');

// CREATE
exports.createPrivateMessage = async (req, res) => {
  try {
    const { from_user, to_user, message } = req.body;
    const newMsg = new PrivateMessage({
      from_user,
      to_user,
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
exports.getAllPrivateMessages = async (req, res) => {
  try {
    const messages = await PrivateMessage.find().sort({ _id: -1 });
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// READ SINGLE
exports.getPrivateMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await PrivateMessage.findById(id);
    if (!message) {
      return res.status(404).json({ error: 'Private message not found' });
    }
    return res.status(200).json(message);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// UPDATE
exports.updatePrivateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;
    const updatedMessage = await PrivateMessage.findByIdAndUpdate(
      id,
      { message },
      { new: true }
    );
    if (!updatedMessage) {
      return res.status(404).json({ error: 'Private message not found' });
    }
    return res.status(200).json(updatedMessage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};

// DELETE
exports.deletePrivateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMessage = await PrivateMessage.findByIdAndDelete(id);
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Private message not found' });
    }
    return res.status(200).json({ message: 'Private message deleted' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
