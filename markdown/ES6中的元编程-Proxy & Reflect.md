# ES6中的元编程-Proxy & Reflect

##前言

ES6已经出来好久了，但是工作中比较常用的只有let const声明，通过箭头函数改this指向，使用promise + async 解决异步编程，还有些数据类型方法...所以单独写一篇文章学习ES6中的proxy 和 reflect。本文属于学习笔记，可能会有错误的理解，欢迎交流指正。

##基本概念

什么是元编程？这是我在网上搜到的一句话。大家可以参考理解。我的简单理解就是》改源码底层的东西，对原本的功能进行了更改。
>能“介入”的对象底层操作进行的过程中，并加以影响。元编程中的 元 的概念可以理解为 程序 本身。”元编程能让你拥有可以扩展程序自身能力“。 ---- https://www.zhihu.com/question/23856985 知乎问答参考

Reflect： 	用于替代直接调用Object的方法，它并不是一个函数对象，没有constructor，所有不要使用new操作符。

Proxy： 用于自定义的对象的行为，比如修改set和get，感觉是es5的Object.defineProperty()方法的es6升级版。

一些资料链接：

[MDN-Reflect](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect):MDN 上的 Reflect 官方文档

[MDN-Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy): MDN 上的 Proxy 官方文档

[MDN-元编程](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Meta_programming):MDN 官方文档教程，介绍了元编程的概念

[ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs/proxy) ：阮老师的es6入门，对es6还没入门的同学可以全文阅读一番

>Reflect & Proxy的联系：两者拥有完全一致的API方法，具体可参考mdn，Reflect一般在Proxy中需要处理默认行为时使用。

## 编程案例

俗话说的好，理论只是纸上谈兵，还是实践中学习这些元编程方法。

### 数据劫持，验证操作

```
let handler = {
    get: function(target, key){
        return key in target ? target[key] : 37;
    },
   set: function(target, key, value) {
    if (key === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    target[key] = value;
  }
};
let p = new Proxy({}, handler);
p.a = 1;
p.b = undefined;
person.age = 100;

console.log(person.age); 
// 100

person.age = 'young'; 
// 抛出异常: Uncaught TypeError: The age is not an integer

person.age = 300; 
// 抛出异常: Uncaught RangeError: The age seems invalid
console.log(p.a, p.b);    // 1, undefined

console.log('c' in p, p.c);    // false, 37

```
这是一个非常典型的案例，使用vue的同学都知道vue是通过数据劫持的方法来完成数据绑定的，通过proxy代理对象的set，get方法同样可以完成数据劫持的目的，

### 函数节流

```
const createThrottleProxy = (fn, rate) => {
  let lastClick = Date.now() - rate;
  return new Proxy(fn, {
    apply(target, context, args) {
      if (Date.now() - lastClick >= rate) {
        fn.bind(target)(args);
        lastClick = Date.now();
      }
    }
  });
};

const handler = () => console.log('Do something...');
const handlerProxy = createThrottleProxy(handler, 1000);
document.addEventListener('scroll', handlerProxy);
```

该实例通过proxy的handler.apply()拦截了函数调用，当只有时间超过1s时候函数才会再次被调用

###图片懒加载
```
 const IMG_LOAD = 'https://img.alicdn.com/tfs/TB11rDdclLoK1RjSZFuXXXn0XXa-300-300.png';
  
  const imageProxy = (loadingImg) => {
    return new Proxy(Image, {
      construct(target, args){
        const instance = Reflect.construct(target, args);
        instance.src = loadingImg;
        return instance;
      }
    });
  };
  const ImageProxy = imageProxy(IMG_LOAD);

  const createImageProxy = (realImg) =>{
    const img = new ImageProxy();
    const virtualImg = new Image();
    virtualImg.src = realImg;
    virtualImg.onload = () => {
      hasLoaded = true;
      img.src = realImg;
    };
    return img;
  }
  var img = createImageProxy('https://cdn.dribbble.com/users/329207/screenshots/5289734/bemocs_db_dribbble_03_gold_leaf.jpg');
  document.body.appendChild(img);

```
通过proxy构造默认Image对象，在加载完成时替换默认图片

### 单例模式

```
// makes a singleton proxy for a constructor function
function makeSingleton(func) {
    let instance,
        handler = {
            construct: function (target, args) {
                if (!instance) {
                    instance = new func();
                }
                return instance;
            }
        };
    return new Proxy(func, handler);
}


// 以这个为 constructor 为例
function Test() {
    this.value = 0;
}

// 普通创建实例
const t1 = new Test(),
    t2 = new Test();
t1.value = 123;
console.log('Normal:', t2.value);  // 0 - 因为 t1、t2 是不同的实例

// 使用 Proxy 来 trap 构造函数, 完成单例模式
const TestSingleton = makeSingleton(Test),
    s1 = new TestSingleton(),
    s2 = new TestSingleton();
s1.value = 123;
console.log('Singleton:', s2.value);  // 123 - 现在 s1、s2 是相同的实例。

```
通过proxy的construct方法 拦截，让不同的实例指向了相同的constructer，达到单例模式的目的。

### 后记
不得不说实践出真知啊，行文至此，参考了mdn，网上也搜了很多相关资料，案例借鉴，自己对Proxy的理解也上了一个层次，最近本想深入canvas，但感觉不做图形方面的工作的话，真的难以应用。下篇文章先预定写全栈应用或者 vue源码方面的。

> 最近想深入一下计算机原理，请大佬推荐一些计算机原理方面的书籍，当然不限于计算机，前端方面也可以。红宝书，精粹，dom编程艺术，js忍者秘籍，你不知道的js，css揭秘，node实战这些已经看过了，就不要重复推荐了，这些都是我看过觉得不错的书。本人零基础，大学自学的一点前端知识，感觉需要扩展一下。
