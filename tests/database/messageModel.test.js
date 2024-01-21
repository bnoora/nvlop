const {createMessage, getMessagesByChannel, deleteMessage} = require('../../database/messageModel'); 
const pool = require('../../database/dbConfig');

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

	it('should get max of 50 messages from the database by channel', async () => {
		const res = await getMessagesByChannel(1);
		expect(res).toHaveLength > 0;
        expect(res).toHaveLength <= 50;
		expect(res[0]).toHaveProperty('message_id');
		expect(res[0]).toHaveProperty('channel_id');
		expect(res[0]).toHaveProperty('user_id');
		expect(res[0]).toHaveProperty('message');
	});

    it('should delete a message from the database', async () => {
        const res = await deleteMessage(1);
        expect(res).toBeUndefined();
    });
});