## 前言
 如果你想写一个npm插件，如果你想通过命令行来简化自己的操作，如果你也是个懒惰的人，那么这篇文章值得一看。
 
 po主的上一篇文章介绍了定制自己的模版，但这样po主还是不满足啊，项目中我们频繁的需要新建一些页面，逻辑样式等文件，每次都手动new一个，然后复制一些基本代码进去非常的麻烦，所以就有了这篇文章。接下来就让po主为大家一步一步演示怎么做一个npm命令行插件。


![实例插件](http://upload-images.jianshu.io/upload_images/3765249-2bfa55fce0a1f1e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##  注册npm账户

发布npm插件，首先肯定要有个npm帐号了，过程就不啰嗦了，走你。

[npm官网](https://www.npmjs.com/)

有了账号后，我们通过npm init 生成一个package配置文件，填写一些你的信息，然后就可以开始写逻辑代码了。

## 编写命令入口

首先看一下项目结构

```
.
├── bin           //命令配置
├── README.md     //说明文档
├── index.js      //主入口
├── src           //功能文件
├── package.json  //包信息
└── test          //测试用例
```

实例命令代码都是写在bin目录下，我们现在配置文件package文件中启用命令,添加一个配置项bin

```
 "bin": {
        "xu": "./bin/xu.js"
    },
```

然后安装一个依赖，TJ大神写的commander插件，

```
npm i commander --save
```

有了这个工具我们可以很方便的编写命令代码

#### xu.js

```
#!/usr/bin/env node

process.title = 'xu';

require('commander')
.version(require('../package').version)
.usage('<command> [options]')
.command('generate', 'generate file from a template (short-cut alias: "g")')
.parse(process.argv)


require('./xu-generate');   >>引入

```

这个文件可以看作是入口文件，第一行代码是必须添加的，脚本用env启动的原因，是因为脚本解释器在linux中可能被安装于不同的目录，env可以在系统的PATH目录中查找。同时，env还规定一些系统环境变量。 这种写法主要是为了让你的程序在不同的系统上都能适用。 

在这一步，你可以简单测试你自己的npm插件

```
$ node ./bin/xu.js

>>>  输出一些插件usage。help信息

```

>  关于commander，大家可以去作者的Github先学习了解，这里不对参数讲解。

#### xu-generate.js


```
#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk')
const xu = require('../src/generate');


/**
 * Usage.
 */

program
.command('generate')
.description('quick generate your file')
.alias('g')
.action(function(type, name){
    xu.run(type, name);
});
program.parse(process.argv);
```

这就是功能命令，定义了一个generate命令，.alias('g')是该命令的缩写，然后.action(function(type, name){
    xu.run(type, name);
});返回一个函数，这个函数就是我们定义这个命令需要做什么事。

## 编写功能函数

#### ./src/generate.js

这个文件就定义了当我们输入

```
$ xu g
```
所做的操作了。

```
/**
 * Created by xushaoping on 17/10/11.
 */

const fs = require('fs-extra')
const chalk = require('chalk')
exports.run = function(type, name) {
    switch (type) {
        case 'page':
            const pageFile = './src/page/' + name + '/' + name + '.vue'
            const styleFile = './src/page/' + name + '/' + name + '.less'
            fs.pathExists(pageFile, (err, exists) => {
                if (exists) {
                    console.log('this file has created')
                } else {
                    fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/page.vue', pageFile, err => {
                        if (err) return console.error(err)
                
                        console.log(pageFile + '  has created')
                    })
                    fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/page.less', styleFile, err => {
                        if (err) return console.error(err)
                
                        console.log(styleFile + '  has created')
                    })
                }
            })
            break;
        case 'component':
            const componentFile = './src/components/' + name + '.vue'
            fs.pathExists(componentFile, (err, exists) => {
                if (exists) {
                    console.log('this file has created')
                } else {
                    fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/component.vue', componentFile, err => {
                        if (err) return console.error(err)
                    
                        console.log(componentFile + '  has created')
                    })
                }
            })
            break;
        case 'store':
            const storeFile = './src/store/modules' + name + '.js'
            fs.pathExists(storeFile, (err, exists) => {
                if (exists) {
                    console.log('this file has created')
                } else {
                    fs.copy('/usr/local/lib/node_modules/vue-xu-generate/src/template/store.js', storeFile, err => {
                        if (err) return console.error(err)
                    
                        console.log(storeFile + '  has created')
                    })
                }
            })
            break;
        default:
            console.log(chalk.red(`ERROR: uncaught type , you should input like $ xu g page demo` ))
            console.log()
            console.log('  Examples:')
            console.log()
            console.log(chalk.gray('    # create a new page'))
            console.log('    $ xu g page product')
            console.log()
            console.log(chalk.gray('    # create a new component'))
            console.log('    $ xu g component  product')
            console.log()
            console.log(chalk.gray('    # create a new store'))
            console.log('    $ xu g store  product')
            console.log()
            break;
    }
};


```

这里有2个新的依赖，分别是命令输出颜色和一个文件操作的插件,通过npm安装。

```
$ npm i fs-extra --save

$ npm i chalk --save

```


这个js文件导出了一个run函数给 xu-generate.js调用，我们通过参数拿到了用户输入的type，name，然后就可以根据type通过node fs模块（这里用了一个依赖，不过原理还是fs）操作把template文件复制了一份到你的项目中。


> 到这，我们就已经完成了一个命令的开发，这个命令可以快速生成项目的模版文件。


## 本地测试

npm包开发不像web开发，可以直接在浏览器看，实例目录下建立一个test文件，再 node  test 就可以测试我们的逻辑。如果有一些功能需要在发布后才能测，npm 有个 link命令 可以连接你本地的模块，当然你也可以发布后  自己安装插件测试，就跟平时引入一个插件一样。  



##  发布npm包

首先在项目根目录执行npm登陆

```
$ npm login 

$ npm publish

```

如果这里有个报错，可能是你使用了cnpm地址，需要把npm仓库设置回来

```
 $ npm config set registry https://registry.npmjs.org/
```

然后，更新更新npm包，版本号需要大于上一次



## 后记

至此，一个入门级的npm包就制作完成了。万分感慨，记得刚入门前端的时候看到别人的插件做的真牛，自己只要简单安装一下就能搞得那么漂亮，想搞～但是看到一堆陌生的东西，立刻怂了（node环境，东西非常非常多，直接拷个vue-cli看到一对代码，一头雾水。。。大牛请无视）

学习是一个循序渐进的过程，大牛写出来的东西，没有一定的基础，和长时间的积累经验，源码是很难学习。非要啃，也行，只是效率感觉不如循序渐进来的好。

插件已经发布，Github也有完整源码，想学习的同学可以fork一个自己玩玩，干这一行～随心所动 ，跟着兴趣走，准没错

传送门： [npm地址](https://www.npmjs.com/package/vue-xu-generate)


传送门： [github源码](https://github.com/xu455255849/vue-xu-generate)

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)

前端❤️～越学越感觉自己的无知哎～