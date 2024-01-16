// routes.js
const express = require('express');
const router = express.Router();
// const db = require('./db/'); // Crie o arquivo db.js para lidar com o banco de dados
const db = require('../db/db'); //
const ytdl = require('ytdl-core');

// Rota para salvar dados no banco
router.post('/salve', async (req, res) => {
  // Lógica para salvar dados no banco
  try {
    // Utilize as funções do módulo 'db' para interagir com o banco de dados
    const result = await db.salvarDados(req.body);
    // Exemplo: const result = await db.salvarDados(req.body);
    res.json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao salvar dados no banco.' });
  }
});

// Rota para baixar arquivo .mp3 do YouTube
router.post('/download-mp3', async (req, res) => {
  const { videoUrl } = req.body;

  try {
    // Utilize o módulo 'ytdl-core' para baixar o arquivo .mp3
    const stream = ytdl(videoUrl, { filter: 'audioonly' });
    res.set('Content-Type', 'audio/mpeg');
    res.set('Content-Disposition', 'attachment; filename="audio.mp3"');
    stream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao baixar o arquivo .mp3.' });
  }
});

router.get('/test',  (req, res) => {
  // res.sendStatus(201).json({menssagem: 'test develop'})

  res.status(200).json({menssagem: 'test'});
});


// Rota para obter dados do banco
router.get('/obter-dados', async (req, res) => {
  try {
    const result = await db.obterDados();
    res.json({ message: 'Dados salvos com sucesso!', result: result.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter dados do banco.' });
  }
});

module.exports = router;
