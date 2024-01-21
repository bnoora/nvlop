const pool = require('../../database/dbConfig');
const {createPrivateChannel, createPrivateMessage, getPrivateMessages, deletePrivateMessage} = require('../../database/privateChatModel');

describe('Private Chat Model', () => {
    it ('should create a private channel in the database', async () => {
        const res = await createPrivateChannel(1, 3);
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
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('message');
    });

    it ('should get max of 50 messages from the database by channel', async () => {
        const res = await getPrivateMessages(1 ,2 , 1);
        expect(res).toHaveLength > 0;
        expect(res).toHaveLength <= 50;
        expect(res[0]).toHaveProperty('message_id');
        expect(res[0]).toHaveProperty('channel_id');
        expect(res[0]).toHaveProperty('user_id');
        expect(res[0]).toHaveProperty('message');
    });

    it ('should delete a message from the database', async () => {
        const res = await deletePrivateMessage(1);
        expect(res).toBeUndefined();
    });
});