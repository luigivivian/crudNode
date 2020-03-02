'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//connect banco
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true}).then(() => {
    console.log('Database conection: TRUE: ');
}).catch((err)=>{
    console.log('Erro ao conectar com mongodb: ' +err);
});


//models
const Product = require('./models/product');


//carrega as rotas da aplicação
const indexRoute = require('./routes/index-route');
const productRoute = require('./routes/product-route')
//-----------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.use('/', indexRoute);
app.use('/products', productRoute)

module.exports = app; 