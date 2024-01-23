const {getFriends, createFriend, deleteFriend, createFriendRequest, deleteFriendRequest, 
    getSentFriendRequests, getReceivedFriendRequests} = require('../../api/userFriendModel');

describe('User Friend Model', () => {
    it('should get all friends from the database by user_id', async () => {
        const res = await getFriends(1);
        expect(res).toHaveLength === 1;
        expect(res[0]).toHaveProperty('user_id1');
        expect(res[0]).toHaveProperty('user_id2');
    });

    it('should create a friend in the database', async () => {
        const friend = {
            user_id1: 1,
            user_id2: 3
        };
        const res = await createFriend(friend);
        expect(res).toHaveProperty('user_id1');
        expect(res).toHaveProperty('user_id2');
    });

    it('should delete a friend in the database', async () => {
        const friend = {
            user_id1: 1,
            user_id2: 3
        };
        await deleteFriend(friend);
        const res = await getFriends(1);
        expect(res).toHaveLength(1);
    });

    it('should create a friend request in the database', async () => {
        const friendRequest = {
            user_id1: 2,
            user_id2: 3
        };
        const res = await createFriendRequest(friendRequest);
        expect(res.user_id1).toBe(2);
        expect(res.user_id2).toBe(3);
    });

    it('should delete a friend request in the database', async () => {
        const friendRequest = {
            user_id1: 2,
            user_id2: 3
        };
        const res = await deleteFriendRequest(friendRequest);
        expect(res).toBeUndefined();
    });
});