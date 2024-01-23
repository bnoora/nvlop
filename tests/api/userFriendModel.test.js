const {getFriends, createFriend, deleteFriend} = require('../../database/userFriendModel');
const pool = require('../../api/dbConfig');

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
        const res = await deleteFriend(friend);
        const res2 = await getFriends(1);
        expect(res2).toHaveLength(1);
    });
});