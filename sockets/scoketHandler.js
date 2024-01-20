const socketHandler = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('new message', async (data) => {
            io.emit('message', data.message); 
        });
    });
};

module.exports = socketHandler;
