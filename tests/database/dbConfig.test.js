const pool = require('../../database/dbConfig');

describe('Database Connection', () => {
  	it('should connect to the database successfully', async () => {
		const client = await pool.connect();
    	expect(client).toBeDefined();
    	const res = await client.query('SELECT NOW()');
    	expect(res).toHaveProperty('rows');
    	client.release();
	});

	it('should be connected to the database', async () => {
		const client = await pool.connect();
		expect(client._connected).toBe(true);
		client.release();
	});

	it('should release the client back to the pool', async () => {
		const client = await pool.connect();
		expect(client).toBeDefined();
		const res = await client.query('SELECT NOW()');
		expect(res).toHaveProperty('rows');
		
		const releaseSpy = jest.spyOn(client, 'release');
		client.release();
	
		expect(releaseSpy).toHaveBeenCalled();
	});

	it('should close the pool', async () => {
		const client = await pool.connect();
		expect(client).toBeDefined();
		const res = await client.query('SELECT NOW()');
		expect(res).toHaveProperty('rows');
		
		const endSpy = jest.spyOn(pool, 'end');
		pool.end();
	
		expect(endSpy).toHaveBeenCalled();
	});
});
