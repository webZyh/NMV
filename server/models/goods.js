//1、引入mongoose
const mongoose = require('mongoose');

//2、new 创建Schema模型
const Schema = mongoose.Schema;   //定义表模型

let productSchema = new Schema({  //定义模型,对应数据库表中数据的名称和类型
  "productId":{type:String},
  "productName":String,
  "salePrice":Number,
  "productImage":String,
  "productNum":Number,
  "checked":Number
});
//3、创建Model并导出
module.exports = mongoose.model("Good",productSchema,'goods');  //输出模型

//由导出的modal对数据库进行增删改查的操作。
