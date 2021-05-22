const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    console.log('New connection...');

    socket.emit('message-received','You have connected!');

    socket.on('message-sent', (message) => {
        socket.emit('message-received', message);
        socket.broadcast.emit('message-received', message);
    });
});

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));