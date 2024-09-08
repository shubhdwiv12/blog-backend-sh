// scripts/resetCommandDatabase.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'blogsite',  // Database name for Command Service
  password: 'toor',
  port: 5433  // Adjust this to your PostgreSQL port
});

const resetCommandDatabase = async () => {
  try {
    await pool.query('TRUNCATE TABLE blogs RESTART IDENTITY CASCADE;');
    console.log('Command database reset successfully');
  } catch (err) {
    console.error('Error resetting Command database:', err);
  } finally {
    pool.end();
  }
};

resetCommandDatabase();
