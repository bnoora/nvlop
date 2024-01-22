const {getUserByToken, checkTokenValid} = require('../database/userTokenModel');
const {createPrivateMessage, deletePrivateMessage} = require('../database/privateChatModel');
const {getChannelById } = require('../database/channelModel');
const {createMessage, deleteMessage} = require('../database/messageModel'); 


const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        let isAuthenticated = false;
        let user = null;

        // Authentication
        socket.on('auth', async (token) => {
            console.log('auth: ' + token);
            user = await checkAuth(token);
            if (user !== false) {
                isAuthenticated = true;
                socket.emit('auth', {status: 'ok'});
                console.log('Authentication successful');
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

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

async function checkAuth(token) {
    const validity = await checkTokenValid(token);
    if (validity === true) {
        const user = await getUserByToken(token);
        return user || false;
    } else {
        return false;
    }
}

function roomFinder(roomId, roomType) {
    let room = null;
    if (roomType === 'private') {
        room = getPrivateChannelById(roomId);
    } else {
        room = getChannelById(roomId);
    }
    return room || false;
}

module.exports = socketHandler;
