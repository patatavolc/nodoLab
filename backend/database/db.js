import pg from "pg";

const { Pool } = pg;

// Usar connection string de Supabase
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // <-- Obligatorio para supabase
    },
});

export default pool;
