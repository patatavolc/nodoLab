import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 1000,
    idleTimeoutMillis: 30,
    connectionTimeoutMillis: 2000,
});

export default pool;