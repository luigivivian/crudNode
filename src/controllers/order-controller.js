'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.post = async(req, res, next) => {
    try {
        await repository.create({
            customer: req.body.customer,
            code: guid.raw().substring(0, 6),
            items : req.body.items

        });
        res.status(201).send({data: 'Pedido criado com sucesso !'});
    } catch (error) {
        res.status(500).send({error: error});
    }
}


exports.get = async(req, res, next) => {
    try {
        var data = await repository.get();
        res.status(201).send({data: data});
    } catch (error) {
        res.status(500).send({error: error});
    }

}