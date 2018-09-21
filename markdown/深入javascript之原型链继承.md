## 前言

温故而知新，主要梳理js的原型链继承知识， 先看一张经典的图，很好的描述了js原型链。对对这一块还不是很了解的同学可以一起学习。

![3e8791e2d20fed539d07dd931b05ee87.png](http://upload-images.jianshu.io/upload_images/3765249-804c6d3e8d6fc92d.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
## 引子
在面向类的语言中，类可以被复制（或者说实例化）多次，就像用模具制作东西一样。我们在第4章中看到过，之所以会这样是因为实例化（或者继承）一个类就意味着“把类的行为复制到物理对象中”，对于每一个新实例来说都会重复这个过程。

但是在JavaScript中，并没有类似的复制机制。你不能创建一个类的多个实例，只能创建多个对象，它们[[Prototype]]关联的是同一个对象。但是在默认情况下并不会进行复制，因此这些对象之间并不会完全失去联系，它们是互相关联的。

最后我们得到了两个对象，它们之间互相关联，就是这样。我们并没有初始化一个类，实际上我们并没有从“类”中复制任何行为到一个对象中，只是让两个对象互相关联 。

> js是基于原型（对象）的语言，并非面向对象，也没有类似java的类的概念，只有利用函数模拟类的实现，这就是我们常常看到的原型链继承。


## 传统继承
首先介绍传统实现继承的几种方法,（代码参考阮一峰和幻神的文章，写的很好，强烈建议阅读。）先构造一个父类，代码如下：

```
function Animal (name) {
 
  this.name = name || 'Animal';

  this.sleep = function(){
    console.log(this.name + '正在睡觉！');
  }
}

Animal.prototype.type = '猫科动物'

```


### prototype继承

```
function Cat(){}
Cat.prototype = new Animal();
Cat.prototype.constructor = Cat; // 需要修复下原型指向
Cat.prototype.name = 'cat';

//　Test Code
var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal); //true 
console.log(cat instanceof Cat); //true

```

优点：

* 父类新增原型方法/原型属性，子类都能访问到
* 实现简单，方便易用

缺点：

* 无法实现多继承
* 创建子类实例时，无法向父类构造函数传参


### 构造继承

```

function Cat(name){
  Animal.call(this, name);
}

// Test Code
var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

```

优点：

* 创建子类实例时，可以向父类传递参数
* 可以实现多继承（call多个父类对象）

缺点：

* 只能继承父类的实例属性和方法，不能继承原型属性/方法
* 创建子类实例时，无法向父类构造函数传参

### 拷贝继承

```
function Cat(name){
  var animal = new Animal();
  for(var p in animal){
    Cat.prototype[p] = animal[p];
  }
  Cat.prototype.name = name || '';
}

// Test Code
var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal); // false
console.log(cat instanceof Cat); // true

```

优点：

* 支持多继承

缺点：

* 效率较低，内存占用高
* 无法拷贝不可枚举的属性

>  不建议使用，推荐object.create继承


### 组合继承

```
function Cat(name){
  Animal.call(this, name);
}
Cat.prototype = new Animal();

Cat.prototype.constructor = Cat;

// Test Code
var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true

```

优点：

* 构造继承优化版，弥补了无法继承父类原型属性／方法的缺点

缺点：

* 调用了两次父类构造函数，生成了两份实例

无法拷贝不可枚举的属性实例

### 寄生组合继承

```
function Cat(name){
  Animal.call(this, name);
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
  Cat.prototype.constructor = Cat; //修复
})();


// Test Code
var cat = new Cat();
console.log(cat);
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true

```

优点：

* 最理想的继承方法

缺点：

* 实现复杂

## ES6继承

### Object.create继承

```
//构造父类
function Animal(name) {
  this.name = name || 'bb'
}
Animal.prototype.speak = function(name) {
  console.info('lalala, ' + name);
};

//定义子类  并创建原型
function Dog(name) {
   Animal.call(this, name); 
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

var dog = new Dog("小白")

console.log(dog)
dog.speak('小白')


```

create也支持多继承， 代码如下：

```
//再定义一个父类
function AnimalOther(age) {
  this.age = age || 1
}

function Dog(name, age) {
   Animal.call(this, name); 
   AnimalOther.call(this, age)
}

Dog.prototype = Object.create(Animal.prototype);
Object.assign(Dog.prototype, AnimalOther.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.speak = function() {
     // do a thing
};

var dog = new Dog('name', 18)
console.log(dog) //...

```

### class构造类


```
//首先声明一个父类
class Animal {
	constructor(name, type) {
		this.name = name || '小白',
		this.type = type || '柴犬'
	}
	speak () {
		console.log(this.name + '旺旺')
	}
}

// 通过extends创建子类
class Lion extends Cat {
  speak() {
    super.speak();  //通过super调用父类函数
    console.log(this.name + ' roars.');
  }
}
		
```

如果是使用reac框架，应该对class是非常熟悉的。



## 后记

这篇文章传统继承本来自己结合多篇文章总结写了例子，可惜markdown挂了，导致数据丢了😢。

闭包，this，原型链等等问题一向是前端入门的难点、重点，好记性不如烂笔头，记录下来，忘了就多看几遍，总能记住，近期在整理面试题，梳理基础，内容太多，可能不打算写下来。


如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)