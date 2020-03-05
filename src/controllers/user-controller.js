'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');
const ValidationContract = require('../validators/base-validator');
const repository = require('../repositories/user-repository');
 



exports.post = async(req, res, next) => {

    // #mongodb possui as validações no model, nesse caso não seria necessario efetuar as validações
    // porém ao se integrar com mysql ou outro banco validações são necessarias.
    let validation = new ValidationContract();
    validation.hasMinLen(req.body.name, 'O titulo precisa de no minimo 3 caracteres', 3);
    validation.hasMinLen(req.body.email, 'Email invalido');
    validation.hasMinLen(req.body.password, 'O titulo precisa de no minimo 3 caracteres', 3);

      // Se os dados forem inválidos
    if (!validation.isValid()) {
        res.status(400).send(validation.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({data: 'Usuario criado com sucesso !'});
    } catch (error) {
        res.status(500).send({ data: error });
    }
}; 


exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};