const {checkAuth, roomFinder, checkAllowedToDelete, checkAllowedToJoinRoom} = require('./socketHelper');


let userSockets = {};

const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        let isAuthenticated = false;

        // Authentication
        socket.on('auth', async (token) => {
            console.log('Attempting auth with token:', token);
            const user = await checkAuth(token);
            if (user) {
                console.log('Authentication successful for user:', user.userId);
                userSockets[user.userId] = socket.id;
                socket.emit('auth', { status: 'ok', user: user });
                

            } else {
                console.log('Authentication failed');
                socket.emit('auth', { status: 'error', message: 'Authentication failed' });
                socket.disconnect(true); // Forcefully disconnect on failed authentication
            }
        });

        socket.on('join room', (roomId, roomType, userId) => {
            const isAllowed = checkAllowedToJoinRoom(roomId, roomType, userId);

            if (isAllowed) {
                let room = roomFinder(roomId, roomType);
                if (room !== false) {
                    socket.join(roomId);
                    console.log(`User joined room: ${roomId}`);
                } else {
                    console.log(`Invalid room ID: ${roomId}`);
                    socket.emit('error', 'Invalid room ID');
                }
            }
            else
            {
                console.log(`User not allowed to join room: ${roomId}`);
                socket.emit('error', 'Not allowed to join room');
            }
        });

        socket.on('message', (msg, roomId) => {
            if (socket.rooms.has(roomId)) {
                io.to(roomId).emit('message', msg);
            }
        });

        socket.on('delete message', (msgId, roomId, userID) => {
            const allowed = checkAllowedToDelete(msgId, roomId, userID);
            if (allowed) {
                io.to(roomId).emit('delete message', msgId);
            }
        });

        socket.on('send friend request', (friendId) => {
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
