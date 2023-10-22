const { pool, dbClient, tClient } = require('./db');
const dotenv = require('dotenv');

const result = dotenv.config({ path: './.env' });

if (result.error) {
    console.error('Error loading .env file:', result.error);
    process.exit(1);
}

async function createDatabaseAndTable() {
    try {
        await dbClient.connect();
        const DB_NAME = process.env.DB_NAME;
        const res = await dbClient.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);

        if (res.rowCount === 0) {
            console.log(`${DB_NAME} database not found, creating it.`);
            await dbClient.query(`CREATE DATABASE "${DB_NAME}";`);
            console.log(`created database ${DB_NAME}`);
        } else {
            console.log(`${DB_NAME} database exists.`);
        }

const query = `
    CREATE TABLE IF NOT EXISTS todoss(
      todo_id SERIAL PRIMARY KEY,
      title VARCHAR(50),
      type VARCHAR(50),
      content VARCHAR(300)
     );
`;
try {
    await tClient.connect();
        const DB_NAME = process.env.DB_NAME;
        const res = await tClient.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${DB_NAME}'`);
    const resp = await tClient.query(query);
    console.log('Table is successfully created');
} catch (error) {
            console.error('Error creating the table: ', error);
        }
        
    } catch (error) {
        console.error('An error occurred:', error);
    } finally {
        await dbClient.end(); 
        await tClient.end(); 

    }
}

createDatabaseAndTable();
