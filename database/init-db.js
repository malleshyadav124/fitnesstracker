const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function initializeDatabase() {
    try {
        // Read the SQL file
        const sqlFile = path.join(__dirname, 'init.sql');
        const sql = fs.readFileSync(sqlFile, 'utf8');

        // Execute the SQL commands
        await pool.query(sql);
        console.log('Database initialized successfully!');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await pool.end();
    }
}

initializeDatabase(); 