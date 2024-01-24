const { checkAuth } = require('../sockets/socketHelper');
const userTokenModel = require('../api/userTokenModel');

// Mock the database functions
jest.mock('../database/userTokenModel');

describe('checkAuth', () => {
    it('should return user object for valid token', async () => {
        const mockToken = 'validToken123';
        userTokenModel.checkTokenValid.mockResolvedValue(true);
        userTokenModel.getUserByToken.mockResolvedValue({ id: 'user123', name: 'John Doe' });

        const result = await checkAuth(mockToken);

        expect(result).toEqual({ id: 'user123', name: 'John Doe' });
    });

    it('should return false for invalid token', async () => {
        const mockToken = 'invalidToken123';
        userTokenModel.checkTokenValid.mockResolvedValue(false);

        const result = await checkAuth(mockToken);

        expect(result).toBe(false);
    });
});
