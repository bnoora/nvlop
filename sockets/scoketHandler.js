const socketIO = require('socket.io');


const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');

        let isAuthenticated = false;
        let userId = null;

        // Authentication
        socket.on('auth', async (token) => {
            console.log('auth: ' + token);
            const auth = await checkAuth(token);
            if (auth) {
                isAuthenticated = true;
                // TODO: Get user ID from token
                userId = 1;
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
                    // insert into private ch
                } else {
                    // insert into public ch
                }
            }
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
};

async function checkAuth(token) {
    // Return true if authentication succeeds, false otherwise
    return true; // Placeholder
}

function roomFinder(roomId, roomType) {
    // TODO: get channels from database
    const predefinedRoomIds = [
        {id: 'room1', roomtype: 'private'},
        {id: 'room2', roomtype: 'public'},
        {id: 'room3', roomtype: 'private'}
    ];

    const room = predefinedRoomIds.find((room) => {
        return room.id === roomId && room.roomtype === roomType;
    });
    return room || false;
}

module.exports = socketHandler;
