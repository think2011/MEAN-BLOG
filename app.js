var express = require('express'),
    routes = require('./routes');

var app = express();
app.use(express.bodyParser());	// 用于接收JSON, urlencoded和multipart requests的请求
app.use(express.static(__dirname + '/app'));	// 设置静态目录路径

// 把app传入routes中，在routes/index.js中处理路由请求
routes(app);

// 启动服务
app.listen(3000);