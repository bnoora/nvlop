const {createServerInvite, deleteServerInvite, getServerInviteById, getServerInvitesByServerId} = require('../../api/serverInviteModel');
const pool = require('../../api/dbConfig');

describe('Server Invite Model', () => {
    it ('should create a server invite', async () => {
        const res = await createServerInvite(1);
        expect(res.server_id).toEqual(1);
    });

    it ('should delete a server invite', async () => {
        const res = await deleteServerInvite(4);
        expect(res).toEqual(undefined);
    });

    it ('should get a server invite by id', async () => {
        const res = await getServerInviteById(1);
        expect(res.server_id).toEqual(1);
    });
    
    it ('should get server invites by server id', async () => {
        const res = await getServerInvitesByServerId(1);
        expect(res[0].server_id).toEqual(1);
    });

    afterAll(async () => {
        await pool.end();
    });
});