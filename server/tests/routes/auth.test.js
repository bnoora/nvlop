const request = require('supertest');
const express = require('express');
const {createUser, getUserByUsername, getUserById} = require('../../api/userModel');
const generateWebToken = require('../../config/tokenGenerator');
const checkLogin = require('../../config/checkLogin');
const authRouter = require('../../routes/auth');

jest.mock('../../api/userModel');
jest.mock('../../config/tokenGenerator');
jest.mock('../../config/checkLogin');

const app = express();
app.use(express.json());
app.use('/', authRouter);

describe('authRouter tests', () => {
    it('should create a user', async () => {
        const mockUser = {username: 'test', password: 'test', email: 'test'};
        createUser.mockResolvedValue(mockUser);
        generateWebToken.mockResolvedValue(1);


        const res = await request(app)
            .post('/register')
            .send(mockUser);
        
        expect(res.statusCode).toEqual(200);
        const returnUser = { username: mockUser.username, email: mockUser.email,};
        console.log(res.body);
        expect(res.body).toEqual({ message: 'Registration successful', user: returnUser , token: 1});
        console.log(res.body);
    });

    it('Should login a user', async () => {
        const mockUser = {username: 'test', password: 'test', email: 'test'};
        generateWebToken.mockResolvedValue(1);
        checkLogin.mockResolvedValue({success: true, user: mockUser});

        const res = await request(app)
            .post('/login')
            .send(mockUser);
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Login successful', user: mockUser , token: 1});
    });

    it('Should fail to login a user', async () => {
        const mockUser = {username: 'test', password: 'test', email: 'test'};
        generateWebToken.mockResolvedValue(1);
        checkLogin.mockResolvedValue({success: false});
        
        const res = await request(app)
            .post('/login')
            .send({username: 'test', password: 'wrong', email: 'test'});
        
        expect(res.statusCode).toEqual(500);
        expect(res.body).toEqual({ error: undefined, message: 'Login failed'});
    }
    );

    it('Should login a user cookie version', async () => {
        const mockUser = {username: 'test', email: 'test'};
        getUserByUsername.mockResolvedValue({user: mockUser, success: true});

        const res = await request(app)
            .post('/cookie')
            .send(mockUser);

        const returnedUser = {user: mockUser, success: true};
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({ message: 'Login successful', user: returnedUser , success: true});
    });


});
