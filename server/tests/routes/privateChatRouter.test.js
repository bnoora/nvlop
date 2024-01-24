const request = require('supertest');
const express = require('express');
const {createPrivateChannel, createPrivateMessage, getPrivateMessages, deletePrivateMessage, getPrivateChannelById} = require('../../api/privateChatModel');
const privateChatRouter = require('../../routes/privateChatRouter');

jest.mock('../../api/privateChatModel');

const app = express();
app.use(express.json());
app.use('/', privateChatRouter);

describe('privateChatRouter tests', () => {
    it('should create a private channel', async () => {
        const mockChannel = {user_id: 'test', user_id2: 'test'};
        createPrivateChannel.mockResolvedValue(mockChannel);

        const res = await request(app)
            .post('/create-private-channel')
            .send(mockChannel);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockChannel);
    });

    it('should create a private message', async () => {
        const mockMessage = {message: 'test', user_id: 'test', channel_id: 'test'};
        createPrivateMessage.mockResolvedValue(mockMessage);

        const res = await request(app)
            .post('/create-private-message')
            .send(mockMessage);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMessage);
    });

    it('should get private messages by channel', async () => {
        const mockMessages = [{message: 'test', user_id: 'test', channel_id: 'test'}];
        getPrivateMessages.mockResolvedValue(mockMessages);

        const res = await request(app)
            .get('/get-private-messages')
            .send({channel_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMessages);
    });

    it('should delete a private message', async () => {
        const mockMessage = {message_id: 'test'};
        deletePrivateMessage.mockResolvedValue(undefined);

        const res = await request(app)
            .delete('/delete-private-message')
            .send(mockMessage);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("");
    });

    it('should get a private channel by id', async () => {
        const mockChannel = {user_id: 'test', user_id2: 'test'};
        getPrivateChannelById.mockResolvedValue(mockChannel);

        const res = await request(app)
            .get('/get-private-channel')
            .send({channel_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockChannel);
    });
});

