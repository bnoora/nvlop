// Importing dependencies
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const cors = require('cors');
const expressSession = require('express-session');
const passport = require('passport');

// Importing modules
const socketHandler = require('./sockets/socketHandler');
const initializePassport = require('./config/passportConfig');

// Import Routes
const authRoutes = require('./routes/auth');

// Initializing express app and socket server
const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

// Middleware
initializePassport();
app.use(expressSession({ 
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(helmet());
app.use(cors(
    {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST']
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Chat server running...');
});

socketHandler(io);

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
