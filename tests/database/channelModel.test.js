const {createChannel, deleteChannel, getChannelById, getChannelsByUser, addUserToChannel, removeUserFromChannel} = require('../../database/channelModel');
const pool = require('../../database/dbConfig');


describe('Channel Model', () => {
    it('Should create a channel in the database', async () => {
        const channel = {
            channel_name: 'Test Channel',
            description: 'Test description'
        };
        const res = await createChannel(channel);
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('channel_name');
        expect(res).toHaveProperty('description');
    });

    it('Should get a channel from the database by channel_id', async () => {
        const res = await getChannelById(3);
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

    it('Should delete a channel from the database', async () => {
        const res = await deleteChannel(3);
        const res2 = await getChannelById(3);
        expect(res2).toBeUndefined();
    });
});