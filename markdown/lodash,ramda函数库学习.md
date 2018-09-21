## lodash,ramda函数库学习

## 前言 
今天梳理一下工具库，总体讲就是做一个摘要。加深记忆，以后会在项目中运用起来。～学了一段时间微信小程序。。公众号，繁琐的认证搞得头大，使用的技术是nuxt + koa + pug + mongodb。全栈式开发真的让人欲罢不能，使用nuxt你不用烦琐的定义路由，可以API分层开发，你可以很好的管理页面和API接口，强大的中间件可以让你随心所欲的控制交互。。。总之感觉不坏，有兴趣的同学可以尝试尝试。本文主要是函数库学习笔记，建议没用过的同学Github走起。 


> 摘录学习，方便以后快速查阅，一些简单的方法不做记录。

##  lodash－array

 * _.chunk(array, [size=1])  拆分一个数组，返回一个二维数组
 
 
 ```

_.chunk(['a', 'b', 'c', 'd'], 2);
// => [['a', 'b'], ['c', 'd']]

_.chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]


```

* _.compact(array) 过滤false、null、0、undefined等假值，返回一个过滤后数组

```
_.compact([0, 1, false, 2, '', 3]);
// => [1, 2, 3]

```

* _.difference(array, [values]) 去掉values数组的值，返回过滤后数组

```

_.difference([1, 2, 3], [4, 2]);
// => [1, 3]
_.difference([1, '2', 3], [4, 2]);
// => [1, "2", 3]


```


* _.without(array, [values])  不改变原数组。
* _.pull(array, [values]) 移除数组中所有参数的值，返回一个过滤后数组,和without相比，此方法改变了原数组。
* _.pullAt(array, [indexes]) 移除指定位置的值


```

_.without([1, 2, 1, 3], 1, 2);
// => [3]



var array = [1, 2, 3, 1, 2, 3];

_.pull(array, 2, 3);
console.log(array);
// => [1, 1]



var array = [5, 10, 15, 20];
var evens = _.pullAt(array, 1, 3);

console.log(array);
// => [5, 15]

console.log(evens);
// => [10, 20]

```

* _.remove(array, [predicate=_.identity], [thisArg])  制定一个方法操作数组，这个方法会修改原始数组并且返回一个新数组。

```
var array = [1, 2, 3, 4];
var evens = _.remove(array, function(n) {
  return n % 2 == 0;
});

console.log(array);
// => [1, 3]

console.log(evens);
// => [2, 4]


```

* _.union([arrays])  对多个数组去重

```

_.union([1, 2], [4, 2], [2, 1]);
// => [1, 2, 4]

```

* _.unzip(array)  数组对应序列分割
* _.zip([arrays])  数组对应序列合并
* _.zipObject(props, [values=[]])  合并成对象（不常用）

```
var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
// => [['fred', 30, true], ['barney', 40, false]]

_.unzip(zipped);
// => [['fred', 'barney'], [30, 40], [true, false]]


_.zipObject([['fred', 30], ['barney', 40]]);
// => { 'fred': 30, 'barney': 40 }

_.zipObject(['fred', 'barney'], [30, 40]);
// => { 'fred': 30, 'barney': 40 }


```


## laodsh -- collection



* _.filter(collection, [predicate=_.identity], [thisArg]) 过滤函数

```
_.filter([4, 5, 6], function(n) {
  return n % 2 == 0;
});
// => [4, 6]

var users = [
  { 'user': 'barney', 'age': 36, 'active': true },
  { 'user': 'fred',   'age': 40, 'active': false }
];

// using the `_.matches` callback shorthand
_.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
// => ['barney']

// using the `_.matchesProperty` callback shorthand
_.pluck(_.filter(users, 'active', false), 'user');
// => ['fred']

// using the `_.property` callback shorthand
_.pluck(_.filter(users, 'active'), 'user');
// => ['barney']


```

* _.map(collection, [iteratee=_.identity], [thisArg])  遍历对象操作

```
function timesThree(n) {
  return n * 3;
}

_.map([1, 2], timesThree);
// => [3, 6]

_.map({ 'a': 1, 'b': 2 }, timesThree);
// => [3, 6] (iteration order is not guaranteed)

var users = [
  { 'user': 'barney' },
  { 'user': 'fred' }
];

// using the `_.property` callback shorthand
_.map(users, 'user');
// => ['barney', 'fred']	


```

* _.pluck(collection, path)  获取一组对象字段值

```
var users = [
  { 'user': 'barney', 'age': 36 },
  { 'user': 'fred',   'age': 40 }
];

_.pluck(users, 'user');
// => ['barney', 'fred']

var userIndex = _.indexBy(users, 'user');
_.pluck(userIndex, 'age');
// => [36, 40] (iteration order is not guaranteed)


```






##

##

##

##

##

##
##

##

##

##

##

##

##

