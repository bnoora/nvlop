const request = require('supertest');
const express = require('express');
const {createChannel, deleteChannel, getChannelById} = require('../../api/channelModel');
const channelRouter = require('../../routes/channelRouter');

jest.mock('../../api/channelModel');

const app = express();
app.use(express.json());
app.use('/', channelRouter);

describe('channelRouter tests', () => {
    it('should create a channel', async () => {
        const mockChannel = {channel_name: 'test', description: 'test', server_id: 'test'};
        createChannel.mockResolvedValue(mockChannel);

        const res = await request(app)
            .post('/create-channel')
            .send(mockChannel);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockChannel);
    });

    it('should delete a channel', async () => {
        const mockChannel = {channel_id: 'test'};
        deleteChannel.mockResolvedValue(undefined);

        const res = await request(app)
            .delete('/delete-channel')
            .send(mockChannel);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("");
    });

    it('should get a channel by id', async () => {
        const mockChannel = {channel_id: 'test'};
        getChannelById.mockResolvedValue(mockChannel);

        const res = await request(app)
            .get('/get-channel')
            .send(mockChannel);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockChannel);
        expect(res.body.channel_id).toEqual('test');
    });
});