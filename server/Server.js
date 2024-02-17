// Importing dependencies
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const cookieParser = require('cookie-parser');


// Importing modules
const socketHandler = require('./sockets/scoketHandler')

// Import Routes
const authRoutes = require('./routes/auth');
const channelRoutes = require('./routes/channelRouter');
const messageRoutes = require('./routes/messageRouter');
const privateChatRouter = require('./routes/privateChatRouter');
const serverInviteRouter = require('./routes/serverInviteRouter');
const serverRouter = require('./routes/serverRouter');
const userRouter = require('./routes/userRouter');
const userFriendRouter = require('./routes/userFriendRouter');

// Initializing express app and socket server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
        credentials: true
    }
));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100000 // TODO: DEPLOYMENT: 100
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// non jwt routes
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Server running...');
});

// jwt middleware
// app.use(authenticateToken);

// jwt routes
app.use('/api/channels', channelRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/privateChats', privateChatRouter);
app.use('/api/serverInvites', serverInviteRouter);
app.use('/api/servers', serverRouter);
app.use('/api/users', userRouter);
app.use('/api/userFriends', userFriendRouter);

socketHandler(io);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
