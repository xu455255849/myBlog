![nuxt](http://upload-images.jianshu.io/upload_images/3765249-3ba28d2c1b468621.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言

今天抽空过了遍nuxt文档，写了个实践demo，关于nuxt我已经断断续续看了好几遍了，自我感觉也算是入门了吧，从开发到上线心里都有底。后期打算在项目用起来的是nuxt框架，一些函数工具库，比如ramda，lodash等等，后台服务估计会使用### [fastify](https://github.com/fastify/fastify) 这个库，目测非常方便，尝试尝试。


> 基础只是还是以官方文档为主，尝试过程中如果有什么问题可以留言，看到会回复，文章如有错误，欢迎指正。

## 预处理器的使用

安装需要的loader后指定lang就可以直接使用。

```
npm i less less-loader --save--dev

／／全局css
  css: [
    {
      src: 'static/less/base.sass',
      lang: 'less'
    }
  ],
  ／／页面中使用

	<style lang="less" scoped></style>

```

## 页面loading

```
//禁用
module.exports = {
  loading: false
}

／／颜色条
module.exports = {
loading: { color: '#3B8070' }
}

／／使用组件
添加一个loading组件 (官方示例如下，详情可看官方文档)
引用该组件
module.exports = {
  loading: '~components/loading.vue'
}

```


```

///  components/loading.vue

 <template lang="html">
  <div class="loading-page" v-if="loading">
    <p>Loading...</p>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding-top: 200px;
  font-size: 30px;
  font-family: sans-serif;
}
</style>
 

```

> 按照官方引用组件的方法，我测试报了个错，把~/ 改成 ./ 解决。估计是nuxt解析vue文件的问题。

## 使用插件、第三方模块

```
//通过script标签

 head: {  
	 script: [
      { src: 'https://res.wx.qq.com/open/js/jweixin-1.2.0.js' }
    ]
  },
  
  //plugins配置 ， ssr：false 设置只在客户端使用
  
   plugins: [
    { src: '~plugins/flexible.js', ssr: false }
  ],

／／在页面中使用axios，配置vendor使其只打包一次

／／页面
<template>
  <h1>{{ title }}</h1>
</template>

<script>
import axios from 'axios'

export default {
  async asyncData ({ params }) {
    let { data } = await axios.get(`https://my-api/posts/${params.id}`)
    return { title: data.title }
  }
}
</script>

／／配置文件

module.exports = {
  build: {
    vendor: ['axios']
  }
}

```


## 使用第三方组件库

在nuxt里使用第三方UI组件库也非常简单。以iview为例（我个人非常中意的组件库）

```
///在plugins下新建 iview.js

import Vue from 'vue'
import iView from 'iview';

Vue.use(iView);

////配置文件引入css和plugin

module.exports = {
  css: [
    { src: 'iview/dist/styles/iview.css'}
  ],
  plugins: [
    { src: '~plugins/iview.js', ssr: false }
  ],
 
}

```




## 路由

```

//基础路由示例， 详情请看官方文档

pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue


router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}


```

nuxt为我们省去了定义路由的过程，页面结构自动生成路由，不得不说，这对开发效率是有比较大的提升。官方还提供了路由切换动画，中间件等配置，我们可以在切换路由时良好的控制页面。

## 中间件

开发后台管理页面的时候，我们经常有autu认证需求，如果没有登录，或者权限问题，都有一个脚本去控制跳转，中间件就派上用场了。

```

  //  middleware/auth.js
  
export default function ({ store, redirect }) {
  if (!store.state.user) {
    return redirect('/login')
  }
}

//页面单独使用

export default {
  middleware: 'auth'
  }

///全局使用

module.exports = {
  router: {
    middleware: 'auth'
  }  
}


```

上面我们定义了一个auth中间件，如果用户未登录，则跳转登录页。


## 视图和错误页

一般开发SPA页面，我们一般是组件＋页面混合开发，，nuxt则是固定布局layouts，路由必须采用一个layouts，默认default，页面内部我们可以像个vue开发那样引入多个components。

nuxt可以定义个错误页，在layouts下定义个error.vue文件。具体代码可以看官方文档


## asyncData 

nuxt扩展的异步数据方法，对于页面数据，我们一般有页面data定义的形式和vuex统一管理的形式，可以根据自己的需求选择。

data定义这里就不赘述了，这里说一下vuex统一管理数据的做法。

```

///page页面
<template>
  <div class="container">
    <p class="title">数据展示!</p>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import axios from 'axios'
  
  export default {
    middleware: 'auth',  //定义页面中间件
    head () {
      return {
        title: '其他页面'
      }
    },
    data () {
      return {}
    },
    async fetch ({ store, params }) {
      let { data } = await axios.get('http://106.14.205.222/article/list?page=1&limit=10&isActive=1')
      console.log( data )
      store.commit('SET_LIST', data.list)
    },
    computed: {
      ...mapState([
        // 映射 this.xxx 为 store.state.xxx
        'columns1',
        'data1'
      ])
    },
  }
</script>


  
  
//store  index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  
  state: {
    columns1: [
      {
        title: '标题',
        key: 'title'
      },
      {
        title: '介绍',
        key: 'intro'
      },
      {
        title: '日期',
        key: 'time'
      }
    ],
    data1: [],
    user: 'xu' //如果为空，则会中间件控制跳转404
  },
  mutations: {
    SET_LIST: (state, data) => {
      state.data1 = data
    },
  }
})

export default store



```

这里通过fetch刷新了vuex的数据，页面映射了store的数据，这种写法我们可以通过this.xxx 处理vuex的数据。demo为了快捷只用了index演示，常规项目我们应该采用模块写法。

## 权限配置（高级－路由鉴权）

还是关于session 和 登录相关的一些权限问题，官方高级文档有非常详细的例子。这里就不在demo里再现了。[路由鉴权](https://zh.nuxtjs.org/examples/auth-routes)


>对vuex管理数据有兴趣的同学， 可以多看看vuex状态树 和权限相关的文章或者应用，当然官方文档是要烂熟于心的。


## 后台开发以及项目部署

后台开发一般就是在项目下在建立一个server文件夹，做到同时输出API和页面，我们可以选择自己喜欢的服务框架 ，比如express活着koa，将nuxt 介入到服务框架来，就可以完成所谓的同构开发。可以看看一个koa例子：

```
import Koa from 'koa'
import Nuxt from 'nuxt'
import nuxtConf from '../nuxt.config'


const app = new Koa()

const start = async () => {
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')
  const nuxt = await new Nuxt(config)

  if (conf.env !== 'production') {
    try {
      await nuxt.build()
    } catch (e) {
      console.error(e)
      process.exit(1)
    }
  }

  app.use(async (ctx, next) => {
    ctx.status = 200
    await nuxt.render(ctx.req, ctx.res)
  })

  app.listen(conf.port, conf.host)
  console.log('Server listening on ' + conf.host + ':' + conf.port) // eslint-disable-line no-console
}

start()

```

nuxt自身提供了一个部署命令，可以通过 npm run start 来运行，nuxt还能生成静态页，你可以在在别的地方托管你的网站，比如Githubpage和cdn。喜欢同一管理上线的项目的同学，推荐用pm2 来进行部署。

一台机器，好几个项目，就可以用nginx来进行反向代理端口。nginx也算是上线必不可少的一步，有空我也会写一篇实践文章。


> 官方也有提供服务框架版本，比如express https://github.com/nuxt-community/express-template  ，还有其他的可以自行Github🔍
## 后记

nuxt的学习曲线非常小，就像vue框架一样，已经是一个开箱即用的状态，我们可以直接跨过配置直接开发。对配置有兴趣的可以在vue官方文档找到ssr渲染文档。

本来是想写nuxt ＋ koa ＋ mongodb 的全栈式应用文章的，但是最近比较忙，这个计划只能搁置了。有些方法和好用的东西我我也是最近才学习，觉得不错在文章里做一个分享和记录。来源的话是慕课网Scott老师的《开发微信全家桶项目 Vue/Node/MongoDB高级技术栈全覆盖》视频教程，课程级别为高级，有些地方我自己也是云里雾里，比如API分层，控制器。。不过最让人头疼的还是微信那一堆认证。。。。

整个nuxt的简单demo我都放在了Github ，对上面的scott老师的视频教程有兴趣的同学，也可以在Github找到源码。demo多实践，工作少踩坑，小公司现在最让我开心的估计是自主开发了，公司项目我可以自己选择使用什么技术。想怎么写怎么写，可以申请整个开发项目，自己开发页面，服务器，数据库，心大的可以用rn开发app。。。相应的这锅也要背好，有压力有动力嘛，写代码这么愉快的事对吧～


传送门： [Nuxt示例代码](https://github.com/xu455255849/nuxt-demo)



如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)
