'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');



exports.get = async(data) => {
    //new product
  var res = await Order.find({});
  return res;
}


 exports.create = async(data) => {
      //new product
    var order = new Order(data);
    await order.save();
 }
