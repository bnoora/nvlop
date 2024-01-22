const pool = require('../../database/dbConfig');
const {createUserToken, getUserToken, deleteUserToken} = require('../../database/userTokenModel');

describe('User Token Model', () => {

    let test_token = NaN

    it('should create a user token in the database', async () => {
        const res = await createUserToken(1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('token');
        test_token = res.token
    });

    it('should get a user token from the database by user_id', async () => {
        const res = await getUserToken(1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('token');
    });

    it('should delete a user token from the database by token', async () => {
        const res = await deleteUserToken(test_token);
        expect(res).toBe(undefined);
    });
});