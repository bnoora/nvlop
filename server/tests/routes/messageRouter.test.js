const request = require('supertest');
const express = require('express');
const {createMessage, getMessagesByChannel, deleteMessage} = require('../../api/messageModel');
const messageRouter = require('../../routes/messageRouter');

jest.mock('../../api/messageModel');

const app = express();
app.use(express.json());
app.use('/', messageRouter);

describe('messageRouter tests', () => {
    it('should create a message', async () => {
        const mockMessage = {message: 'test', user_id: 'test', channel_id: 'test'};
        createMessage.mockResolvedValue(mockMessage);

        const res = await request(app)
            .post('/create-message')
            .send(mockMessage);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMessage);
    });

    it('should get messages by channel', async () => {
        const mockMessages = [{message: 'test', user_id: 'test', channel_id: 'test'}];
        getMessagesByChannel.mockResolvedValue(mockMessages);

        const res = await request(app)
            .get('/get-messages')
            .send({channel_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockMessages);
    });

    it('should delete a message', async () => {
        const mockMessage = {message_id: 'test'};
        deleteMessage.mockResolvedValue(undefined);

        const res = await request(app)
            .delete('/delete-message')
            .send(mockMessage);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("");
    });
});