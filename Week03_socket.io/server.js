// const express = require('express');
// const socketio = require('socket.io');
// const SERVER_PORT = process.env.SERVER_PORT || 3000;

// const app = express();

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/views/client.html')
// });


// const server = app.listen(SERVER_PORT, ()=> {
//     console.log(`Server running on http://localhost:${SERVER_PORT}`);
// })

// let ioServer = socketio(server);

// ioServer.on('connection',(socket) => {
//     console.log('Connection received');
//     console.log(`Connection Socket ID: ${socket.id} received`);
//     socket.on('disconnect', ()=>{
//         console.log(`Client Disconnected: ${socket.id}`);
//     });

//     socket.on('hello', (msg)=> {
//         console.log(`Hello from ${msg}`);
//     });
// })
const express = require('express')
const socketio = require('socket.io')

const SERVER_PORT = proccess.env.PORT || 3000

const app = express()

// app.use(express.static('views'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/client.html' )
})

const server = app.listen(SERVER_PORT, () => {
    console.log(`Server running on http://loocalhost:${SERVER_PORT}/`)
})

let ioServer = socketio(server)

ioServer.on('connection', (socket) => {
    console.log('Connection received')
    console.log(`Client Socket ID: ${socket.id}`)

    socket.on('disconnect', ()=>{
        console.log(`Client Disconected: ${socket.id}`)
    })

    socket.on('hello', (msg) => {
        console.log(`Hello from : ${msg}`)
    })
})