const {createChannel, deleteChannel, getChannelById, getChannelsByUser, addUserToChannel, 
    removeUserFromChannel, addUserModerator, removeUserModerator, 
    changeChannelOwner, getModStatus} = require('../../api/channelModel');
const pool = require('../../api/dbConfig');


describe('Channel Model', () => {
    it ('should create a channel', async () => {
        const data = {channel_name: 'test', description: 'test', server_id: 1};
        const res = await createChannel(data);
        expect(res.channel_name).toEqual('test');
        expect(res.description).toEqual('test');
        expect(res.server_id).toEqual(1);
    });

    it ('should delete a channel', async () => {
        const res = await deleteChannel(7);
        expect(res).toEqual(undefined);
    });

    it ('should get a channel by id', async () => {
        const res = await getChannelById(1);
        expect(res.channel_name).toEqual('channel1');
        expect(res.description).toEqual('channel1 description');
        expect(res.server_id).toEqual(1);
    });

    afterAll(async () => {
        await pool.end();
    });
});