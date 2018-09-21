## 前言
近期准备好好的读一读《你不知道的JavaScript（上卷）》这本书，俗话说的好，好记性不如烂笔头，读到this这章感觉是时候需要一些笔记了。文中如有错误之处，欢迎指出。

## 什么是this?

什么是this，我们先来看看作者的回答。

>当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。this就是记录的其中一个属性，会在函数执行的过程中用到。

## this的4种绑定方式


### 默认绑定

```
function foo() { 
    console.log( this.a );
}

var a = 2;

foo(); // 2

```

这段代码输出2 ， 说明this默认绑定到了全局对象
### 隐式绑定

```
function foo() { 
    console.log( this.a );
}

var obj = { 
    a: 2,
    foo: foo 
};

obj.foo(); // 2

```
这段代码this绑定到了obj对象，当函数引用有上下文对象（context）时，隐式绑定规则会把this绑定到这个上下文对象。

> 隐式丢失问题

```
// 例子1111
function foo() { 
    console.log( this.a );
}

var obj = { 
    a: 2,
    foo: foo 
};

var bar = obj.foo; // 函数别名！
￼
var a = "oops, global"; // a是全局对象的属性”

bar();  // "oops, global"

／／2222


function foo() { 
    console.log( this.a );
}

var obj = { 
    a: 2,
    foo: foo 
};

var a = "oops, global"; // a是全局对象的属性

setTimeout( obj.foo, 100 ); // "oops, global

```

例子1111虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身，因此此时的bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定。例子222在setTimeout函数中丢失了this绑定，道理是一样的，我们可以把参数传递看成一种隐式赋值。




### 显式绑定
在分析隐式绑定时，我们必须在一个对象内部包含一个指向函数的属性，并通过这个属性间接引用函数，从而把this间接（隐式）绑定到这个对象上。

那么如果我们不想在对象内部包含函数引用，而想在某个对象上强制调用函数，该怎么做呢？

学过js的估计对 call，apply和bind都不陌生，js提供的这些原生方法就给我们提供了显式绑定this的途径。

```

function foo() { 
    console.log( this.a );
}

var obj = { 
    a:2
};

foo.call( obj ); // 2
```

通过foo.call(..)，我们可以在调用foo时强制把它的this绑定到obj上。

如果你传入了一个原始值（字符串类型、布尔类型或者数字类型）来当作this的绑定对象，这个原始值会被转换成它的对象形式（也就是new String(..)、new Boolean(..)或者new Number(..)）。这通常被称为“装箱”。


> “从this绑定的角度来说，call(..)和apply(..)是一样的，它们的区别体现在其他的参数上，但是现在我们不用考虑这些。”

## 硬绑定-bind的实现

我们已经知道了this绑定的4种方式，但是使用call和apply我们还是不能解决隐式丢失的问题,思考以下例子：

```
function foo() { 
    console.log( this.a );
}

var obj = { 
    a:2
};

var bar = function() {
    foo.call( obj );
};

bar(); // 2
setTimeout( bar, 100 ); // 2

bar.call(windows) //无法再修改this


```

通过call我们在函数bar内强制指定了foo的this，之后不论如何调用bar，它总会在obj上手动调用foo，这种绑定是一种显示强制绑定，因此称为硬绑定。这就是bind的产生来由（因为硬绑定比较常用，es5中新增了bind方法），通过硬绑定制定this，上面代码现在就变成了

```
...略
var bar = foo.bind(obj)
bar(); // 2
setTimeout( bar, 100 ); // 2

```



### new绑定

关于new，我们首先梳理一下基础知识。

> new操作符干了什么？

1. 创建（或者说构造）一个全新的对象。

2. 这个新对象会被执行[[原型]]连接。

3. 这个新对象会绑定到函数调用的this。

4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象”

```
function foo(a) { 
    this.a = a
}

var bar = foo(2)   
var baz = new foo(2) 

bar.a //Cannot read property 'a' of undefined

baz.a  // 2  this绑定到了foo

```

> 绑定规则优先级和es6的this新特性

> 如果要判断一个运行中函数的this绑定，就需要找到这个函数的直接调用位置。找到之后就可以顺序应用下面这四条规则来判断this的绑定对象。

1. 由new调用？绑定到新创建的对象。
2. 由call或者apply（或者bind）调用？绑定到指定的对象。
3. 由上下文对象调用？绑定到那个上下文对象。
4. 默认：在严格模式下绑定到undefined，否则绑定到全局对象。


ES6中的箭头函数并不会使用四条标准的绑定规则，而是根据当前的词法作用域来决定this，具体来说，箭头函数会继承外层函数调用的this绑定（无论this绑定到什么）。

##  几个小例子看懂this

```
function showThis () {
  console.log(this)
}
function showStrictThis () {
  'use strict'
  console.log(this)
}
showThis() // window
showStrictThis() // undefined

```
优先级最小的this对象，默认绑定。


> 思考下面的例子：

```
var person = {
  name: '11',
  showThis () {
    return this
  }
}

person.showThis() === person  //true


var person2 = {
 name: '22',
  showThis () {
    return person.showThis()
  }
}

var person3 = {
 name: '33',
  showThis () {
  	var retrunThis = person.showThis
    return retrunThis()
  }
}

person.showThis()  //person
person2.showThis()  //?
person3.showThis()  //?

```


我们首先要找到调用位置，在2里是这句return person.showThis()，隐式绑定了一个person对象，所以输出person ，3 是return retrunThis() ，this默认绑定到全局，返回window.


```
function showThis () {
  return this
}
var person = { name: 'person' }
showThis() // window
showThis.call(p1) // person
showThis.apply(p1) // person

```

通过显式绑定指定了context object。


```
function showThis () {
  return this
}
var person = { name: 'person' }

var personBind = showThis.bind(person)

personBind()   //person

var person2 = { name: 'person2' }

personBind.call(person2) //person
 

```

bind方法强绑定了this，已经无法再通过显式绑定切换this。


```
function showThis () {
  return this
}
var person = { name: 'person' }
var person2 = { name: 'person2' }

var personBind = showThis.bind(person)

personBind()    //person
new personBind()  //showThis

```
new优先级高于bind，所以可以覆盖this。



```

function foo() { 
    setTimeout(() => {
        // 这里的this在词法上继承自foo()
        console.log( this.a ); 
    },100);
}

var obj = { 
    a:2
};

foo.call( obj ); // 2


```

> 箭头函数并不是使用function关键字定义的，而是使用被称为“胖箭头”的操作符=>定义的。箭头函数不使用this的四种标准规则，而是根据外层（函数或者全局）作用域来决定this。箭头函数的绑定无法被修改，包括new。 关于箭头函数网上有很多详细全面的讲解。这里不再展开。


## 后记
原型链，闭包，堆栈结构等等。。。javascript入门我们都觉得是比较简单的，找一份敲代码的工作真不难，只要努力搬砖就好了。但是如果不去深入了解js的底层机制，这条道路恐怕是走不远的。没有好的基础，我们可以学会使用react，使用vue，使用别人的插件，但是自己造轮子还是远远达不到的。

前端水很深，需要学的的东西太多太杂，真要学，几乎都能学都有用，都不学，照样敲代码没什么大问题，工作业务积累应付工作还是足够的，不够？那就加个班呗。加油吧～为了不被淘汰，共勉～

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)