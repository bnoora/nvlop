const {createMessage, getMessagesByChannel, deleteMessage} = require('../../api/messageModel'); 
const pool = require('../../api/dbConfig');

describe('Message Model', () => {

    let message_id = null;

    it('should create a message in the database', async () => {
        const message = {
            channel_id: 1,
            user_id: 1,
            message: 'Test message'
        };
        const res = await createMessage(message);
        expect(res).toHaveProperty('message_id');
        expect(res.channel_id).toEqual(1);
        expect(res.user_id).toEqual(1);
        expect(res.message).toEqual('Test message');
        message_id = res.message_id;
    });

	it('should get max of 50 messages from the database by channel', async () => {
		const res = await getMessagesByChannel({channel_id: 1, message_id: 0});
		expect(res).toHaveLength > 0;
        expect(res).toHaveLength <= 50;
        console.log(res);
		expect(res[0]).toHaveProperty('message_id');
		expect(res[0]).toHaveProperty('channel_id');
		expect(res[0]).toHaveProperty('user_id');
		expect(res[0]).toHaveProperty('message');
	});

    it('should delete a message from the database', async () => {
        const res = await deleteMessage(message_id);
        expect(res).toBeUndefined();
    });
});