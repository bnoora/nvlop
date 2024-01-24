const request = require('supertest');
const express = require('express');
const {createUser, getUserByUsername, getUserById} = require('../../api/userModel');
const userRouter = require('../../routes/userRouter');

jest.mock('../../api/userModel');

const app = express();
app.use(express.json());
app.use('/', userRouter);

describe('userRouter tests', () => {
    it('should create a user', async () => {
        const mockUser = {user_id: 'test', username: 'test', password: 'test'};
        createUser.mockResolvedValue(mockUser);

        const res = await request(app)
            .post('/create-user')
            .send(mockUser);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });

    it('should get a user by username', async () => {
        const mockUser = {user_id: 'test', username: 'test', password: 'test'};
        getUserByUsername.mockResolvedValue(mockUser);

        const res = await request(app)
            .get('/get-user-by-username')
            .send({username: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });

    it('should get a user by user_id', async () => {
        const mockUser = {user_id: 'test', username: 'test', password: 'test'};
        getUserById.mockResolvedValue(mockUser);

        const res = await request(app)
            .get('/get-user-by-id')
            .send({user_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockUser);
    });

});