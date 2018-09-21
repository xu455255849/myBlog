## 前言


使用vue框架有一段时间了，这里总结一下心得，主要为新人提供学习vue一些经验方法和项目中一些解决思路。

> 文中谨代表个人观点，如有错误，欢迎指正。

## 环境搭建

假设你已经通读vue官方文档（文档都没读一遍（至少），那不建议动手撸码），在大致了解vue是什么东西，有什么用，核心概念之后我们就可以开始着手学习vue。首先搭建环境。

学习vue，我的建议是通过官手脚手架起步。

```
>>>Installation

$ npm install -g vue-cli

>>Usage

$ vue init <template-name> <project-name>

>>>>Example:

$ vue init webpack my-project

```

根据需要安装插件yes or no,一直回车，脚手架就生成了。接下来剖析脚手架结构。

## 脚手架结构剖析

再开始写项目之前，我们需要弄清什么地方写什么代码。


### build文件夹

webpack配置文件。此处配置webpack规则。整个项目是通过webpack支持的。比如你要使用less，你需要在webapck规则里使用less。

### src 文件夹
撸码的地方～基本你所有的代码都在这一块完成。

####### assets文件夹
存放web中引用的图片 媒体资源。
####### components文件夹
主要存放可复用组件，你可以在任意页面中复用这些组件。

####### router文件夹
index.js  路由配置文件。在此处配置各个页面的跳转引用关系。

####### APP.vue

这里看一看做页面的根部。我们可以在这个页面进行一些css reset 操作。

####### main.js
根逻辑，页面加载首先会加载这份js文件。



### static文件夹

主要存放外部引用资源。比如xxx.min.js

### index.html

vue是spa应用，所以只有一个入口，也就是index文件，这里我们进行一些不可更改资源（比如某某库）的引用，和html页面meta 、title之类的设定。



## vue核心概念

vue的核心概念是‘数据驱动’，假如我们需要切换view层，我们应该修改的是数据。下面我会分享一些我自己在学习vue中收获的一些实例，大家自行感受。

> 实例展示的是方法论，概念性一样的东西，不要被例子局限，要将思维扩散出去。知识点学习还是看官方文档为主。

## vue如何处理dom显示，样式切换，动态样式

![实例](http://upload-images.jianshu.io/upload_images/3765249-ad237443fb85f3bd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## watch 和 computed的 简析

vue提供了2个动态监测data的函数，一个是watch，一个是computed。

watch： 主要监测已经存在的data，处理data变化后的钩子

computed： 处理一个已存在的data，返回一个data

![实例](http://upload-images.jianshu.io/upload_images/3765249-64b0e2ebf78ac93a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> vuex 是一个比较好的例子，可以用来学习监测，什么时候用什么方法去处理这些变化。

##  v-for 列表渲染机制

v-for 是我认为vue中一个非常非常强大的指令，所有规律性动态数据的展示，都可以用for指令来完成。
v-for是非常强大，可以追踪循环体内任意一个值的变化，针对变化来单独渲染。

> v－for 建议仔细阅读官方文档，而不是通读。在项目中，我们应该养成习惯。对于可变化的，规律性数据都采用for指令渲染。 我之所以又把for指令写了一遍，是因为我在开始写vue时，根本就没有活用for指令的简便和强大，还是古老的ul li 循环，繁杂的事件绑定委托。估计人类本性对一个东西还不太了解的时候会习惯性的用自己熟悉的方式去操作的原因。

![嵌套数据展示和灵活操作](http://upload-images.jianshu.io/upload_images/3765249-6d9204e4278534c5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## vue中引入组件以及父子组件的数据交互

关于组件，任意vue文件你都可以看做一个组件。 在项目中我们一般使用的应该都是单文件组件，单文件组件与页面结构无异，是具有完整功能的一个模块。比如一个评论框，你就可以剥离成一个组件，在任意页面文件中引入这个组件。

![父组件（页面）](http://upload-images.jianshu.io/upload_images/3765249-000a1a5d1aa54545.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![子组件](http://upload-images.jianshu.io/upload_images/3765249-7b9abe7e834883eb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##  vue过滤器

在有一些业务场景需要对数据进行一些转换，比如后端图片地址的前缀匹配，这个时候filters就派上大用场了。看个例子感受一下。


![过滤器的使用](http://upload-images.jianshu.io/upload_images/3765249-cc92acbac86dc286.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## vue路由

路由对于spa应用的重要性不言而喻，整个应用的页面关系都是通过路由定义的。我们先来看看一个路由文件大致是什么样子


![vue路由](http://upload-images.jianshu.io/upload_images/3765249-0b6bae81fbda8c8a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

vue 使用history模式，我们就可以去使用history的API，需要在路由配置中启用。默认hash模式，history模式也是一般应用的常用模式。


```
//切换当前地址，同 history.replaceState
 this.$router.replace({name: 'list'})  
//向history推入一级，同history.push
 this.$router.push({name: 'list'})  
//添加参数
 this.$router.push({name: 'list', query: {setting: 'setting'}})

//监测路由变化
watch:{
      '$route': function () {
       //处理事件
      }
    },


》》》》可以在页面任意处打印this.$route查看路由对象


```
vue的路由配置相对来说，是比较简单的，阅读一遍router文档，就可以快速上手。

> 路由是非常重要的一块，在动手开始写你的vue项目之前，你非常有必要通读一遍路由文档。而不是碰到问题再去解决。嵌套路由，动态路由会对你的开发起到非常有用的帮助。[官方路由](https://router.vuejs.org/zh-cn/installation.html)


##  可监测的全局变量——vuex

项目开发中，往往我们会有一些全局变量，但是正常全局变量，vue是不能监测的，这个时候vuex就派上用场了。 [vuex官方文档](https://vuex.vuejs.org/zh-cn/intro.html)

```
npm install vuex --save

／／安装好vuex后，我们先新建一个store文件夹，存放vuex相关文件，如下图所示
>>>>> index.js

import Vue from 'vue'
import Vuex from 'vuex'
import modulesApp from './modules/app'  //引入一个app模块
Vue.use(Vuex)

let store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    app: modulesApp
  }
})

export default store

———————————————— 分割线——————————————————

>>>>>app.js    //这里是个我的示例结构，可以查阅文档选择自己喜欢的书写方式

let state = {
  height: document.documentElement.scrollHeight + 'px',
  total: 1,
  list: [],

};

let getters = {};

let mutations = {
  height: state => state.height = document.documentElement.scrollHeight + 'px',
  totalChange (state, total) {
    state.total = total
  },
  listChange (state, list) {
    state.list = list
  },


};

let actions = {};

export default {
  state,
  getters,
  mutations,
  actions
}


```


![vuex](http://upload-images.jianshu.io/upload_images/3765249-bc0af16b6933ec28.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



## 如何开始写第一个demo项目

看完以上内容，想必大家对vue都有了进一步的了解。在通读官方文档后，我们对vue都有一个大致的了解，这样其实对于新手而言还是没有方向去写一个demo出来的，我们往往想写个漂亮的demo，但这样就必须花大量时间去写html和css，这点博主深有体会，看了2遍文档后还是不知道怎么去入手写个demo练手。这里博主有个建议就是：
> 专注于vue本身，而不是花过多的时间去写html，css。

以上我们已经搭建了一个vue开发环境，接下来就是找一款心仪的UI组件库，博主这里推荐[iview](https://www.iviewui.com/components/form)，个人感觉非常漂亮。然后就是构思你的demo要写什么，好了，拖组件搭UI，开始写真正写项目代码把，把更多时间花在vue学习之上。



## 后记

写到这里也就告一段落了。通过项目去学习vue，在这个过程碰到问题解决问题，就是一个效率的学习方法。
以后回过头来看，“自己以前这个demo写的这么垃圾？” 就说明你又进步了。入门第一步，框架用的好，用的熟练，当表面已经无法满足我们的时候，OK ，深入框架的时机到了。可以开始研究vue是怎么实现数据绑定，怎么实现数据响应式这些更深层的技术原理了。

博主打算对vue-cli进行二次开发，封装一些有用的命令。敬请期待！前段路坎坷，与你共勉～

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)