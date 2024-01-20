const pool = require('../../database/dbConfig');

describe('Database Connection', () => {
  it('should connect to the database successfully', async () => {
    const client = await pool.connect();
    expect(client).toBeDefined();
    const res = await client.query('SELECT NOW()');
    expect(res).toHaveProperty('rows');
    client.release();
  });
});
