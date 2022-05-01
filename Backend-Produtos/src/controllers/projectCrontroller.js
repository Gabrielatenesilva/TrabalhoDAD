const express = require('express');

const Produto = require('../models/produto');

const router = express.Router();

router.get('/', async (req, res) => {
    console.log("[Produto]Chamando endpoint de buscar lista de produtos...");
    try {
        const produto = await Produto.find();
        return res.send({produtos: produto});
    } catch (error) {
        return res.status(400).send({ error: "Erro ao buscar a lista de produtos"});
    }
});

router.get('/:produtoId', async (req, res) => {
    console.log("[Produto]Chamando endpoint de buscar um produto por ID...");
    try {
        const produto = await Produto.findById(req.params.produtoId);
        if(produto === null){
            res.status(400).send({ error: "Erro ao buscar o produto pelo ID"});
        }
        return res.send({produtos: produto});
    } catch (error) {
        return res.status(400).send({ error: "Erro ao buscar o produto pelo ID"});
    }
});

router.post('/', async (req, res) => {
    console.log("[Produto]Chamando endpoint de criar um produto...");
    try {
        const produto = await Produto.create(req.body);
        return res.send({produto: produto});
    } catch (error) {
        return res.status(400).send({ error: "Erro ao criar um produto"});
    }
});

router.put('/:produtoId', async (req, res) => {
    console.log("[Produto]Chamando endpoint de atualizar um produtos por ID...");
    try {
        const { nomeProduto,valor, quantidade } = req.body;
        const produto = await Produto.findByIdAndUpdate(req.params.produtoId,{
            nomeProduto, valor, quantidade
        }, {new : true});
        return res.send({produto: produto});
    } catch (error) {
        return res.status(400).send({ error: "Erro ao criar um produto"});
    }
});

router.delete('/:produtoId', async (req, res) => {
    console.log("[Produto]Chamando endpoint de deletar um produto por ID...");
    try {
        const produto = await Produto.findByIdAndRemove(req.params.produtoId);
        return res.send();
    } catch (error) {
        return res.status(400).send({ error: "Erro ao deletar um produto pelo ID"});
    }
});


module.exports = server => server.use('/api/v1/produto', router);