/**
 * Created by xushaoping on 17/7/26.
 */


var fs = require('fs');
var http = require('http');
var url = require('url');
var util = require('util');
// 引入处理路径的模块
var path = require('path');

var express = require('express');
var app = express();

// 引入处理post数据的模块
//var querystring = require('querystring');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
  const html = fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})

app.post('/login', function (req, res) {
  // 输出 JSON 格式
  var response = {
    "username":req.body.username,
    "password":req.body.password
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

var server = app.listen(8888, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

