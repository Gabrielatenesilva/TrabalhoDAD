const express = require('express');
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.listen(4000, () => {
    console.log("Servidor Produto funcionando...")
})

require('./controllers/projectCrontroller')(server);
