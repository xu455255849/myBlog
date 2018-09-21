## 前言

es6有很多新东西，但是感觉常用的并不是很多，这里学习记录了一些我自己认为非常常用又强大的新特性。

## scoping
实用的块级作用域，let x ＝ xxx  可以声明一个块级作用域的局部变量，简单举个例子下面1号函数可以达到正常的效果，而二号则不能，因为变量i是全局的，以往我们可以通过自执行函数解决  不过现在吗就是用let了。

```
///1111
let callbacks = []
for (let i = 0; i <= 2; i++) {
    callbacks[i] = function () { return i * 2 }
}

//2222
var callbacks = [];
for (var i = 0; i <= 2; i++) {
   callbacks[i] = function() { return i * 2; }
}
```

除了块级变量还是有块级函数，放个代码。同理，不用再写iife函数去消除作用域问题了。

```
{
    function foo () { return 1 }
    foo() === 1
    {
        function foo () { return 2 }
        foo() === 2
    }
    foo() === 1
}

//  only in ES5 with the help of block-scope emulating
//  function scopes and function expressions
(function () {
    var foo = function () { return 1; }
    foo() === 1;
    (function () {
        var foo = function () { return 2; }
        foo() === 2;
    })();
    foo() === 1;
})();

```


## Arrow Functions
箭头函数简单说就是切换闭包中的this指向，把this指向它的父级作用域，看代码。妈妈也不用担心我用that _this 来替换this指针了。

```
///采用箭头函数
this.nums.forEach((v) => {
    if (v % 5 === 0)
        this.fives.push(v)
})

////传统解决指针问题方法
//  variant 1
var self = this;
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        self.fives.push(v);
});

//  variant 2
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        this.fives.push(v);
}, this);

//  variant 3 (since ECMAScript 5.1 only)
this.nums.forEach(function (v) {
    if (v % 5 === 0)
        this.fives.push(v);
}.bind(this));

```


## Extended Parameter Handling
函数 rest 操作符：
扩展参数操作，写在参数尾部，表示多余的参数，和新增的spread运算符一样都是三个点(...)，用法如下，后续介绍spread操作符。

```
///给参数设定默认参数
function f (x, y = 7, z = 42) {
    return x + y + z
}
>>>  f(1) === 50

／／／ var a = Array.prototype.slice.call(arguments, 2);

function f (x, y, ...a) {
    return (x + y) * a.length
}
>>>  f(1, 2, "hello", true, 7) === 9  (a = [ "hello", true, 7])

```

## Template Literals
是不是看到那一堆的＋ ‘’ ＋‘’  要吐了，es6拯救你～

```
var customer = { name: "Foo" }
var card = { amount: 7, product: "Bar", unitprice: 42 }
var message = `Hello ${customer.name},
want to buy ${card.amount} ${card.product} for
a total of ${card.amount * card.unitprice} bucks?`

get`http://example.com/foo?bar=${bar + baz}&quux=${quux}`

```

## Modules
很常用的方法，react，vue等主流框架经常能看到，可以将js代码模块化，通过export 暴露给其他脚本使用该块代码。

![vue-router](http://upload-images.jianshu.io/upload_images/3765249-33e9fae99af5ef9b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
以vue－router为例，通过接口暴露了一个router对象

```
//  lib/math.js
export function sum (x, y) { return x + y }
export var pi = 3.141593

//  someApp.js
import * as math from "lib/math"
console.log("2π = " + math.sum(math.pi, math.pi))

//  otherApp.js
import { sum, pi } from "lib/math"
console.log("2π = " + sum(pi, pi))
```

## Classes
在传统变成语言中定义对象都是基于类，而js生成实例对象则不同。ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

```
class Shape {
    constructor (id, x, y) {
        this.id = id
        this.move(x, y)
    }
    move (x, y) {
        this.x = x
        this.y = y
    }
    
  ///传统实例对象
    
    var Shape = function (id, x, y) {
    this.id = id;
    this.move(x, y);
	};
	Shape.prototype.move = function (x, y) {
    	this.x = x;
	    this.y = y;
	};
}
```


## Promises
ajax神器 这里就不赘述了。大部分项目里基本都在用了。 解决回调地狱的解决方法。es7还有 async 和await 函数 ，需要转换支持。

```
function msgAfterTimeout (msg, who, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout)
    })
}
msgAfterTimeout("", "Foo", 100).then((msg) =>
    msgAfterTimeout(msg, "Bar", 200)
).then((msg) => {
    console.log(`done after 300ms:${msg}`)
})
```

![promise](http://upload-images.jianshu.io/upload_images/3765249-36a3731783c4fd1c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

采用promise.all 处理多个异步函数回调

## New Built-In Methods
es6也对原有的数据类型和原生方法进行了扩展，这里只记录关于数组的扩展，个人感觉比较常用，而且很有用。一些扩展方法可能并不怎么用得到，扩展类型symbol 我现在还想不到什么场景要用。。可能它并不是用来写逻辑的。。而是研究型类型。。。不废话了 开始正文。

* spread   /   ...运算符
* Array.of()  //将一组值转为数组
* Array.from()   //用于将类数组（可遍历）对象转为数组
* Array.copyWithin(target, start,end) //复制一段数据到某个target
* Array.find(fn) // 遍历数组寻找条件成员
* Array.findIndex(fn) //同上 返回成员位置
* Array.fill(t,s,e)  //填充数组
* Array.includes() //检测数组是否包含某个值

```
/////实例
//数组去重
var arr = [1,2,3,4,1,2,3]
var res = Array.from(new Set(arr))
>>>>>  [1,2,3,4]
//查找条件成员

arr.find(function(it) {
return it > 3
})
>>>>  4


///spread用法
arr.push(...[1,2,3])

>>> [1,2,3,4,1,2,3,1,2,3]

```


##  总结

掌握一些最新的东西。可以让你事半功倍，知识的深度不容易挖掘但是知识的广度是非常重要的，以前数组去重，以前还能出面试题，现在估计人人都会了。多么的轻松。
如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)