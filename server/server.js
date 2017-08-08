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
app.get('／', function(req, res) {
  const html = fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html)
});


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

var db = require('mongoskin').db('mongodb://localhost:27017/blog');
var ObjectId = require('mongodb').ObjectID;

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
 * 发布文章
 */
app.post('/article/publish', function (req, res) {
  var data= {
    title: req.body.title,
    intro: req.body.intro,
    content: req.body.content,
    imgPath: req.body.imgPath,
    time: req.body.time,
    cate: req.body.cate
  };
  switch (data.cate) {
    case 1:
      var col = db.collection('foreendList');
      break;
    case 2:
      var col = db.collection('backendList');
      break;
    case 3:
      var col = db.collection('otherList');
      break;
    case 4:
      var col = db.collection('liveList');
      break;

  }
  function runAsync1() {
    var p = new Promise(function(resolve, reject) {
      col.insert(data, function(err, result) {
        if(err)
        {
          res.end('Error:'+ err)
        }
        resolve(1);
      });
    });
    return p
  }
  function runAsync2() {
    var p = new Promise(function(resolve, reject) {
      db.collection('articleList').insert(data, function(err, result) {
        if(err)
        {
          res.end('Error:'+ err)
        }
        resolve(1);
      });
    });
    return p
  }
  Promise.all([runAsync1(), runAsync2()])
    .then(function(result){
      console.log(result);
      res.end(JSON.stringify(data))
    });
});

/**
 * 获取文章列表
 */
app.get('/article/list', function (req, res) {
  var arg = qs.parse(url.parse(req.url).query);
  var page = Number.parseInt(arg.page) - 1;
  var limit = Number.parseInt(arg.limit);
  var menu = arg.isActive;
  var search = arg.search;
  switch (menu) {
    case '1':
      var col = db.collection('articleList');
      break
    case '2':
      var col = db.collection('foreendList');
      break
    case '3':
      var col = db.collection('backendList');
      break
    case '4':
      var col = db.collection('otherList');
      break
    case '5':
      var col = db.collection('liveList');
      break
  }

  if (search === undefined) {
    function runAsync1() {
      var p = new Promise(function(resolve, reject) {
        col.find().toArray(function(err, result) {
          if (err) {
            throw err;
          }
          resolve(result.length);
        });
      });
      return p
    }
    function runAsync2() {
      var p = new Promise(function(resolve, reject) {
        col.find().sort({"time": -1}).limit(limit).skip(page*limit).toArray(function(err, result) {
          if (err) throw err;
          resolve(result);
        });
      });
      return p
    }
  } else if (search !== undefined) {
    function runAsync1() {
      var p = new Promise(function(resolve, reject) {
        col.find({"title": eval("/"+search+"/i") }).toArray(function(err, result) {
          if (err) {
            throw err;
          }
          resolve(result.length);
        });
      });
      return p
    }
    function runAsync2() {
      var p = new Promise(function(resolve, reject) {
        col.find({"title": eval("/"+search+"/i") }).sort({"time": -1}).limit(limit).skip(page*limit).toArray(function(err, result) {
          if (err) throw err;
          resolve(result);
        });
      });
      return p
    }
  }
  Promise.all([runAsync1(), runAsync2()])
      .then(function(result){
        var data = {
          total: result[0],
          list: result[1]
        };
        console.log(data);
        res.end(JSON.stringify(data))
      });
});

/**
 * 获取文章信息
 */
app.get('/article/info', function (req, res) {
  var arg = qs.parse(url.parse(req.url).query);
  var id = arg.id;
  console.log(id)
  db.collection('articleList').find({ "_id": ObjectId(id)}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result)
    res.end(JSON.stringify(result))
  });
});

/**
 * 获取留言板内容
 */
app.get('/board/get', function (req, res) {
  db.collection('board').find().sort({"position": -1}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result)
    res.end(JSON.stringify(result))
  });
});

/**
 * 提交留言信息
 */
app.post('/board/post', function (req, res) {
  var data = {
    date: req.body.date,
    name: req.body.name,
    content: req.body.content,
    time: req.body.time,
    position: req.body.position
  };
  db.collection('board').insert(data, function(err, result) {
    if(err) {
      res.end('Error:'+ err)
    }
    res.end('提交成功')
  });
});






app.get('/list', function (req, res) {
  // 输出 JSON 格式
  var arg = qs.parse(url.parse(req.url).query);
  console.log(arg.page)
  res.end('qweqwe');
});




app.post('/login', function (req, res) {
  // 输出 JSON 格式
  var response = {
    "username":req.body.username,
    "password":req.body.password
  };
  console.log(response);
  res.end(JSON.stringify(response));
  /*  var arg = url.parse(req.url).query;
   var sss = qs.parse(arg);*/

  //var urlObj =  util.inspect(url.parse(req.url, true))
});

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://%s:%s", host, port)

});

