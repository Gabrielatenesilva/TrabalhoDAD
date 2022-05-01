const express = require('express');
const res = require('express/lib/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json')

const User = require('../models/user');

const router = express.Router();

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret,{
        expiresIn:3600,
    });
}

router.post('/registrar', async (req, res) => {
    console.log("[Autenticacao]Chamando endpoint para registrar...");
    const { email } = req.body;

    try {
        if (await User.findOne({email})) {
            return res.status(400).send({ error: 'Usuario ja existe' })
        }
        const user = await User.create(req.body);

        user.senha = undefined;

        return res.send({ 
            user, 
            token: generateToken({id: user.id}),
         });
    } catch (error) {
        return res.status(400).send({ error: 'Falha no registro do usuario' })
    }
});

router.post('/autenticar', async (req, res) => {
    console.log("[Autenticacao]Chamando endpoint para autenticar...");
    const { email, senha } = req.body;

    const user = await User.findOne({email}).select('+senha');

    if (!user) {
        return res.status(400).send({ error: 'Usuario não existe' })
    }

    if (!await bcrypt.compare(senha, user.senha)) {
        return res.status(400).send({ error: 'Senha invalida' })
    }

    user.senha = undefined;

    res.send({ 
        user, 
        token: generateToken({id: user.id}),
     });
});

module.exports = server => server.use('/api/v1/autenticacao', router);