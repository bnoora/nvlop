const { checkAuth } = require('../sockets/socketHelper');
const userTokenModel = require('../api/userTokenModel');

// Mock the database functions
jest.mock('../database/userTokenModel');

describe('checkAuth', () => {
    it('should return user object for valid token', async () => {
        // Arrange
        const mockToken = 'validToken123';
        userTokenModel.checkTokenValid.mockResolvedValue(true);
        userTokenModel.getUserByToken.mockResolvedValue({ id: 'user123', name: 'John Doe' });

        // Act
        const result = await checkAuth(mockToken);

        // Assert
        expect(result).toEqual({ id: 'user123', name: 'John Doe' });
    });

    it('should return false for invalid token', async () => {
        // Arrange
        const mockToken = 'invalidToken123';
        userTokenModel.checkTokenValid.mockResolvedValue(false);

        // Act
        const result = await checkAuth(mockToken);

        // Assert
        expect(result).toBe(false);
    });
});
