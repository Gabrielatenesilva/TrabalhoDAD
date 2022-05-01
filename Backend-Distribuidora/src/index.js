const express = require('express');
const axios = require('axios').default;
const bodyParser = require('body-parser');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.listen(5000, () => {
    console.log("Servidor Distribuidora funcionando...")
})

require('./controllers/requisitionsController')(server);