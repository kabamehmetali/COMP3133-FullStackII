const express = require('express');
const socketio = require('socket.io');

const app = express();
const SERVER_PORT = 3000;

// Serve static files from the "views" directory (for the HTML files)
app.use(express.static(__dirname + '/views'));

const server = app.listen(SERVER_PORT, () => {
    console.log(`Chat Server running on http://localhost:${SERVER_PORT}`);
});

// Route for a regular chat page (if needed)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});

// Route for the group chat page
app.get('/group', (req, res) => {
    res.sendFile(__dirname + '/views/groupchat.html');
});

const io = socketio(server);

io.on('connection', (socket) => {
    console.log(`New Socket ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`User disconnected ${socket.id}`);
    });
    
    socket.on('message', (data) => {
        console.log(`Message From ${socket.id}: ${data}`);
    });

    // Broadcast a chat message to all connected sockets
    socket.on('chat_message', (data) => {
        data.clientId = socket.id;
        console.log('Chat message:', JSON.stringify(data));
        io.emit('chat_message', data);
    });

    // Join a group (room)
    socket.on('join_group', (roomName) => {
        console.log(`User ${socket.id} joined room ${roomName}`);
        socket.join(roomName);
    });
    
    // Leave a group (room)
    socket.on('leave_group', (roomName) => {
        console.log(`User ${socket.id} left room ${roomName}`);
        socket.leave(roomName);
    });

    // Handle a group message and emit to everyone in that group
    socket.on('group_message', (data) => {
        data.clientId = socket.id;
        console.log('Group message:', JSON.stringify(data));
        io.to(data.group).emit('group_message', data);
    });
});
