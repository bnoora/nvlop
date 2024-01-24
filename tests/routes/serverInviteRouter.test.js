const request = require('supertest');
const express = require('express');
const {createServerInvite, deleteServerInvite, getServerInviteById, 
    getServerInvitesByServerId} = require('../../api/serverInviteModel');
const serverInviteRouter = require('../../routes/serverInviteRouter');

jest.mock('../../api/serverInviteModel');

const app = express();
app.use(express.json());
app.use('/', serverInviteRouter);

describe('serverInviteRouter tests', () => {
    it('should create a server invite', async () => {
        const mockInvite = {server_id: 'test'};
        createServerInvite.mockResolvedValue(mockInvite);

        const res = await request(app)
            .post('/create-server-invite')
            .send(mockInvite);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockInvite);
    });

    it('should delete a server invite', async () => {
        const mockInvite = {invite_id: 'test'};
        deleteServerInvite.mockResolvedValue(undefined);

        const res = await request(app)
            .delete('/delete-server-invite')
            .send(mockInvite);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("");
    });

    it('should get a server invite by id', async () => {
        const mockInvite = {invite_id: 'test'};
        getServerInviteById.mockResolvedValue(mockInvite);

        const res = await request(app)
            .get('/get-server-invite')
            .send(mockInvite);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockInvite);
    });

    it('should get server invites by server id', async () => {
        const mockInvites = [{invite_id: 'test'}];
        getServerInvitesByServerId.mockResolvedValue(mockInvites);

        const res = await request(app)
            .get('/get-server-invites')
            .send({server_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockInvites);
    });
});