const express = require('express');
const static = require('express-static');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const multer = require('multer');
const consolidate = require('consolidate');

//开启服务器，监听端口
const server = express();
server.listen(3000);

//cookie,session的处理
server.use(cookieParser("jjfakjfafadsfa"));
let keys = [];
for (let i = 0; i < 10000; i++) {
  keys[i] = 'key_' + Math.random();
}
server.use(cookieSession({
  name: 'admin',
  keys: keys,
  maxAge: 20 * 60 * 1000
}));

//处理post数据请求
//普通数据，请求的数据req.body中
server.use(bodyParser.urlencoded({
  extended: false,
  limit: 1000     //限制数据大小
}));
server.use(bodyParser.json());
//上传文件数据；请求数据在req.files中；post数据时需要加上：enctype="multipart/form-data"
server.use(multer({
  dest: './static/upload'    //存储上传文件的目录
}).any());

//后台模板引擎的配置
server.engine('html', consolidate.ejs);
server.set('views', './template'); //模板存放路径
server.set('view engine', 'html');

//登录拦截
server.use((req,res,next)=>{
  next();
})

//router
server.use('/', require('./router/web/index.js')());
server.use('/goods', require('./router/web/goods.js')());
server.use('/user', require('./router/web/user.js')());

//前端页面存放位置
server.use(static('./static/www'));
