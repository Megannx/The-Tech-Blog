const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DB_URL || 'postgres://user:password@localhost:5432/database',
});

async function testConnection() {
  try {
    await client.connect();
    console.log('Database connected successfully');
    const res = await client.query('SELECT NOW()');
    console.log('Current time:', res.rows[0]);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  } finally {
    await client.end();
  }
}

testConnection();