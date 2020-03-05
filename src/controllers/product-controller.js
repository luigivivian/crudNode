'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/base-validator');
const repository = require('../repositories/product-repository');

exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};


exports.getBySlug = async(req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};

exports.getByTag = async(req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};

exports.getById = async(req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send({ data: data });
    } catch (error) {
        res.status(500).send({ data: error });
    }
};



exports.post = async(req, res, next) => {

    // #mongodb possui as validações no model, nesse caso não seria necessario efetuar as validações
    // porém ao se integrar com mysql ou outro banco validações são necessarias.

    let validation = new ValidationContract();
    validation.hasMinLen(req.body.title, 'O titulo precisa de no minimo 3 caracteres', 3);
    validation.hasMinLen(req.body.slug, 'O titulo precisa de no minimo 3 caracteres', 3);
    validation.hasMinLen(req.body.description, 'O titulo precisa de no minimo 3 caracteres', 3);

      // Se os dados forem inválidos
    if (!validation.isValid()) {
        res.status(400).send(validation.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send({data: 'Produto cadastrado com sucesso !'});
    } catch (error) {
        res.status(500).send({ data: error });
    }
}; 

exports.put = async(req, res, next) => {
    
    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(201).send({data: data });
    } catch (error) {
        
    }
};

exports.delete = async(req, res, next) => {
    try {
        var data = await repository.delete(req.body.id);
        res.status(201).send({data: data});
    } catch (error) {
        res.status(500).send({ data: error });
    }

}; 