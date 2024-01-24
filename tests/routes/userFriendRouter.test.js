const request = require('supertest');
const express = require('express');
const {getFriends, createFriend, deleteFriend, createFriendRequest, 
    deleteFriendRequest, getSentFriendRequests, getReceivedFriendRequests} = require('../../api/userFriendModel');
const userFriendRouter = require('../../routes/userFriendRouter');

jest.mock('../../api/userFriendModel')

const app = express();
app.use(express.json());
app.use('/', userFriendRouter);

describe('userFriendRouter tests', () => {
    it('should get all friends of a user', async () => {
        const mockFriends = [{user_id1: 'test', user_id2: 'test'}];
        getFriends.mockResolvedValue(mockFriends);

        const res = await request(app)
            .get('/get-friends')
            .send({user_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockFriends);
    });

    it('should create a friend relationship', async () => {
        const mockFriend = {user_id1: 'test', user_id2: 'test'};
        createFriend.mockResolvedValue(mockFriend);

        const res = await request(app)
            .post('/create-friend')
            .send(mockFriend);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockFriend);
    });

    it('should delete a friend relationship', async () => {
        const mockFriend = {user_id1: 'test', user_id2: 'test'};
        deleteFriend.mockResolvedValue(undefined);

        const res = await request(app)
            .delete('/delete-friend')
            .send(mockFriend);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("");
    });


    it('should create a friend request', async () => {
        const mockFriendRequest = {user_id1: 'test', user_id2: 'test'};
        createFriendRequest.mockResolvedValue(mockFriendRequest);

        const res = await request(app)
            .post('/create-friend-request')
            .send(mockFriendRequest);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockFriendRequest);
    });

    it('should delete a friend request', async () => {
        const mockFriendRequest = {user_id1: 'test', user_id2: 'test'};
        deleteFriendRequest.mockResolvedValue(undefined);

        const res = await request(app)
            .delete('/delete-friend-request')
            .send(mockFriendRequest);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual("");
    });

    it('should get all friend requests sent by a user', async () => {
        const mockFriendRequests = [{user_id1: 'test', user_id2: 'test'}];
        getSentFriendRequests.mockResolvedValue(mockFriendRequests);

        const res = await request(app)
            .get('/get-sent-friend-requests')
            .send({user_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockFriendRequests);
    });

    it('should get all friend requests received by a user', async () => {
        const mockFriendRequests = [{user_id1: 'test', user_id2: 'test'}];
        getReceivedFriendRequests.mockResolvedValue(mockFriendRequests);

        const res = await request(app)
            .get('/get-received-friend-requests')
            .send({user_id: 'test'});

        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(mockFriendRequests);
    });

});
