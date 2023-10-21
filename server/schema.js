const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    password: "7HpN79ZP",
    host: "localhost",
    port: 5432,
    database: "todobase",
});

async function createDatabaseAndTable() {
    try {
        await client.connect();
        const DB_NAME = process.env.DB_NAME || 'todobase';
        const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);

        if (res.rowCount === 0) {
            console.log(`${DB_NAME} database not found, creating it.`);
            await client.query(`CREATE DATABASE "${DB_NAME}";`);
            console.log(`created database ${DB_NAME}`);
        } else {
            console.log(`${DB_NAME} database exists.`);
        }

        const schema = `
            CREATE TABLE IF NOT EXISTS todo (
                todo_id SERIAL PRIMARY KEY,
                title VARCHAR(50),
                type VARCHAR(50),
                content VARCHAR(300)
            );
        `;
        await client.query(schema);
        console.log('Table created successfully');
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await client.end(); 
    }
}

createDatabaseAndTable();
