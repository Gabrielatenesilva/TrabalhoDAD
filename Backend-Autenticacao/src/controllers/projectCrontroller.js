const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/verificar', (req, res) => {
    console.log("[Autenticacao]Chamando endpoint de verificar...");
    return res.send({idUsuario:req.userId});
})

module.exports = server => server.use('/api/v1/autenticacao', router);