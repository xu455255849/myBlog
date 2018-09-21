## 前言
不知不觉撸码1年了（从实习算起），从水平看的话只能算一般般吧，自我感觉就是对js比较熟悉，差不多同门兄弟的脸算是都见过了，热门框架也都用的差不多了，除了angular。。基本没啥机会用。要说复杂多功能 那就react，要小巧快速那就vue，逻辑简单的项目无疑vue莫属。今天看dva看的头疼，突然捡起了一个丢掉的想法。css写了这么久，然而水平还是只停留在简单的嵌套和复制中，趁这个机会是时候彻底学习一下css中那些高级的东西了。

> 本文只针对 less 不过基本一样的，sass在项目中需要额外的插件一般的话我用  less

## 变量

```
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;
.header {
  color: @light-blue;
}

/// output
.header {
  color: #6c94be;
}

```

## Mixin

```
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

.menu a {
  color: #111;
  .bordered;
}

```

除了基本的混合还有传参混合和函数混合，通过参数可以在一个样式中写出不同的效果

```
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}
```

```
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // "call" the mixin
  padding: @average;    // use its "return" value
}
```

## 嵌套规则

```
.header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }

   &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  
}
```

## 运算

```
@base: 5%;
@filler: @base * 2;
@other: @base + @filler;

color: #888 / 4;
background-color: @base-color + #111;
height: 100% / 2 + @filler;
```


## 循环
如果你不是框架开发者可能用不到这个语法 

```
.loop(@counter) when (@counter > 0) {
  .loop((@counter - 1));    // next iteration
  width: (10px * @counter); // code for each iteration
}

div {
  .loop(5); // launch the loop
}

//output

div {
  width: 10px;
  width: 20px;
  width: 30px;
  width: 40px;
  width: 50px;
}
```


```
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}

///output 

.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

##  父选择符

```
a {
  color: blue;
}

a:hover {
  color: green;
}

////////

.button {
  &-ok {
    background-image: url("ok.png");
  }
  &-cancel {
    background-image: url("cancel.png");
  }

  &-custom {
    background-image: url("custom.png");
  }
}

//////

.link {
  & + & {
    color: red;
  }

  & & {
    color: green;
  }

  && {
    color: blue;
  }

  &, &ish {
    color: cyan;
  }
}

.link + .link {
  color: red;
}
.link .link {
  color: green;
}
.link.link {
  color: blue;
}
.link, .linkish {
  color: cyan;
}

```

##  后记

。。。水了一贴的感觉，不过vue构架的经验不想写，含金量不高，react写不出东西，没有特别好的idea。。下一篇就写dva笔记吧。
