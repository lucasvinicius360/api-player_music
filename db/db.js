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
  console.log(data)
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query('INSERT INTO player_music (name_band, name_music, link_music,	link_image, genero) VALUES (?, ?,?,?,?)', [data.name_band, data.name_music, data.link_music, data.link_image, data.genero]);
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
