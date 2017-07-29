/**
 * Created by xushaoping on 17/7/26.
 */


var fs = require('fs');
var http = require('http');
var url = require('url');
var util = require('util');
var path = require('path');

// 引入处理post数据的模块
var qs = require('querystring');
var bodyParser = require('body-parser');
var multer  = require('multer');
var storage = multer.diskStorage({
  //设置上传后文件路径，uploads文件夹会自动创建。
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  //给上传文件重命名，获取添加后缀名
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});
var upload = multer({
  storage: storage
}).single('file');

var express = require('express');
var app = express();




app.use(bodyParser.json());

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static('public'));
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/', function(req, res) {
  const html = fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
  res.send(html)
})


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});


/**
 * 请求接口 ／／／／／／／／／／／／／／链接数据库
 */

/**
 * 图片上传
 */
app.post('/upload', function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      console.log(err)
      return
    }
    console.log(req.file)
    res.end(JSON.stringify(req.file))
  })
});

/**
 * 图片删除
 */
app.post('/image/delete', function (req, res) {
  fs.unlink(req.body.path, function(err) {
    if (err) {
      return console.error(err);
    }
    res.end("文件删除成功！");
  });
});

/**
 * 获取文章列表
 */
app.get('/article/list', function (req, res) {

  var db = require('mongoskin').db('mongodb://localhost:27017/blog');
  db.collection('articleList').find().toArray(function(err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result))

  });




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
  //var urlObj =  util.inspect(url.parse(req.url, true))
});

var server = app.listen(8888, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

