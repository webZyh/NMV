const express = require("express");
const User = require('../../models/users');

const urlLib = require('url');
require('./../../util/util');
module.exports = function () {
  let router = express.Router();

  //登录
  router.post('/login', (req, res, next) => {
    let userName = req.body.username;
    let userPwd = req.body.password;
    let params = {
      userName,
      userPwd
    }
    console.log(params);
    User.findOne(params, (err, data) => {
      if (err) {
        console.log(1);
        console.log(err);
        res.json({
          code: 1,
          msg: err.message
        })
      } else {
        if (data) {
          //写入cookie
          res.cookie("userId", data.userId, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          res.cookie("userName", data.userName, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          //req.session['userId'] =  data.userId;
          res.json({
            code: 0,
            msg: '',
            data: {
              userName: data.userName
            }
          })
        }
      }
    })
  });
  //退出
  router.post('/logout', (req, res, next) => {
    res.cookie('userId', '', {
      path: '/',
      maxAge: -1
    });
    res.json({
      code: 0,
      msg: '',
      data: ''
    })
  });
  //检查登录状态
  router.get('/checkLogin', (req, res) => {
    if (req.cookies.userId) {
      res.json({
        code: 0,
        msg: '',
        data: req.cookies.userName || ''
      })
    } else {
      res.json({
        code: 1,
        msg: '未登录',
        data: ''
      })
    }
  })

  //购物车列表
  router.get('/cartList', (req, res) => {
    let userId = req.cookies.userId;
    User.findOne({userId: userId}, (err, data) => {
      if (err) {
        console.log(err);
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        res.json({
          code: 0,
          msg: '',
          data: data.cartList
        })
      }
    })
  });

  //购物车商品总数量
  router.get('/getCartCount', (req, res) => {
    let userId = req.cookies.userId;
    if (userId) {
      User.findOne({userId: userId}, (err, doc) => {
        if (err) {
          res.json({
            code: 1,
            msg: err.message,
            data: ''
          })
        } else {
          if (doc) {
            let cartCount = 0;
            doc.cartList.forEach((item) => {
              cartCount += parseInt(item.productNum);
            })
            res.json({
              code: 0,
              msg: '',
              data: cartCount
            })
          }
        }
      })
    }
  })
  //删除购物车中的商品
  router.post('/delCartShop', (req, res, next) => {
    let productId = req.body.productId;
    let userId = req.cookies.userId;

    User.updateOne({userId: userId}, {$pull: {cartList: {productId: productId}}}, (err, data) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        if (data) {
          res.json({
            code: 0,
            msg: 'operate success'
          })
        }
      }
    })
  })

  //修改商品数量
  router.post('/editCartShopCount', (req, res, next) => {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;

    User.updateOne({'userId': userId, 'cartList.productId': productId}, {
      'cartList.$.productNum': productNum,
    }, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        if (doc) {
          res.json({
            code: 0,
            msg: 'update success'
          })
        }
      }
    })
  })
  //修改商品是否选中属性
  router.post('/updateChecked', (req, res, next) => {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let checked = req.body.checked;

    User.updateOne({'userId': userId, 'cartList.productId': productId}, {
      'cartList.$.checked': checked,
    }, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        if (doc) {
          res.json({
            code: 0,
            msg: 'update success'
          })
        }
      }
    })
  })

  //点击全选/全不选
  router.post('/updateCheckedAll', (req, res) => {
    let userId = req.cookies.userId;
    let checkAll = req.body.checkAll;
    User.findOne({userId: userId}, (err, userDoc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        if (userDoc) {
          userDoc.cartList.forEach((item) => {
            /*if(checkAll == true){
              item.checked = 1;
            }else if(checkAll == false){
              item.checked = 0;
            }*/
            //console.log(checkAll);
            item.checked = checkAll;      //? 赋值是true和false，到数据库中怎么变成1和0的
          })
          userDoc.save((err, doc) => {
            if (err) {
              res.json({
                code: 1,
                msg: err.message,
                data: ''
              })
            } else {
              res.json({
                code: 0,
                data: doc,
                msg: 'operate success'
              })
            }
          })
        }
      }
    })
  })

  //地址列表
  router.get('/addressList', (req, res) => {
    let userId = req.cookies.userId;

    User.findOne({userId: userId}, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        if (doc) {
          res.json({
            code: 0,
            data: doc.addressList
          })
        }
      }
    })
  })

  //设置默认地址
  router.post('/defaultAddress', (req, res) => {
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;

    if (!addressId) {   //检查addressId是否传入
      res.json({
        code: 1,
        msg: 'userId is null',
      })
    } else {
      User.findOne({userId: userId}, (err, doc) => {
        if (err) {
          res.json({
            code: 1,
            msg: err.message,
            data: ''
          })
        } else {
          if (doc) {
            doc.addressList.forEach((item) => {
              if (item.addressId == addressId) {
                item.isDefault = true;
              } else {
                item.isDefault = false;
              }
            })
            doc.save((err, doc1) => {
              if (err) {
                res.json({
                  code: 1,
                  msg: err.message,
                  data: ''
                })
              } else {
                if (doc1) {
                  res.json({
                    code: 0,
                    data: '',
                    msg: 'setDefaultAddress success'
                  })
                }
              }
            })
          }
        }
      })
    }
  })

  //删除地址
  router.post('/delAddress', (req, res) => {
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    User.updateOne({userId: userId}, {$pull: {addressList: {addressId: addressId}}}, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        if (doc) {
          res.json({
            code: 0,
            msg: 'success',
            data: ''
          })
        }
      }
    })
  })

  //订单列表
  router.post('/payMent', (req, res) => {
    let userId = req.cookies.userId,
      addressId = req.body.addressId,
      orderTotal = req.body.orderTotal;

    User.findOne({userId: userId}, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          result: ''
        })
      } else {
        let address = '';
        let goodsList = [];
        //获取当前用户的地址信息
        doc.addressList.forEach((item) => {
          if (item.addressId == addressId) {
            address = item;
          }
        });
        //获取用户购买的商品
        doc.cartList.filter((item) => {
          if (item.checked == '1') {
            goodsList.push(item);
          }
        });

        //创建随机的订单id
        let r1 = Math.floor(Math.random() * 10);  //0-9的随机数
        let r2 = Math.floor(Math.random() * 10);

        let sysDate = new Date().Format('yyyyMMddhhmmss');
        let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');

        let platform = '815';
        let orderId = platform + r1 + sysDate + r2;
        //生成订单信息
        let order = {
          orderId: orderId,
          orderDate: createDate,
          orderStatus: '1',
          orderTotal: orderTotal,
          addressInfo: address,
          goodsList: goodsList
        }

        //插入订单列表中并保存
        doc.orderList.push(order);
        doc.save((err, doc2) => {
          if (err) {
            res.json({
              code: 1,
              msg: err.message,
              result: ''
            })
          } else {
            res.json({
              code: 0,
              msg: '',
              data: {
                orderId: order.orderId,
                orderTotal: orderTotal
              }
            })
          }
        })
      }
    })
  })

  //获取订单信息
  router.get('/orderDetail', (req, res) => {
    //urlLib.parse(req.url);
    let userId = req.cookies.userId;
    let orderId = req.query.orderId;  //req.param(name)获取get参数 已废除
    User.findOne({userId: userId}, (err, doc) => {
      if (err) {
        res.json({
          code: 1,
          msg: err.message,
          data: ''
        })
      } else {
        let orderList = doc.orderList;
        if (orderList.length > 0) {
          orderList.forEach((item) => {
            if (item.orderId == orderId) {
              let orderTotal = item.orderTotal;
              res.json({
                code: 0,
                data: {
                  orderTotal: orderTotal
                }
              })
            }
          })
        } else {
          res.json({
            code: '1001',
            msg: '订单不存在',
            data: ''
          })
        }
      }
    })
  })
  return router;
}


