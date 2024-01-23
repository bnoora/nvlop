const {getServersByUser, addUserToServer, removeUserFromServer, 
    addUserModerator, removeUserModerator, changeChannelOwner, 
    getModStatus} = require('../../api/serverModel');

describe('Server Model', () => {
    it ('should get servers a user is a member of', async () => {
        const res = await getServersByUser(1);
        expect(res).toHaveLength > 0;
        expect(res[0]).toHaveProperty('server_id');
        expect(res[0]).toHaveProperty('server_name');
        expect(res[0]).toHaveProperty('description');
        expect(res[0]).toHaveProperty('icon_url');
        expect(res[0]).toHaveProperty('user_id');
        expect(res[0]).toHaveProperty('is_mod');
    });

    it ('should add a user to a server', async () => {
        const data = {
            server_id: 1,
            user_id: 3
        };
        const res = await addUserToServer(data);
        expect(res).toHaveProperty('server_id');
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('is_mod');
    });

    it ('should remove a user from a server', async () => {
        const data = {
            server_id: 1,
            user_id: 3
        };
        const res = await removeUserFromServer(data);
        expect(res).toBeUndefined();
    });

    it ('should make a user a moderator of a server', async () => {
        const data = {
            server_id: 1,
            user_id: 2
        };
        const res = await addUserModerator(data);
        expect(res.is_mod).toBe(true);
    });

    it('should remove a user as a moderator of a server', async () => {
        const data = {
            server_id: 1,
            user_id: 2
        };
        const res = await removeUserModerator(data);
        expect(res.is_mod).toBe(false);
    });

    it ('should change the owner of a server', async () => {
        const data = {
            server_id: 1,
            user_id: 2
        };
        const res = await changeChannelOwner(data);
        expect(res.owner_id).toBe(data.user_id);
        const data2 = {
            server_id: 1,
            user_id: 1
        };
        await changeChannelOwner(data);
    });


    it ('should get the moderator status of a user', async () => {
        const data = {
            server_id: 1,
            user_id: 1
        };
        const res = await getModStatus(data);
        expect(res).toBe(false);
    });

});