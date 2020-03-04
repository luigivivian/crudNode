'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ValidationContract = require('../validators/base-validator');

exports.get = (req, res, next) => {
    Product.find({}, 'title slug price active tags').then(data => {
        res.status(201).send({ data: data });
    }).catch(e => {
        res.status(400).send({ data: e });
    });
};


exports.getBySlug = (req, res, next) => {
    Product.findOne({ slug: req.params.slug },'title slug price active tags')
    .then(data => {
        res.status(201).send({ data: data });
    }).catch(e => {
        res.status(400).send({ data: e });
    });
};

exports.getByTag = (req, res, next) => {
    Product.find({ tags: req.params.tag, active: true},'title slug price active tags')
    .then(data => {
        res.status(201).send({ data: data });
    }).catch(e => {
        res.status(400).send({ data: e });
    });
};

exports.getById = (req, res, next) => {
    Product.findById(req.params.id)
    .then(data => {
        res.status(201).send({ data: data });
    }).catch(e => {
        res.status(400).send({ data: e });
    });
};



exports.post = (req, res, next) => {

    // #mongodb possui as validações no model, nesse caso não seria necessario efetuar as validações
    // porém ao se integrar com mysql ou outro banco validações são necessarias.

    let validation = new ValidationContract();
    validation.hasMinLen(req.body.title, 'O titulo precisa de no minimo 3 caracteres', 3);
    validation.hasMinLen(req.body.slug, 'O titulo precisa de no minimo 3 caracteres', 3);
    validation.hasMinLen(req.body.description, 'O titulo precisa de no minimo 3 caracteres', 3);

    if(!validation.isValid()){
        res.status(400).send(validation.errors()).end();
    }


    //new product
    var product = new Product();

    product.title = req.body.title;
    product.description = req.body.description;
    product.slug = req.body.slug;
    product.price = req.body.price;
    product.active = req.body.active;
    product.tags = req.body.tags;
    product.save().then(x => {
        res.status(201).send({ message: 'product saved !' });
    }).catch(e => {
        res.status(400).send({ message: 'fail to save product !', data: e });
    });
}; 

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            slug: req.body.slug,
            price: req.body.price,
            active: req.body.active,
            tags: req.body.tags,
        }
    }).then(x=>{
        res.status(201).send({ message: 'updated success !' });
    }).catch(e=>{
        res.status(201).send({ message: 'update failed !' , data: e});
    });
};

exports.delete = (req, res, next) => {
    Product.findOneAndRemove(req.params.id)
    .then(x=>{
        res.status(201).send({ message: 'delete success !' });
    }).catch(e=>{
        res.status(201).send({ message: 'delete failed !' , data: e});
    });
}; 