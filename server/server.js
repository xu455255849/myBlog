/**
 * Created by xushaoping on 17/7/26.
 */

var fs = require('fs');
var http = require('http');
var url = require('url');
var util = require('util');
//var urlObj =  util.inspect(url.parse(req.url, true))
// 引入处理路径的模块
var path = require('path');

var express = require('express');
var app = express();

// 引入处理post数据的模块
var qs = require('querystring');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/', function(req, res) {
  const html = fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


/**
 * 请求接口 ／／／／／／／／／／／／／／链接数据库
 */
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/blog';


/**
 * 获取文章列表
 */
app.get('/article/list', function (req, res) {
  MongoClient.connect(DB_CONN_STR, function(err, db) {
    var collection = db.collection('runboo');
    collection.find({}).toArray(function(err, result) {
      if(err)
      {
        console.log('Error:'+ err);
        return;
      }
      console.log(result)
      res.end(result)
      db.close();
    });

  });
/*  MongoClient.connect(DB_CONN_STR, function(err, db) {
    var collection = db.collection('runboo');
    //var data = db.col.find().pretty()

    res.end('qqqq');
    console.log(collection)
    db.close();

  })*/

/*  var arg = url.parse(req.url).query;
  var sss = qs.parse(arg);*/

});




app.get('/list', function (req, res) {
  // 输出 JSON 格式
  var arg = url.parse(req.url).query;
  var sss = qs.parse(arg);
  res.end(JSON.stringify(sss));
});




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

