const express = require('express');
const { header } = require('express/lib/response');
const axios = require('axios').default;
const res = require('express/lib/response');

const router = express.Router();

router.post('/registrar', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint de registrar na [Autenticacao]...");
    try {
        const response = await axios.post('http://localhost:3000/api/v1/autenticacao/registrar', req.body);
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.post('/autenticar', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint de autenticar na [Autenticacao]...");
    try {
        const response = await axios.post('http://localhost:3000/api/v1/autenticacao/autenticar', req.body);
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.post('/verificar', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint de verificar na [Autenticacao]...");
    axios.defaults.headers.common['Authorization'] = req.headers.authorization;
    try {
        const response = await axios.post('http://localhost:3000/api/v1/autenticacao/verificar');
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.post('/consultarcep', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint de consultar CEP na [ViaCep]...");
    const urlviacep = "https://viacep.com.br/ws/" + req.body.cep + "/json/";
    try {
        const response = await axios.get(urlviacep);
        if (response.data.erro == undefined) {
            return res.send({
                status: "Realizado com sucesso",
                resultado: response.data,
            });
        }
        return res.status(400).send({
            status: "Erro ao realizar operação",
            erro: "Cep invalido ou não registrado em nosso sistema",
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: "Cep invalido",
        });
    }
});

router.get('/listar', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint para buscar uma lista de produtos [Produto]...");
    try {
        const response = await axios.get('http://localhost:4000/api/v1/produto');
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.get('/buscar/:produtoId', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint para buscar um produto por ID [Produto]...");
    const urlbuscarId = "http://localhost:4000/api/v1/produto/" + req.params.produtoId;
    try {
        const response = await axios.get(urlbuscarId);
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.post('/criar', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint para criar um produto [Produto]...");
    try {
        const response = await axios.post('http://localhost:4000/api/v1/produto', req.body);
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error?.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.put('/atualizar/:produtoId', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint para criar um produto [Produto]...");
    const urlatualizarId = "http://localhost:4000/api/v1/produto/" + req.params.produtoId;
    try {
        const response = await axios.put(urlatualizarId, req.body);
        return res.send({
            status: "Realizado com sucesso",
            resultado: response.data,
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

router.delete('/deletar/:produtoId', async (req, res) => {
    console.log("[Distribuidora]Chamando endpoint para criar um produto [Produto]...");
    const urldeletarId = "http://localhost:4000/api/v1/produto/" + req.params.produtoId;
    try {
        const response = await axios.delete(urldeletarId);
        return res.send({
            status: "Realizado com sucesso",
            resultado: "Deletado com sucesso",
        });
    } catch (error) {
        return res.status(error.response.status).send({
            status: "Erro ao realizar operação",
            erro: error.response.data.error,
        });
    }
});

module.exports = server => server.use('/api/v1', router);