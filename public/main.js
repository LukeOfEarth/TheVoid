const socket = io();

const mainSection = document.querySelector('.main');
const messageForm = document.querySelector('.message-form');

messageForm.addEventListener('submit', (e) => {
    sendMessage(e);
});

socket.on('message-received', message => {
    createMessage(message);
});

const createMessage = (message) => {
    let messageDiv = document.createElement('DIV');
    messageDiv.innerHTML = message;
    mainSection.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(), 3000);
}

const sendMessage = (e) => {
    e.preventDefault();
    const message = e.target.elements.messageInput.value;
    socket.emit('message-sent', message);
    e.target.elements.messageInput.value = '';
}