import pool from 'pg';

const newLog = async (data) => {
    const {id_usuario, fecha_log, metodo, ip, url} = data;

    const result = await pool.query(
        'INSERT INTO logs (id_usuario, fecha_log, metodo, ip, url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [id_usuario, fecha_log, metodo, ip, url]
    );
    return result.rows[0];
}

export default newLog;