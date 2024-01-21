const { createMessage, createPrivateMessage } = require('../../database/messageModel'); 
const pool = require('../../database/dbConfig');

const client = pool.connect();

describe('Message Model', () => {
    it('should create a message in the database', async () => {
        const message = {
            channel_id: 1,
            user_id: 1,
            message: 'Test message'
        };
        const res = await createMessage(message);
        expect(res).toHaveProperty('message_id');
        expect(res).toHaveProperty('channel_id');
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('message');
    });

    it('should create a private message in the database', async () => {
        const message = {
            user_id1: 1,
            user_id2: 2,
            message: 'Test message'
        };
        const res = await createPrivateMessage(message);
        expect(res).toHaveProperty('message_id');
        expect(res).toHaveProperty('user_id1');
        expect(res).toHaveProperty('user_id2');
        expect(res).toHaveProperty('message');
    });
});