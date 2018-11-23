const express = require("express");
const mongoose = require("mongoose");
const Goods = require('../../models/goods');
const Users = require('../../models/users');
//  connect() 返回一个状态待定（pending）的连接
mongoose.connect('mongodb://localhost:27017/mall_data');  //'mongodb://root:123456@localhost:27017/mall_data'

let db = mongoose.connection;   //连接mongoDB数据库
//检测连接状态
db.on("connected", function () {
  console.log("MongoDB connected success");
})
db.on("error", function () {
  console.log("MongoDB connected failed");
})
db.on("disconnected", function () {
  console.log("MongoDB connected disconnected");
})
module.exports = function () {
  let router = express.Router();

  //获取商品信息
  router.get("/", (req, res) => {
    //后台接口实现分页和排序功能
    let page = parseInt(req.query.page);
    let pageSize = parseInt(req.query.pageSize);
    let sort = req.query.sort;
    let skip = (page - 1) * pageSize;   //
    let params = {};

    //价格过滤功能
    let priceLevel = req.query.priceLevel;
    if (priceLevel != 'all') {
      switch (priceLevel) {
        case '0':
          priceGt = 0;
          priceLt = 100;
          break;
        case '1':
          priceGt = 100;
          priceLt = 500;
          break;
        case '2':
          priceGt = 500;
          priceLt = 1000;
          break;
        case "3":
          priceGt = 1000;
          priceLt = 5000;
          break;
      }
      params = {
        salePrice: {
          $gt: priceGt,
          $lt: priceLt
        }
      }
    }
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);   //定义一个模型，find可以返回一个模型
    goodsModel.sort({'salePrice': sort});
    //http://localhost:3000/goods?page=1&pageSize=8&priceLevel=0&sort=1
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

  //加入购物车
  router.post("/addCart", (req, res) => {
    let userId = "100000077";   //通过userId查询用户是否存在
    let productId = req.body.productId;
    //console.log(productId);
    Users.findOne({ userId: userId}, (err, userData) => {
      if (err) {
        res.json({
          'code': 1,
          'msg': err.message
        })
      } else {
        if (userData) {
          let goodsItem = '';
          userData.cartList.forEach((item) => {
            if (item.productId == productId) {
              goodsItem = item;
              item.productNum++
            }
          });
          if (goodsItem) {
            userData.save((err, data) => {
              if (err) {
                res.json({
                  code: 1,
                  msg: err.message
                })
              } else {
                res.json({
                  code: 0,
                  msg: '',
                  result: 'success save'
                })
              }
            })
          } else {
            Goods.findOne({productId: productId}, (err1, productData) => {
              console.log(err1, productData);
              if (err1) {
                res.json({
                  code: "1",
                  msg: err1.message
                })
              } else {
                if (productData) {
                  productData.productNum = 1;
                  productData.checked = 1;
                  console.log(productData);
                  userData.cartList.push(productData);
                  userData.save((err,data)=>{
                    if (err) {
                      res.json({
                        code: 1,
                        msg: err.message
                      })
                    }else{
                      res.json({
                        code: 0,
                        msg: '',
                        result: 'success save'
                      })
                    }
                  })
                }
              }
            })
          }

        }
      }
    })
  })
  return router;
}
