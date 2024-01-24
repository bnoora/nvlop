const {createUser, getUserByUsername, getUserById} = require('../../api/userModel');

function generateRandomUsername() {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let username = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        username += characters[randomIndex];
    }
    return username;
}

describe('User Model', () => {
    it('should create a user in the database', async () => {
        function generateRandomUsername() {
            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
            let username = '';
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                username += characters[randomIndex];
            }
            return username;
        }
        const username = generateRandomUsername();
        const user = {
            username: username,
            password: 'testPassword',
            email:  `${username + '@gmail.com'}`
        };

        const res = await createUser(user);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('username');
        expect(res.username).toEqual(user.username);
        expect(res).toHaveProperty('password');
        expect(res.password).toEqual(user.password);
        expect(res).toHaveProperty('email');
        expect(res.email).toEqual(user.email);
    });

    it('should get a user from the database by username', async () => {
        const res = await getUserByUsername('johndoe');
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('username');
        expect(res.username).toEqual("johndoe");
        expect(res).toHaveProperty('password');
        expect(res.password).toEqual("123456");
        expect(res).toHaveProperty('email');
        expect(res.email).toEqual("jd@gmail.com");
    });

    it('should get a user from the database by user_id', async () => {
        const res = await getUserById(1);
        expect(res).toHaveProperty('user_id');
        expect(res).toHaveProperty('username');
        expect(res.username).toEqual("johndoe");
        expect(res).toHaveProperty('password');
        expect(res.password).toEqual("123456");
        expect(res).toHaveProperty('email');
        expect(res.email).toEqual("jd@gmail.com");
    });
});
