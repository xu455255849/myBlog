![OOP](http://upload-images.jianshu.io/upload_images/3765249-ce9686eea8e32fbe.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 前言

这是读书笔记第二篇，看完之后突然发现自己对js的内置的一些东西还是了解的不够全面，很多方法见都没见过，啥用都不知道，这是非常不可取的。码农好歹也得眼熟啊，晓都不晓得后面的学习还怎么进行下去。。。赶紧做笔记吧～文中如有错误不当不出，欢迎指出～



## 创建一个对象


```
var obj = {}  //字面量创建
var obj = new Object()  //构造函数创建

```

2种创建方式是完全一样的，一般书写我们都采用字面量。

##  复制对象

首先明确一点，借用红宝书一句话，对于对于js中的赋值传参等操作，传递的都是值，不关是基本类型还是引用类型，传递的都是值，只是引用类型传递的是一个内存地址的值。不同对象如果引用同一块内存地址，还是会相互影响的。对象就是引用类型，这里介绍2种简单的方法来复制对象，又能不相互影响。

```
//安全的json序列对象，只能复制键值对，不能复制函数

JSON.parse(JSON.stringify(obj))


//es6新增的内置方法复制对象


Object.assign({},obj1,obj2...)

```







## 对象属性的特性

一般我们看到的对象就是一对对键值对，其实内部并没有我们想象的这么简单。看以下代码：

```
var a = {
			a:2,
			fuc:function() {	
			console.log('xxx')
			}
		}
		
		//通过Object.getOwnPropertyDescriptors获取对象属性
		Object.getOwnPropertyDescriptors(a)
		a: {
		configurable: true  ／／可配置
		enumerable: true  ／／可枚举
		value: 2
		writable: true ／／ 可写
		}
		.....
		
```

我们看到a属性除了一个值外，还有3个默认特性，继续看：

```
var myObject = {};

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: false, // not writable! 
    configurable: true,
    enumerable: true
} );

myObject.a = 3;

myObject.a; // 2

```
通过Object.defineProperty定义了一个a属性，该属性不可写，结果上我们已经无法修改属性值。


```
var myObject = { 
    a:2
};

myObject.a; // 2

delete myObject.a; 
myObject.a; // undefined

Object.defineProperty( myObject, "a", {
    value: 2,
    writable: true, 
    configurable: false, 
    enumerable: true
} );

myObject.a; // 2 
myObject.a ＝ 5; 
myObject.a; // 5


delete myObject.a; 
myObject.a; // 5

```
设置属性不可配置，我们看到我们无法再删除这个属性，但是仍然可以修改值。enumerable特性我们就比较熟悉了，for in循环枚举属性就是枚举可枚举的属性，如果我们设置为false ，这个属性就不会被枚举。

> 要注意有一个小小的例外：即便属性是configurable:false， 我们还是可以把writable的状态由true改为false，但是无法由false改为true。




## 自定义属性的set和get


```
var myObject = {
    // 给 a 定义一个getter
    get a() {
        return this._a_; 
    },

    // 给 a 定义一个setter
    set a(val) {
        this._a_ = val * 2;
    } 
};

myObject.a = 10 ;
myObject.a   //20

```
上面代码我们复写了a属性的获取和设置方法，没有赋值直接获取会返回undefined，通过这个可以使我们创造出一些有趣的东西，vue源码中我们就能看到很多实际的例子。


propertyIsEnumerable(..)会检查给定的属性名是否直接存在于对象中（而不是在原型链上）并且满足enumerable:true。

Object.keys(..)会返回一个数组，包含所有可枚举属性，Object.getOwnPropertyNames(..)会返回一个数组，包含所有属性，无论它们是否可枚举。

in和hasOwnProperty(..)的区别在于是否查找[[Prototype]]链，然而，Object.keys(..)和Object.getOwnPropertyNames(..)都只会查找对象直接包含的属性。


> 内置方法这里不再赘述，实时了解ecmascript的动态，掌握新的内容是非常必要的，我们可能永远用不到一些内置方法，但是我们确保得先知道它，不然在需要的时候可能会像无头苍蝇乱撞或者使用一些比较蠢的老方法。


## 面向对象编程

什么是面向对象编程？这个问题是我入坑时无法解惑的一个问题。但是随着业务的不断积累，这个问题会变得越来越清晰。


我们首先会介绍面向类的设计模式：实例化（instantiation）、继承（inheritance）和（相对）多态（polymorphism）。

### 类理论

类/继承描述了一种代码的组织结构形式——一种在软件中对真实世界中问题领域的建模方法。

面向对象编程强调的是数据和操作数据的行为本质上是互相关联的（当然，不同的数据有不同的行为），因此好的设计就是把数据以及和它相关的行为打包（或者说封装）起来。这在正式的计算机科学中有时被称为数据结构。

举例来说，用来表示一个单词或者短语的一串字符通常被称为字符串。字符就是数据。但是你关心的往往不是数据是什么，而是可以对数据做什么，所以可以应用在这种数据上的行为（计算长度、添加数据、搜索，等等）都被设计成String类的方法。

所有字符串都是String类的一个实例，也就是说它是一个包裹，包含字符数据和我们可以应用在数据上的函数。

我们还可以使用类对数据结构进行分类，可以把任意数据结构看作范围更广的定义的一种特例。

我们来看一个常见的例子，“汽车”可以被看作“交通工具”的一种特例，后者是更广泛的类。

“在我们的软件中，对不同的交通工具重复定义“载人能力”是没有意义的。相反，我们只在Vehicle中定义一次，定义Car时，只要声明它继承（或者扩展）了Vehicle的这个基础定义就行。Car的定义就是对通用Vehicle定义的特殊化。

虽然Vehicle和Car会定义相同的方法，但是实例中的数据可能是不同的，比如每辆车独一无二的VIN（Vehicle Identification Number，车辆识别号码），等等。

这就是类、继承和实例化。

类的另一个核心概念是多态，这个概念是说父类的通用行为可以被子类用更特殊的行为重写。实际上，相对多态性允许我们从重写行为中引用基础行为。

### '类'设计模式
你可能从来没把类作为设计模式来看待，讨论得最多的是面向对象设计模式，比如迭代器模式、观察者模式、工厂模式、单例模式，等等。从这个角度来说，我们似乎是在（低级）面向对象类的基础上实现了所有（高级）设计模式，似乎面向对象是优秀代码的基础。

> 考虑到尽可能容易理解。这里摘录了基本概念，这是一个抽象的东西，我们在撸码过程中可能不知不觉就已经在实践这种理念，但是没有看过这种概念的人可能会一下子说不出来。


这些概念实际上无法直接对应到JavaScript的对象机制，因此JavaScript开发者用一系列方法去模拟实现面相编程，比如混入，mixin。


这里说说在下对面相对象编程的理解	，面向对象编程其实就是一类事物的抽象。比如 人，都会说话，走路，但是可能有的人说汉语，有的人说英语，对于这种广泛的抽象中又有非常多的特例，我们可以对其建模:


```
var Person = function(){ 
this.name = 'person',
this.age = '',
this.talk = function(){alert('talk')},
this.walk = function(){alert('wall')}
}
var p1 = new Person()
var p2 = new Person()

p1.name = 'xu'
p2.name = 'pp'
...

```

我们构造了一个person函数，通过person函数构造了2个人类实例，一个名字是xu一个名字是pp。。会说话，会走路。

### ES6中的class语法

```
class Animal { 
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}

class Dog extends Animal {
  speak() {
    console.log(this.name + ' barks.');
  }
}

var d = new Dog('Mitzie');
// 'Mitzie barks.'
d.speak();

```

es6的class语法糖让我们模拟面相编程变得更加规范，这里引用mdn的一个例子，更具体的建议可以自己找文章看，毕竟这是一个js一个非常重要的知识。



## 后记

要想完全搞懂一些概念，抽象的东西，其实并不是一天两天，一两篇文章就能做到的，我的建议是，理论，实践，理论，实践，一个螺旋上升的过程。感觉笔记内容不是很深入，毕竟是读书笔记和自己的一些理解看法，就当深入的程度不是那么深吧～

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)
