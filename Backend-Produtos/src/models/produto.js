const mongoose = require('../database');
const bcrypt = require('bcryptjs');

const ProdutoSchema = new mongoose.Schema({
    nomeProduto:{
        type:String,
        require: true,
    },
    valor:{
        type:Number,
        require: true,
    },
    quantidade:{
        type:Number,
        require: true,
    },
    dataCriacao:{
        type: Date,
        default: Date.now,
    }
});

const Produto = mongoose.model('produtos', ProdutoSchema);

module.exports = Produto;