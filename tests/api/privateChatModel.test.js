const {createPrivateChannel, createPrivateMessage, getPrivateMessages, deletePrivateMessage, getPrivateChannelById} = require('../../api/privateChatModel');

describe('Private Chat Model', () => {
    it ('should create a private channel in the database', async () => {
        const data = {
            user_id_1: 1,
            user_id_2: 3
        };
        const res = await createPrivateChannel(data);
        expect(res).toHaveProperty('channel_id');
    });

    it ('should create a private message in the database', async () => {
        const message = {
            channel_id: 1,
            user_id: 1,
            message: 'Test message'
        };
        const res = await createPrivateMessage(message);
        expect(res).toHaveProperty('message_id');
        expect(res.channel_id).toBe(message.channel_id);
        expect(res.user_id).toBe(message.user_id);
        expect(res.message).toBe(message.message);
    });

    it ('should get max of 50 messages from the database by channel', async () => {
        const data = {
            user_id_1: 1,
            user_id_2: 2,
            channel_id: 1
        };
        const res = await getPrivateMessages(data);
        expect(res).toHaveLength > 0;
        expect(res).toHaveLength <= 50;
        expect(res[0]).toHaveProperty('message_id');
        expect(res[0]).toHaveProperty('channel_id');
        expect(res[0]).toHaveProperty('user_id');
        expect(res[0]).toHaveProperty('message');
    });

    it ('should get a private channel from the database by channel_id', async () => {
        const res = await getPrivateChannelById(1);
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('user_id1');
        expect(res).toHaveProperty('user_id2');
    });

    it ('should delete a message from the database', async () => {
        const res = await deletePrivateMessage(7);
        expect(res).toBeUndefined();
    });
});