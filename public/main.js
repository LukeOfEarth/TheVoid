const socket = io();

const mainSection = document.querySelector('.main');
const submitBtn = document.querySelector('.submit');

submitBtn.addEventListener('click', (e) => {
    sendMessage(e);
});

socket.on('message-received', message => {
    createMessage(message);
});

const createMessage = (message) => {
    let messageDiv = document.createElement('DIV');
    messageDiv.innerHTML = message;
    mainSection.appendChild(messageDiv);
    setTimeout(() => messageDiv.remove(),3000);
}

const sendMessage = (e) => {
    e.preventDefault();
    socket.emit('message-sent','some message');
}