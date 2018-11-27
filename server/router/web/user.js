const express = require("express");
const User = require('../../models/users');
module.exports = function(){
  let router = express.Router();

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
  return router;
}
