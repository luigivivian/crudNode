'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');


 exports.get = async() => {
     const res = await Product.find({
        active: true
     }, 'title price slug');
     return res;
 }

 exports.getBySlug = async(slug) => {
     const res = await Product.findOne({ slug: slug },'title slug price active tags');
    return res;
 }

 exports.getById = async(id) => {
    const res = await Product.findById(id);
    return res;
 }

 exports.getByTag = async(tag) => {
    const res = await Product.find({ tags: tag, active: true},'title slug price active tags');
    return res;
 }

 exports.create = async(data) => {
      //new product
    var product = new Product();
    product.title = data.title;
    product.description = data.description;
    product.slug = data.slug;
    product.price =data.price;
    product.active = data.active;
    product.tags = data.tags;
    await product.save();
 }

 exports.update = async(id, data) => {
    const res = await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            slug: data.slug,
            price: data.price,
            active: data.active,
            tags: data.tags,
        }
    });
    return res;
 }

 exports.delete = async(id) => {
    return await Product.findByIdAndDelete(id);
 }