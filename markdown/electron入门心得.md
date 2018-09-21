## 前言

前端开发桌面程序这个概念已经出现有一段时间了，这项技术也已经走向成熟，Github上nw和光electron的star就差不多有10w颗星了，github也衍生出了很多开源的桌面项目俨然成了一个热门项目。既然这么热，那就一个字：学。

> 本文主要帮助js基础比较薄弱，又没有接触过electron的同学更好的学习electron，文中有什么不足之处或者错误，欢迎指出。



![electron](http://upload-images.jianshu.io/upload_images/3765249-74024ea32b3e3fcd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## electron 安装

 npm命令安装electron库

```
npm install electron --save-dev --save-exact
```
传送门：[electron官方Github](https://github.com/electron/electron)

## 如何快速上手electron

刚接触一个新东西，难免一头雾水，如果多看一点相关的文章势必会有一个方向感，去更好的上手新东西。上手electron，官方提供了一个非常好的快速上手实例。

```
git clone https://github.com/electron/electron-quick-start
cd electron-quick-start
npm install
npm start
```

这个仓库给我们初始化了一个electron项目，结构非常纯净，克隆下来你就可以直接改造成自己的项目。

## electron API

官方api（英文）  [官方docs](https://electron.atom.io/docs/)

翻译API（版本有偏差）[翻译版docs](https://www.w3cschool.cn/electronmanual/)

国内也有翻译版的API文档，但是不能保证是最新的，使用时一定要看好自己的版本和翻译版。使用翻译版API。同时可以看看官方的更新日志，看看有什么新功能。官方社区有很多有用的工具，开始学习欠务必了解，涉及到项目开发调试和项目构建。这里推荐一个仓库，这个仓库收录了一些比较常用的API，克隆后跑起来你就可以快速查看这些常用API

```
git clone https://github.com/fuchao2012/zh-cn-Electron-API-Demos
 cd zh-cn-Electron-API-Demos
 npm install
 npm start
```	

## electron项目和web项目的区别

electron核心我们可以分成2个部分，主进程和渲染进程。主进程连接着操作系统和渲染进程，可以把她看做页面和计算机沟通的桥梁。渲染进程就是我们所熟悉前端环境了。只是载体改变了，从浏览器变成了window。传统的web环境我们是不能对用户的系统就行操作的。而electron相当于node环境，我们可以在项目里使用所有的node api 。

简单理解：
给web项目套上一个node环境的壳。



![项目结构](http://upload-images.jianshu.io/upload_images/3765249-7739aa2716b4d03d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 相比web项目，桌面项目多了一个进程


## 项目迁移

如果要迁移项目到web端，就需要把项目中的electron提供的API和node的API完全剥离出来，只能遗留web的代码，比如 node fs模块，electron提供ipc 模块，都需要剥离。

> 如果你一开始就打算双端程序，在开始写代码时应该对web代码和elecctron的代码进行分离，以便后期的迁移。


## 项目开发打包工具

这里推荐devtron 和 electron-builder 2个开发工具，配置简单，功能强大。这里不详细介绍工具的使用。官方都有非常好的文档。

传送门： [devtron]()

传送门： [electron-builder](https://github.com/electron-userland/electron-builder)

社区还有很多好用的工具，可以自行查阅，选择使用。

传送门：[community](https://electron.atom.io/community/)

> ps： electron打包的时候需要下载一个版本库，速度会非常慢，可以通过淘宝镜像源解决

```
>就是在你的命令前加ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/及空格

$ ELECTRON_MIRROR=https://npm.taobao.org/mirrors/electron/ npm run build
```

![打包问题](http://upload-images.jianshu.io/upload_images/3765249-139fe7596e20afeb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



> Electron介绍差不多就到这里，框架有了。然而一大堆配置头都晕了，从0-1非常困难，我们不妨从1到0，可以先找个模版做个小demo感受一下electron的魅力，在做项目中学习electron。

传送门： [react模版](https://github.com/chentsulin/electron-react-boilerplate)  &nbsp;&nbsp;&nbsp;&nbsp;


传送门：  [vue模版](https://github.com/SimulatedGREG/electron-vue) &nbsp;&nbsp;&nbsp;&nbsp;


## electron-vue经验分享

官方文档中作者提供了很多对开发有用的东西，我推荐学习的同学都通读一遍

传送门： [electron-vue文档](https://simulatedgreg.gitbooks.io/electron-vue/content/cn/getting_started.html)

electron-vue，作者为我们封装好了一个基于vue框架的脚手架，包括electron所有基本的开发构建工具 和vue配套的请求，路由以及vuex等插件。
通过脚手架我们可以直接进入开发阶段，开发的同时，去了解electron的工作机制，之后再开始深入去理解她更深层次的代码逻辑。 先走形，再走心。


### 不迁移项目就可以打包双版本的可行方案

作者并未提供web开发的支持，但是提供了非常好的web打包支持。
只要写好逻辑我们可以不用迁移项目就可以打包桌面项目和web项目。

process.env.IS_WEB是暴露的一个全局变量，我们可以在渲染进程中获取，项目在electron环境下，返回false。否则为true。于此，我们可以通过设置她的值来达到web dev的效果，也可以处理不同环境的不同逻辑，一些示例：

![示例](http://upload-images.jianshu.io/upload_images/3765249-cae045ed68c41067.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![示例2](http://upload-images.jianshu.io/upload_images/3765249-e8f7f6ac49fdf050.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![示例3](http://upload-images.jianshu.io/upload_images/3765249-a48751e6cf2d88e3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


### 打开新窗口的“最佳”做法

因为是webpack配置，入口只有index.html ，所以打开新窗口，一般会再配置一个入口。其实还有一种更佳的做法。

```
>>> 主进程 定义好监听事件 
ipc.on('newPage', function(e) {
    const modalPath = process.env.NODE_ENV === 'development'
        ? 'http://localhost:9080/#/newPage'
        : `file://${__dirname}/index.html#newPage`
    let win = new BrowserWindow({
        width: 1024,
        height: 724,
        webPreferences: {
            webSecurity: false
        }
    })
    win.on('close', function() {
        win = null
    })
    win.loadURL(modalPath)

})

>>> router/index.js   定义路由
// import 你的新页面  .vue 文件
 {
            path: '/newPage',
            name: 'newPage',
            component: newPage,  
        }

》》》配置完成 任意进程调用ipc.send('newPage')   完美解决

```

### 页面之间的数据共享问题

electron项目可以通过本地数据库去做一个数据存储，这样你就可以在任何需要的地方调用这份数据。我的做法：

1.首先选择一个 本地数据库插件 ，我用的 [nedb](https://github.com/louischatriot/nedb#creatingloading-a-database)

```
>>> 新建db.js
import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {
    tableData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/tableData.db')}),
    chartData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/chartData.db')}),
    cfgData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/cfgData.db')}),
}

export default {
    db
}

>>>>  引入数据库
/**
 *  本地数据库导入
 *  web模式注释该代码
 */
import db from '../db'
Vue.prototype.$db = db.db

>>>> 任意页面调用数据库
  this.$db.chartData.loadDatabase();
  this.$db.chartData.find({},  (err, docs)=> {
//                            console.log(docs);
                            if(docs && docs.length > 0){
                                this.totalOptionList = docs;
                            }
                        });


```


>  根据自己的习惯选择数据库，我自己对mongodb数据库比较熟悉，所以采用了nedb。语法糖类似，基本直接拿来就能用，不需要再次学习。


## 后记

最后说一些可以帮助你更好学习electron的基础知识：

webpack： 最强构建工具，没有之一，了解webpack，你才能更好编写项目配置。

node： electron是搭载谷歌v8内核的高性能的node环境 ，所有node能用的东西，我们都能用。是不是很酸爽？

奉上一个demo项目，简单的相册程序。还有一个项目涉及公司，代码就不好上了，只能分享经验。

传送门:    [相册Github](https://github.com/xu455255849/Electron-manka)

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)
