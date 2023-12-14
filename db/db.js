// db.js
const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'lucas_develop',
  connectionLimit: 5,
});

async function salvarDados(data) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO sua_tabela (coluna1, coluna2) VALUES (?, ?)', [data.valor1, data.valor2]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
  }
}

async function obterDados() {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('SELECT * FROM users u where u.id_user = ?', [1]);
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  salvarDados,
  obterDados,
};
