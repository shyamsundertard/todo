const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "7HpN79ZP",
    host: "localhost",
    port: 5432,
    database: "todobase"
});

module.exports = pool;  