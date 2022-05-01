const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.listen(3000, () => {
    console.log("Servidor Autenticacao funcionando...")
})

require('./controllers/authController')(server);
require('./controllers/projectCrontroller')(server);