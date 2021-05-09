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
        console.log(message);
    });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));