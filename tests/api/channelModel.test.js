const {createChannel, deleteChannel, getChannelById, getChannelsByUser, addUserToChannel, 
    removeUserFromChannel, addUserModerator, removeUserModerator, 
    changeChannelOwner, getModStatus} = require('../../api/channelModel');
const pool = require('../../api/dbConfig');


describe('Channel Model', () => {
    it('Should create a channel in the database', async () => {
        const res = await createChannel(1, 'Test Channel', 'Test description');
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('channel_name');
        expect(res).toHaveProperty('description');
    });

    it('Should get a channel from the database by channel_id', async () => {
        const res = await getChannelById(2);
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('channel_name');
        expect(res).toHaveProperty('description');
    });

    it('Should get channels that a user is a member of', async () => {
        const res = await getChannelsByUser(1);
        expect(res).toHaveLength > 0;
        expect(res[0]).toHaveProperty('channel_id');
        expect(res[0]).toHaveProperty('channel_name');
        expect(res[0]).toHaveProperty('description');
    });

    it('Should add a user to the channel', async () => {
        const res = await addUserToChannel(1, 3);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('channel_id');
    });

    it('Should remove a user from the channel', async () => {
        const res = await removeUserFromChannel(1, 3);
        expect(res).toBeUndefined();
    });

    it('Should get the moderator status of a user', async () => {
        const res = await getModStatus(1, 1);
        expect(res).toBe(false);
    });

    it('Should add a user as a moderator of a channel', async () => {
        const res = await addUserModerator(1, 1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('is_mod');
        expect(res.is_mod).toBe(true);
    });

    it('Should remove a user as a moderator of a channel', async () => {
        const res = await removeUserModerator(1, 1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('is_mod');
        expect(res.is_mod).toBe(false);
    });

    it('Should change the owner of a channel', async () => {
        const res = await changeChannelOwner(1, 3);
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('owner_id');
        expect(res.owner_id).toBe(3);
    });

    it('Should reset the owner of a channel', async () => {
        const res = await changeChannelOwner(1, 1);
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('owner_id');
        expect(res.owner_id).toBe(1);
    });

    it('Should delete a channel from the database', async () => {
        const res = await deleteChannel(3);
        const res2 = await getChannelById(3);
        expect(res2).toBeUndefined();
    });
    afterAll(async () => {
        await pool.end();
    });
});