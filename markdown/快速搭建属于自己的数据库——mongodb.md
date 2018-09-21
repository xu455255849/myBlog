为了真实模拟一个项目上线，拥有前端后端数据库都具备的功能，我选择了mongodb作为项目的数据库支持，这里分享一些mongodb的经验心得和血的教训。

## mongoddb安装
* 在本地安装 

直接通过官网下载机子对应的压缩包 [mongodb](https://www.mongodb.com/download-center?jmp=homepage#community)

* 在云服务器（centos系统）安装

```
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-3.4.9.tgz

tar zxvf mongodb-linux-x86_64-3.2.6.tgz
mv mongodb-linux-x86_64-3.2.6.tgz mongodb
cd mongodb

///

```

![mongodb官方下载](http://upload-images.jianshu.io/upload_images/3765249-4f2206a7df389486.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 请根据你的的系统下载相应的版本～

## 环境配置&启动服务器

在文件目录下建立存放数据的文件夹 一般目录就是 /usr/local/mongodb/data/db/  通过运行命令去启动mongodb

```
./bin/mongod --dbpath=/usr/local/mongodb/data/db/ --rest
```
这里有几个参数重点说明一下，mongod为你mongodb 的命令行支持可以启动，如果有需要可以通过编辑 /etc/profile 编辑进 全局环境，dbpath 也就是数据路径，对应你建立的data目录即可。--rest则是一个图形支持
mongodb的默认路径为 //localhost:27017 运行成功后访问这个地址酒会有成功的提示  加上rest参数 可以访问//localhost：28017 

./bin/mongo 可以打开shell  
 常用命令：

```
 ＃查询所有数据库    show dbs;
 ＃删除当前使用数据库   db.dropDatabase();
 #克隆主机数据   db.cloneDatabase(“127.0.0.1”);
 #修复当前数据库 db.repairDatabase();
 #查看当前使用的数据库  db.getName();
 #显示当前db状态  db.stats();
 #查看当前db的链接机器地址  db.version();   
 
 
```

## 云服务器上部署mongodb环境

现在云端非常流行，很多人选择了用云服务器来部署自己的项目，这里就介绍一下云端的mongodb配置。

```
./bin/mongod --fork --dbpath=/usr/local/mongodb/data/db/ --logpath=/usr/local/mongodb/data/log/error.log -logappend --rest
```
数据库部署到云服务器就需要后台运行，一开始用的centos的forever插件，发现并不能后台运行数据库。查阅了一下资料发现官方就有命令 －－fork 启动后台服务  --logpath --logappend参数 为后台服务加个log日志 rest效果同上面。

## 让数据库更直观

密密麻麻的数据是不是很丑？很难受？这个时候我们就需要一个美化数据库的插件了 

网上有很多 如 mongovue ， adminmongo  可以搜索活着Github上查阅一下。这里我使用了 adminmongo   [Github:[adminmongo]](https://github.com/mrvautin/adminMongo)


> 以下是数据库加密，我也是上线被攻击后才痛定思痛更新了加密过程。



## 前言

那天，本屌丝终于回忆起被人扫了数据库的恐惧。。。整个数据库无缘无故的消失，看了一下链接记录，我不得不接受这个现实，就算不是商业的东西，只要上线就有被攻击的可能性。痛定思痛，我决心给mongodb上用户认证，和端口权限。

这篇文章就是这个血的教训之后的成果。

环境为云服务器centos系统。 --fork 永久运行mongodb。


## 添加超级管理员

首先，运行你的数据库，成功后执行shell操作。

```
> use admin
> db.createUser(
   {
     user: "your name",
     pwd: "your pwd",
     roles: [ { role: "root", db: "admin" } ]
   }
)
Successfully added user: {
    "user" : "admin",
    "roles" : [
        {
            "role" : "root",
            "db" : "admin"
        }
    ]
}

```

root表示超级权限，这样就创建了具有超级权限的账号了。可以通过以下命令来查看用户。


![Uploading image_088895.png . . .]


```
db.getUsers()
```

## MongoDB数据库角色

role指角色，管理控制数据库的权限，第一个用户最好是root用户，可以执行任何操作，

> ⚠️ 初始化最好创建root权限的用户，当开启auth模式，任何操作都需要权限才能执行。也千万不能直接auth启动后台运行模式，否则你就没有权限用户去关闭数据库。

 * Read：允许用户读取指定数据库
 * readWrite：允许用户读写指定数据库
 * dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
 *  userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
 * clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
 * readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
 * readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
 * userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
 * dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
 * root：只在admin数据库中可用。超级账号，超级权限
 




##  启动auth模式

在创建完超级管理员后，才能真正启动加密的数据库，否则即使你自己也无权去操作数据库。

```
 //后台模式需要在shell中关闭之前的普通模式数据库，输入以下命令
 > use admin
 > db.shutdownServer()

//终端 启动加密数据库 --auth
$ ./bin/mongod --fork --dbpath=/root/mongodb/db/ --logpath=/root/mongodb/log/error.log -logappend --auth

//通过命令运行数据库 ，在你的运行命令加上后缀 --auth，这样就启动了加密数据库 ，再次执行数据库操作

> show dbs

2017-09-23T14:09:58.922+0800 E QUERY    [thread1] Error: listDatabases failed:{
	"ok" : 0,
	"errmsg" : "not authorized on admin to execute command { listDatabases: 1.0 }",
	"code" : 13,
	"codeName" : "Unauthorized"
} :
_getErrorWithCode@src/mongo/shell/utils.js:25:13
Mongo.prototype.getDBs@src/mongo/shell/mongo.js:62:1
shellHelper.show@src/mongo/shell/utils.js:769:19
shellHelper@src/mongo/shell/utils.js:659:15
@(shellhelp2):1:1

//  发现报错，需要认证信息

> db.auth('your name','your pwd')

成功返回1  失败返回0 输入之前创建的超级账号，OK，简单的加密就完成了。
 

```


![Uploading image_013130.png . . .]



![加密成功，需要认证才能操作数据库](http://upload-images.jianshu.io/upload_images/3765249-26bdf618e03206e7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##  链接加密数据库

数据库加密后我们的服务端代码也要相应变动。

```

xxx.db('mongodb://your name: your pwd@localhost:27017/db?authSource=admin');
```
 xxx表示你用的插件 比如 mongoose 、mongoskin之类的。
 
 到此为止，你的数据库就加密完成了，当你的项目变大，你也许还需要创建许多用户，或者升级用户权限，这些官方都有相关的API去操作。
 
 
 本文主要简单介绍了一下主要的加密过程，还有很多相关的东西，有需要可以自己查看官方文档。
 
 传送门： [docs.mongodb](https://docs.mongodb.com/master/reference/method/js-role-management/)
 

## 总结

这次的惨痛教训让我在云服务器部署网站再也不那么随便了，不能因为只是个小东西 小demo就放松啊。。。，不能开放的端口绝对不能开，
比如mongo的 27017 28017端口，我们都不能在服务器端口中开放。
不要止于前端，必要的后端和服务器知识，有时候说不定会让你思考出不一样的火花。
该加密的东西还是要加密的。前段之路远且长，与诸君共勉。

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)