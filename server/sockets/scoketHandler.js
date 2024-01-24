const {createPrivateMessage, deletePrivateMessage} = require('../api/privateChatModel');
const {createMessage, deleteMessage} = require('../api/messageModel'); 
const {checkAuth, roomFinder} = require('./socketHelper');


const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        let isAuthenticated = false;
        let user = null;
        let userSockets = {};

        // Authentication
        socket.on('auth', async (token) => {
            console.log('auth: ' + token);
            user = await checkAuth(token);
            if (user !== false) {
                isAuthenticated = true;
                socket.emit('auth', {status: 'ok'});
                console.log('Authentication successful');
                userSockets[user.user_id] = socket.id;
            } else {
                socket.emit('auth', {status: 'error'});
                socket.disconnect();
                console.log('Authentication failed');
            }
        });

        socket.on('join room', (roomId, roomType) => {
            if (!isAuthenticated) {
                console.log('Join room attempt before authentication');
                socket.emit('error', 'Authentication required');
                return;
            }

            let room = roomFinder(roomId, roomType);
            if (room !== false) {
                socket.join(roomId);
                console.log(`User joined room: ${roomId}`);
            } else {
                console.log(`Invalid room ID: ${roomId}`);
                socket.emit('error', 'Invalid room ID');
            }
        });

        socket.on('message', (msg, roomId) => {
            if (!isAuthenticated) {
                console.log('Message attempt before authentication');
                return;
            }

            if (socket.rooms.has(roomId)) {
                io.to(roomId).emit('message', msg);
                // TODO: database insert
                if (room.roomtype === 'private') {
                    createPrivateMessage(roomId, user.id, msg);
                } else {
                    createMessage(roomId, user.id, msg);
                }
            }
        });

        socket.on('delete message', (msgId, roomId) => {
            if (!isAuthenticated) {
                console.log('Delete message attempt before authentication');
                return;
            }

            if (socket.rooms.has(roomId)) {
                io.to(roomId).emit('delete message', msgId);
                if (room.roomtype === 'private') {
                    deletePrivateMessage(msgId);
                } else {
                    deleteMessage(msgId);
                }
            }
        });

        socket.on('send friend request', (friendId) => {
            if (!isAuthenticated) {
                console.log('Send friend request attempt before authentication');
                return;
            }
            if (userSockets[friendId]) {
                io.to(userSockets[friendId]).emit('friend request', user.user_id);
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            if (isAuthenticated) {
                delete userSockets[user.user_id];
            }
        });
    });
};

module.exports = socketHandler;
