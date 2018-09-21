## 前言
为了模拟项目上线，我们就需要一个服务器去提供API给我们调用数据。这次我采用express框架去写API接口。所有请求都是通过ajax请求去请求服务器来返回数据。第一次用node写后端，基本就是摸着石头的过河，文中有什么不足不处欢迎指出。



## 安装express框架
传送门：   [express官方](http://www.expressjs.com.cn/)



然后介绍一下需要引入的中间件，node本身提供了一些库。我们可以直接通过require去引用，对于未提供的库，我们也可以通过手动npm去安装

```
var fs = require('fs');  操作文件模块
var http = require('http');  http模块
var url = require('url');   获取url信息模块
var qs = require('querystring'); 处理url参数模块
var path = require('path');  文件路径模块
var bodyParser = require('body-parser'); 请求体对象化 （必须）否则后台无法解析前端发送的body内容

```
接下来直接启用模块

```
app.use(bodyParser.json());

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')))
app.use(express.static('public'));

// 因为是单页应用 所有请求都走/dist/index.html
app.get('／', function(req, res) {
  const html = fs.readFile(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html)
});

//处理请求跨域

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Headers", "content-type");
  next();
});

```

准备工作做完可以开始动手写接口了。关于数据库可以模拟一个json，也可以真实模拟上线数据库。关于本文设计的mongodb数据库，有兴趣可以看我的另一篇文章
。

[快速搭建属于自己的数据库——mongodb](http://www.jianshu.com/p/63077a939398)

下面会划成3块说明——数据库的对接、请求的操作、文件请求的操作。 

## 数据库连接
这里我假设你已经安装了mongodb数据库并成功启用。仔细阅读express教程你会发现框架提供了对mongodb的支持，mongodb有非常多的扩展插件去使用该数据库 比如mongoose。这里我们使用express官方提供的mongoskin来链接数据库。

```
$ npm install mongoskin

＃＃＃＃＃官方实例

var db = require('mongoskin').db('localhost:27017/animals');

db.collection('mamals').find().toArray(function(err, result) {
  if (err) throw err;
  console.log(result);
});

```
安装成功后 ，我们就首先把使用的数据库引入，代码如下


```
var db = require('mongoskin').db('mongodb://localhost:27017/blog');
var ObjectId = require('mongodb').ObjectID;
```

以上代码表示我们成功连接了blog数据库并且启用了私有ID，objectID是mongodb生成数据自动添加的ID。可以直接拿来用。到这里数据库和服务器就已经对接完毕了。

## 对前端发送的请求进行处理

### 处理get请求


```
/**
 * 获取文章信息
 */
app.get('/article/info', function (req, res) {
  >>>  获取请求参数
  var arg = qs.parse(url.parse(req.url).query);
  var id = arg.id;
  >>>  链接数据库根据参数查找文档并返回
  db.collection('articleList').find({ "_id": ObjectId(id)}).toArray(function(err, result) {
    if (err) throw err;
    console.log(result)
    res.end(JSON.stringify(result))
  });
});
```
以上代码就实现了对一个get请求的处理，通过参数模块获取了url的参数，db也就是已经连接的数据库。根据ID对‘articleList’的数据表进行搜索，处理完毕后 通过res.end()返回数据结束响应。

### 处理post请求

```
/**
 * 提交留言信息
 */
app.post('/board/post', function (req, res) {
  >>>>  获取请求参数
  var data = {
    date: req.body.date,
    name: req.body.name,
    content: req.body.content,
    time: req.body.time,
    position: req.body.position
  };
  
  >>> 链接数据库并插入数据
  
  db.collection('board').insert(data, function(err, result) {
    if(err) {
      res.end('Error:'+ err)
    }
    res.end('提交成功')
  });
});
```

post请求的参数获取和get不同 可以直接通过req.body去获取前端传输的请求体。通过js对象的方式去获取参数。然后根据参数执行数据库操作。到此，基本的请求也就介绍完毕了。下面说下怎么处理图片的上传此类常见的文件操作需求。


## 对前端的文件请求进行处理

为了简化操作，我们可以引入multer模块来处理文件，代码如下

```
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
／／生成上传模块，让API调用
var upload = multer({
  storage: storage
}).single('file');

```
以上代码就成功引入了文件上传模块，通过该模块我们可以快速生成相应内容，具体使用方法可以查看官方文档。准备工作完成后，在项目中使用：

```
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

／／图片上传到服务器 ，向客户端返回文件信息
   比如文件的存储位置，之后就可以通过地址访问服务器的图片

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
```

这里上传图片我们就直接使用了直接之前已经写好的upload模块，当该接口请求成功时 ，文件就已经上传成功了，如果你需要一个预览过程，那不应该直接调用上传接口 。通过原生node fs模块 我们也能对添加的文件进行删除，修改操作。


## 上线以及上线后遇到的history模式的刷新问题


上线过程我们可以当作就是换一台电脑跑程序，这里我用的是阿里云的服务器。在云服务器安装好环境好，把项目克隆进去 ，再装个forever之类的永久运行库，start ～ok  这样你的项目就永远在运行了。如果需要www访问 ，还需要买个dns解析 和域名，指向你的服务器。

以上我们如果在本地跑项目基本已经可以没问题。但项目上线后一刷新。啊啦？？404什么鬼？打开百度一查。那炉火多～～当前端启用hisory模式，后台也必须开启对history的支持。express 环境如下：

以上我们如果在本地跑项目基本已经可以没问题。但项目上线后一刷新。啊啦？？404什么鬼？打开百度一查。那炉火多～～当前端启用hisory模式，后台也必须开启对history的支持。express 环境如下：

```
var history = require('connect-history-api-fallback');
var connect = require('connect');
／／／／／／／
app.use(history());
```
更新代码刷新～OK 完美！


## 总结

想学好一样东西，需要长久的积累。作为一个前端，一些服务器数据库的知识除了可以帮助我们更好的跟兄弟（后端）交流，对前端来说也是如鱼得水一般的存在。
下一篇文章准备写electron入门，electron是通过js构建桌面应用的框架，。共勉～～～～～

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)
