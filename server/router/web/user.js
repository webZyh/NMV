const express = require("express");
const User = require('../../models/users');
module.exports = function(){
  let router = express.Router();

  //登录
  router.post('/login',(req,res,next)=>{
    let userName = req.body.username;
    let userPwd = req.body.password;
    let params={
      userName,
      userPwd
    }
    console.log(params);
    User.findOne(params,(err,data)=>{
      if (err){
        console.log(1);
        console.log(err);
        res.json({
          code:1,
          msg:err.message
        })
      }else{
        if (data){
          //写入cookie
          res.cookie("userId", data.userId,{
            path:'/',
            maxAge:1000*60*60
          })
          res.cookie("userName", data.userName,{
            path:'/',
            maxAge:1000*60*60
          })
          //req.session['userId'] =  data.userId;
          res.json({
            code:0,
            msg:'',
            data:{
              userName:data.userName
            }
          })
        }
      }
    })
  });
  //退出
  router.post('/logout',(req,res, next)=>{
    res.cookie('userId','',{
      path:'/',
      maxAge:-1
    });
    res.json({
      code:0,
      msg:'',
      data:''
    })
  });
  //检查登录状态
  router.get('/checkLogin',(req,res)=>{
    if(req.cookies.userId){
      res.json({
        code:0,
        msg:'',
        data:req.cookies.userName || ''
      })
    }else{
      res.json({
        code:1,
        msg:'未登录',
        data:''
      })
    }
  })

  //购物车列表
  router.get('/cartList',(req,res)=>{
    let userId = req.cookies.userId;
    User.findOne({userId:userId},(err,data)=>{
      if(err){
        console.log(err);
        res.json({
          code:1,
          msg:err.message,
          data:''
        })
      }else{
        res.json({
          code: 0,
          msg:'',
          data: data.cartList
        })
      }
    })
  });
  //删除购物车中的商品
  router.post('/delCartShop',(req,res,next)=>{
    let productId = req.body.productId;
    let userId = req.cookies.userId;

    User.updateOne({userId:userId},{$pull:{cartList:{productId: productId}}},(err,data)=>{
      if(err){
        res.json({
          code:1,
          msg: err.message,
          data:''
        })
      }else{
        if(data){
          res.json({
            code: 0,
            msg:'operate success'
          })
        }
      }
    })
  })

  //修改商品数量
  router.post('/editCartShopCount',(req,res,next)=>{
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;

    User.updateOne({'userId':userId , 'cartList.productId':productId},{
      'cartList.$.productNum':productNum,
    },(err,doc)=>{
      if(err){
        res.json({
          code: 1,
          msg:err.message,
          data:''
        })
      }else{
        if(doc){
          res.json({
            code:0,
            msg:'update success'
          })
        }
      }
    })
  })
  //修改商品是否选中属性
  router.post('/updateChecked',(req,res,next)=>{
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let checked = req.body.checked;

    User.updateOne({'userId':userId , 'cartList.productId':productId},{
      'cartList.$.checked':checked,
    },(err,doc)=>{
      if(err){
        res.json({
          code: 1,
          msg:err.message,
          data:''
        })
      }else{
        if(doc){
          res.json({
            code:0,
            msg:'update success'
          })
        }
      }
    })
  })

  //点击全选/全不选
  router.post('/updateCheckedAll',(req,res)=>{
    let userId = req.cookies.userId;
    let checkAll = req.body.checkAll;
    User.findOne({userId:userId},(err,userDoc)=>{
      if(err){
        res.json({
          code:1,
          msg:err.message,
          data:''
        })
      }else{
        if(userDoc){
          userDoc.cartList.forEach((item)=>{
            /*if(checkAll == true){
              item.checked = 1;
            }else if(checkAll == false){
              item.checked = 0;
            }*/
            //console.log(checkAll);
            item.checked = checkAll;      //? 赋值是true和false，到数据库中怎么变成1和0的
          })
          userDoc.save((err,doc)=>{
            if(err){
              res.json({
                code:1,
                msg:err.message,
                data:''
              })
            }else{
              res.json({
                code:0,
                data:doc,
                msg:'operate success'
              })
            }
          })
        }
      }
    })
  })
  return router;
}
