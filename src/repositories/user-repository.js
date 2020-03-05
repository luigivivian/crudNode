'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

//

 exports.get = async() => {
     const res = await User.find({});
     return res;
 }

 exports.create = async(data) => {
      //new product
    var user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;

    await user.save();
 }
