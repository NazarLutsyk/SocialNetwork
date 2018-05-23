let server = require('./www');
let io = require('socket.io')(server);
let Message = require('../models/Message');

io.on('connect', function (socket) {
    socket.on('message', async (message) => {
        let newMessage = await Message.create(message);
        newMessage = newMessage.toObject();
        newMessage.sender = message.sender;
        newMessage.chat = message.chat;
        socket.to(message.chat._id).send(newMessage);
    });
    socket.on('connectToRoom', (room) => {
        if (room && room._id) {
            socket.join(room._id);
        }
    });
    socket.on('leaveRoom', async (data) => {
        socket.leave(data.chat._id);
    });
    socket.on('disconnectFromRoom', (room) => {
        if (room && room._id) {
            socket.leave(room._id);
        }
    });
    socket.on('disconnect', () => {
    });
});


