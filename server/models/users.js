const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "orderList": Array,
  "cartList": [
    {
      "productId": String,
      "productName": String,
      "productImage": String,
      "salePrice": Number,
      "productNum": Number,
      "checked": Number,
    }
  ],
  "addressList": [
    {
      "addressId": String,
      "userName": String,
      "streetName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    }
  ],
});

const model = mongoose.model('User', userSchema, 'users');    //创建一个model

module.exports = model;
