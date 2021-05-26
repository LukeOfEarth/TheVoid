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

    socket.emit('connect-received','You have connected!');

    socket.on('message-sent', (message) => {
        const pos = getRandomPositions();

        const payload = {
            messageText: message,
            positions: pos
        }

        socket.emit('message-received', payload);
        socket.broadcast.emit('message-received', payload);
    });
});

const getRandomPositions = () => {
    const x = Math.floor(Math.random(0,100)*90);
    const y = Math.floor(Math.random(0,100)*90);
    return {
        posX: x, 
        posY: y
    };
}

const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));