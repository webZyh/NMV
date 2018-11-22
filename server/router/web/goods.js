const express = require("express");
const mongoose = require("mongoose");
const Goods = require('../../models/goods');

//连接mongoDB数据库
mongoose.connect('mongodb://localhost:27017/mall_data');  //'mongodb://root:123456@localhost:27017/mall_data'

//检测连接状态
mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success");
})
mongoose.connection.on("error", function () {
  console.log("MongoDB connected failed");
})
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected");
})
module.exports = function () {
  let router = express.Router();

  router.get("/goods", (req, res) => {
    //后台接口实现分页和排序功能
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let sort = req.query.sort;
    let skip = (page-1)*pageSize;
    let params = {};

    //价格过滤功能
    let priceLevel = req.query.priceLevel;
    if(priceLevel!='all'){
      switch (priceLevel){
        case '0':  priceGt= 0; priceLt=100;
          break;
        case '1':  priceGt= 100; priceLt=500;
          break;
        case '2':  priceGt= 500; priceLt=1000;
          break;
        case "3":  priceGt= 1000; priceLt=5000;
          break;
      }
      params={
        salePrice:{
          $gt:priceGt,
          $lt:priceLt
        }
      }
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);   //定义一个模型，find可以返回一个模型
    goodsModel.sort({'salePrice':sort});

    goodsModel.exec((err, data) => {   //Goods.find({},
      if (err) {
        res.json({
          code: 1,
          msg: err.message
        });
      } else {
        res.json({
          code: 0,
          data: {
            count: data.length,
            list: data
          }
        })
      }
    })
  })

  return router;
}
