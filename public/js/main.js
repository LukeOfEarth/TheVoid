const socket = io();

const mainSection = document.querySelector('.main');
const messageForm = document.querySelector('.message-form');
const connectedText = document.getElementById('connection');

messageForm.addEventListener('submit', (e) => {
    sendMessage(e);
});

socket.on('message-received', payload => {
    createMessage(payload);
});

socket.on('connect-received', () => {
    connectedText.innerHTML = 'You have connected!'
    setTimeout(() => connectedText.innerHTML = '', 3000);
});

const createMessage = (payload) => {
    let messageDiv = document.createElement('div');
    messageDiv.style.top = `${payload.positions.posY}%`
    messageDiv.style.left = `${payload.positions.posX}%`
    messageDiv.innerHTML = `<p>${payload.messageText}</p>`;
    mainSection.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 5000);
}

const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.elements.messageInput.value;
    socket.emit('message-sent', message);
    e.target.elements.messageInput.value = '';
}