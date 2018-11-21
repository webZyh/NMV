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
    Goods.find({}, (err, data) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message
        });
      } else {
        res.json({
          code: 0,
          result: {
            count: data.length,
            list: data
          }
        })
      }
    })
  })

  return router;
}
