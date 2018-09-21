##  前言

使用vue这个框架已经陆陆续续做了好几个项目了，不知不觉也已经在公司呆了4个月，转正了。时间如水。。。（省略一万字）。／咳～不瞎扯了，公司是直接用的官方脚手架生成项目，官方模版没有vuex，axios这些支持，模版也是最原始的模版，所以每次初始化项目都要做一堆配置，非常麻烦。所以就想着自己定制一套。
非常幸运，vue友好的支持我们自己的模版仓库，这样可以节省不少抄作业的过程。开始动手学习吧。


![template](http://upload-images.jianshu.io/upload_images/3765249-1d1690ef748d7ba2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##  fork一份自己喜欢的模版 ——以webpack为例

vue有一个官方模版组织  传送门：[vue官方模版](https://github.com/vuejs-templates)

这些官方模版都是可以fork自行改造的。fork到自己仓库后 ，我们就可以通过

```
vue init username/repo my-project
```
来生成自己模版，这里有个小坑，仓库不要忘了加分支，比如

```
vue init xu455255849/vue-xu#devlop my-project
```
不然你永远都是直接init  master分支，而无法生成自己模版。po主也是被同事点醒～😢

## 自定义配置插件

文件目录有个 meta.js文件，其中有个prompts参数，可以定义用户输入，我们可以在这个地方添加或者删除一些配置。


![用户选择](http://upload-images.jianshu.io/upload_images/3765249-0f4c0013c91dfe09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这样我们就可以获取用户对是否安装插件的选择，根据用户的选择我们可以判断是否生成该文件。



![vuex](http://upload-images.jianshu.io/upload_images/3765249-6598fa04af694cbb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


##  根据用户选择渲染文件（启用插件）

根据用户的选择，我们要判断是否渲染文件以及安装一些一些依赖。


![依赖](http://upload-images.jianshu.io/upload_images/3765249-fbe1bc4c0638f7cb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![插件启用](http://upload-images.jianshu.io/upload_images/3765249-b3fc5400972826d6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

不同的插件，可能方式是不一样的，所以需要根据插件引入方式编写渲染逻辑。

## 定制自己的模版风格

上面讲了一些插件的自定义，接下来在谈谈po主的一些模版风格给大家参考参考，当然，自己喜欢就好。

![路由](http://upload-images.jianshu.io/upload_images/3765249-b0b2de3ae4baf903.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![定义页面](http://upload-images.jianshu.io/upload_images/3765249-98ea14ffa2cd0bea.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 后记

上面po主提的还都是些比较大众的，基本的配置，这些配置其实还可以细化，比如 提供多个css预处理工具选择，less，sass，stylus，可以随意切换，根据项目类型渲染模版，定制不同类型的模版，都可以在开发中节约大量时间。有个模版～复制代码都舒服多了😄～～


如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)

po主目前还在开发一个npm工具，配套模版使用，大致功能就是通过命令直接生成页面 ，组件等文件，仓库已经就绪，下篇文章会写这个npm插件相关开发过程～

```
new一个文件。。。创建 html，，，css，，，js，，又要复制一些基本的代码进来。。麻烦死了～
```