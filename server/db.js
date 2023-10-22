const Pool = require("pg").Pool;
const { Client } = require("pg");
const dotenv = require('dotenv');

const result = dotenv.config({ path: './.env' });

if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

const dbClient = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});
const tClient = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

module.exports = { pool, dbClient,tClient }; 
