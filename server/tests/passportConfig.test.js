const { generateToken, validateToken, getStoredTokenOnLogin, removeToken, storeToken } = require('../config/tokenModules');
const tokenModel = require('../api/userTokenModel');
const generateRandomToken = require('../modules/tokenGenerator');

jest.mock('../api/userTokenModel');
jest.mock('../modules/tokenGenerator');

describe('Token Module', () => {
	it('should generate a new token and store it', async () => {
		const userId = '123';
		generateRandomToken.mockResolvedValue('randomToken');
		tokenModel.deleteUserToken.mockResolvedValue(true);
		tokenModel.createUserToken.mockResolvedValue(true);

		await generateToken(userId);

		expect(generateRandomToken).toHaveBeenCalledWith(userId);
		expect(tokenModel.deleteUserToken).toHaveBeenCalledWith(userId);
		expect(tokenModel.createUserToken).toHaveBeenCalledWith(userId, 'randomToken');
	});

	// Test for validateToken
	it('should return true for a valid token', async () => {
		const token = 'validToken';
		const userId = '123';
		tokenModel.checkTokenValid.mockResolvedValue(true);

		const isValid = await validateToken(token, userId);

		expect(isValid).toBe(true);
		expect(tokenModel.checkTokenValid).toHaveBeenCalledWith(token, userId);
	});

	it('should throw an error for an invalid token', async () => {
		const token = 'invalidToken';
		const userId = '123';
		tokenModel.checkTokenValid.mockRejectedValue(new Error('Invalid token'));

		await expect(validateToken(token, userId)).rejects.toThrow('Invalid token');
	});

	// Test for getStoredTokenOnLogin
	it('should return a valid token', async () => {
		const userId = '123';
		tokenModel.checkTokenValid.mockResolvedValue(true);
		tokenModel.getUserToken.mockResolvedValue('validToken');
		
		const token = await getStoredTokenOnLogin(userId);

		expect(token).toBe('validToken');
		expect(tokenModel.getUserToken).toHaveBeenCalledWith(userId);
		expect(tokenModel.checkTokenValid).toHaveBeenCalledWith('validToken', userId);
	});

	it('should generate a new token and return it if the existing token is invalid', async () => {
		const userId = '123';
		tokenModel.getUserToken.mockResolvedValue('invalidToken');
		tokenModel.checkTokenValid.mockResolvedValue(false);
		generateRandomToken.mockResolvedValue('newToken');
		tokenModel.deleteUserToken.mockResolvedValue(true); // Assuming removeToken uses this
		tokenModel.createUserToken.mockResolvedValue(true); // Assuming storeToken uses this
		const token = await getStoredTokenOnLogin(userId);
		expect(token).toBe('newToken');
		expect(tokenModel.getUserToken).toHaveBeenCalledWith(userId);
		expect(tokenModel.checkTokenValid).toHaveBeenCalledWith('invalidToken', userId);
		expect(generateRandomToken).toHaveBeenCalledWith(userId);
		expect(tokenModel.deleteUserToken).toHaveBeenCalledWith(userId);
	  });
	  

});

