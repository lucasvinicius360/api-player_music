// db.js
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "lucas_develop",
  connectionLimit: 5,
});

async function salvarDados(data) {
  console.log(data);
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query(
      "INSERT INTO player_music (id,name_band, name_music, link_music,	link_image, genero) VALUES (?,?, ?,?,?,?)",
      [
        data.id,
        data.name_band,
        data.name_music,
        data.link_music,
        data.link_image,
        data.genero,
      ]
    );
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
  }
}

async function getMusicById(id) {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM player_music where id = ?", [
      id,
    ]);
    console.log({"getMusicById":result});
    return result;
  } catch (error) {
    throw error;
  } finally {
    if (conn) conn.release();
  }
}

async function everyMusic() {
  let conn;
  try {
    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM player_music");
    return result;
  } catch (error) {
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  salvarDados,
  getMusicById,
  everyMusic,
};
