// backend/server.js

require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');

const connectDB = require('./config/db');

// Import API route files
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const userRoutes = require('./routes/userRoutes');
const groupMessageRoutes = require('./routes/groupMessageRoutes');
const privateMessageRoutes = require('./routes/privateMessageRoutes');

const app = express();

// 1) Use CORS **once**, with the config you want
//    Make sure this is BEFORE routes.
app.use(cors({
  origin: 'http://localhost:3000', // your React app's origin
  credentials: true,
}));

// 2) JSON parsing middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 3) Connect to MongoDB
connectDB();

// 4) Define your API routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/users', userRoutes);
app.use('/api/group-messages', groupMessageRoutes);
app.use('/api/private-messages', privateMessageRoutes);

// 5) Create HTTP server & Socket.io
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000', // or '*'
    methods: ['GET', 'POST'],
  },
});

// 6) Socket.io logic
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);

    // Notify others in the room
    socket.to(room).emit('message', {
      from_user: 'System',
      message: `${username} has joined the room.`,
      date_sent: new Date().toLocaleString(),
    });
  });

  socket.on('leaveRoom', ({ username, room }) => {
    socket.leave(room);
    console.log(`${username} left room: ${room}`);

    socket.to(room).emit('message', {
      from_user: 'System',
      message: `${username} has left the room.`,
      date_sent: new Date().toLocaleString(),
    });
  });

  socket.on('groupMessage', async ({ from_user, room, message }) => {
    const msgData = {
      from_user,
      room,
      message,
      date_sent: new Date().toLocaleString(),
    };
    // TODO: Optionally save to DB with your chatController
    // await addMessageToRoom(msgData);

    // Emit to everyone in the room
    io.to(room).emit('message', msgData);
  });

  socket.on('privateMessage', async ({ from_user, to_user, message }) => {
    const msgData = {
      from_user,
      to_user,
      message,
      date_sent: new Date().toLocaleString(),
    };
    // TODO: Optionally save to DB
    // await addPrivateMessage(msgData);

    // For real production, you’d find `to_user`'s socket and emit directly.
    socket.emit('privateMessage', msgData);
  });

  socket.on('typing', ({ from_user, room, to_user }) => {
    if (room) {
      socket.to(room).emit('typing', { from_user });
    } else if (to_user) {
      // In real app, get that user’s socket ID
      socket.emit('typing', { from_user });
    }
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// 7) Start server
const PORT = process.env.PORT || 6000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
