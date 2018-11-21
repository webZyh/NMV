const mongoose = require('mongoose');
const Schema = mongoose.Schema;   //定义表模型

let productSchema = new Schema({  //定义模型,对应数据库表中数据的名称和类型
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productImage":String
});
module.exports = mongoose.model("Good",productSchema,'goods');  //输出模型
