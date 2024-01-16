// index.js
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const { path } = require('express/lib/application');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;


// Configurar o middleware para servir arquivos estáticos
app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));
// app.use(cookieParser);

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server listening on ports ${port}`);
});
