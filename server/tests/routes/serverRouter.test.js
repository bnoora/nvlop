const request = require('supertest');
const express = require('express');
const {getServersByUser, addUserToServer, removeUserFromServer, addUserModerator, 
    removeUserModerator, changeChannelOwner, getModStatus} = require('../../api/serverModel');
const serverRouter = require('../../routes/serverRouter');

jest.mock('../../api/serverModel');

const app = express();
app.use(express.json());
app.use('/', serverRouter);

describe('serverRouter tests', () => {
    it('should get all servers a user is a member of', async () => {
        const mockServers = [{server_id: 'test', server_name: 'test', owner_id: 'test'}];
        getServersByUser.mockResolvedValue(mockServers);

        const res = await request(app)
            .get('/get-user-servers')
            .send({user_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServers);
    });

    it('should add a user to a server', async () => {
        const mockServer = {server_id: 'test', server_name: 'test', owner_id: 'test'};
        addUserToServer.mockResolvedValue(mockServer);

        const res = await request(app)
            .post('/add-user-to-server')
            .send(mockServer);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServer);
    });

    it('should remove a user from a server', async () => {
        const mockServer = {server_id: 'test', server_name: 'test', owner_id: 'test'};
        removeUserFromServer.mockResolvedValue(mockServer);

        const res = await request(app)
            .delete('/remove-user-from-server')
            .send(mockServer);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServer);
    });

    it('should add a user as a moderator of a channel', async () => {
        const mockServer = {server_id: 'test', server_name: 'test', owner_id: 'test'};
        addUserModerator.mockResolvedValue(mockServer);

        const res = await request(app)
            .post('/add-user-moderator')
            .send(mockServer);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServer);
    });

    it('should remove a user as a moderator of a channel', async () => {
        const mockServer = {server_id: 'test', server_name: 'test', owner_id: 'test'};
        removeUserModerator.mockResolvedValue(mockServer);

        const res = await request(app)
            .delete('/remove-user-moderator')
            .send(mockServer);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServer);
    });

    it('should change the owner of a channel', async () => {
        const mockServer = {server_id: 'test', server_name: 'test', owner_id: 'test'};
        changeChannelOwner.mockResolvedValue(mockServer);

        const res = await request(app)
            .put('/change-channel-owner')
            .send(mockServer);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockServer);
    });

    it('should get the moderator status of a user', async () => {
        const mockStatus = {is_mod: true};
        getModStatus.mockResolvedValue(mockStatus);

        const res = await request(app)
            .get('/get-mod-status')
            .send({user_id: 'test', server_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockStatus);
    });
});
