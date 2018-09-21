## 前言

本想着看完《你不晓得js》，公司项目差不多就跟上了，结果书看完了，写完2篇自认为不错的笔记，还是没有项目跟进。看书是看不下去了，不敲代码要死。想着之前把react文档又看了一遍，搭好了react的全家桶（redux route绑定）开发框架，写一个小项目吧～native也很不错，顺便学一下native吧～OK！react native 搞起

本文完整代码都在Github
[项目源码](https://github.com/xu455255849/rn-learn)
> 建议拉取代码在模拟器运行后配合本文观看效果更佳



## 环境安装
我尝试运行iOS但是报错，感觉是因为我的Mac版本太低，xcode也是7.0版本，后来换了android环境。

传送门： [环境搭建](http://reactnative.cn/docs/0.49/getting-started.html)

跟着官方文档安装好安卓环境后，我们首先运行模拟器（需要bios里开起虚拟支持，否则无法运行模拟器）然后运行

```
react-native run-android
```

![安卓ide自带avd模拟器](http://upload-images.jianshu.io/upload_images/3765249-9227ad5a28ba291e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


项目启动成功，开始项目开发！

> 由于native是基于js编写，所以ide还是用前端ide（react语法版）最好，在javascript配置选择react jsx。


## 路由编写

po主采用的是 [react-navigation](https://reactnavigation.org/docs/intro/)控制路由。

```
/**
 * Created by xushaoping on 17/10/25.
 */

import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HomeScreen from '../page/home'
import MusicScreen from '../page/music'
import PhotoScreen from '../page/photo'
import SettingScreen from '../page/setting'
import ArticleScreen from '../page/article'

const RootTabs = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: '文章',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../assets/arthome.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Music: {
        screen: MusicScreen,
        navigationOptions: {
            tabBarLabel: '音乐厅',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../assets/music.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Photo: {
        screen: PhotoScreen,
        navigationOptions: {
            tabBarLabel: '图库',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../assets/photo.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },
    Setting: {
        screen: SettingScreen,
        navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../assets/setting.png')}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: '#e92830',
        showIcon: true,
        indicatorStyle: {
            height: 0
        },
        style: {
            backgroundColor: '#70e4e9'
        }
    },
});

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});


const RootNavigator = StackNavigator({
    Home: {
        screen: RootTabs,
        navigationOptions: {
            header: null
        },
    },
    Article: {
        screen: ArticleScreen
    }
    
});

export default RootNavigator;

```

上面代码我们编写了一个StackNavigator，TabNavigator混合路由，通过在StackNavigator引用TabNavigator实现了现在市面上我们很常见的app展现方式。
关于英文不好的同学这里推荐一篇关于配置的文章
http://www.jianshu.com/p/2f575cc35780

配置参数介绍，我这里就不再累赘说明，路由搭建好了，可以开始开始业务编写。


## flex布局

对于native布局，我们不能使用div，并且样式也很少写。因为flex布局可以很好的解决我们的布局问题。开发前，强烈建议完全弄懂flex机制，通过flex配合显示标签view和scrollviex展示我们的应用。虾面看一个简单布局：

```

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';


export default class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
        };
    }
    
    componentDidMount() {
    
    }
    
    render() {
        return (
            <View style={styles.container}>
             
                <View style={{backgroundColor: 'blue', height: 50}}></View>
                <View style={{ flex: 2, backgroundColor: 'red', height: 50}}></View>
                <View style={{backgroundColor: 'yellow', height: 50}}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    
});

```
上面我们就通过view 和 stylesheet构建了一个简单布局页面，po主刚开始做项目时候 还是通过css去控制布局，非常麻烦，native写样式比较低效，后来发现利用好flex布局，我们是基本不需要通过css去控制布局的。


## 编写一个底部加载的长列表

```
   <FlatList
                    data={this.state.list}
                    onEndReachedThreshold={0.2}
                    onEndReached={this.reached}
                    renderItem={({item}) => (
                        <View style={{ flexDirection: 'row', padding: 20, marginBottom: 10 }}>
                            <View style={{ flex: 2, height: 80}} >
                               <Image
                                    source={{ uri: item.imgPath }}
                                    style={{ height: 80, marginRight: 10, resizeMode: 'contain' }}
                               />
                            </View>
                            <View style={{ flex: 4, height: 80, }} >
                                <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
                                <Text numberOfLines={3} >{item.intro}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 80,}} >
                                <Button
                                    color="#70e4e9"
                                    onPress={() => navigation.navigate('Article', {id: item._id})}
                                    title="阅读"
                                />
                            </View>
                        </View>
                    )}
                />
                
                
                
                

reached = ()=> {
        request
        .get('http://106.14.205.222/article/list')
        .query({ page: this.state.page, limit: 10, isActive: 1})
        .end((err, res) => {
            if (err) throw err
            this.state.page++
            if (res.body.list.length == 0) {
                Toast.info('没有更多数据了哦', 1);
            } else {
                res.body.list.forEach( (it, i)=> {
                    var path = 'http://106.14.205.222' + it.imgPath.slice(6)
                    res.body.list[i].imgPath = path
                })
                var result = this.state.list.concat(res.body.list)
    
                Toast.loading('加载中...', 1, () => {
                    this.setState({
                        list: result
                    })
                });
            }
        });
    };

```

官方封装了一个flatlist组件，通过这个组件，我们可以快速编写一个动态加载长列表，为了更好的体验效果，在加载中我们利用一个toast 去提示用户，demo列表通过ajax返回了一个markdown文章列表，找了一下Github，发现目前native县城的markdown的插件还比较少，我用了 native-simple-markdown去转换显示。



## 编写动画


```
/**
 * Created by xushaoping on 17/10/27.
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, Animated, Easing } from 'react-native';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

var yu = new Sound('yu.mp3', Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // loaded successfully
    console.log('duration in seconds: ' + yu.getDuration() + 'number of channels: ' + yu.getNumberOfChannels());
});

export default class MusicScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '兔裹煎蛋卷 - 鱼玄机',
            play: false,
            height: new Animated.Value(240),
            width: new Animated.Value(Dimensions.get('window').width),
            radius: new Animated.Value(0),
            rotate : new Animated.Value(0),
        };
    }
    
    componentDidMount() {
    
    }
    
    play = ()=> {
        if (this.state.play) {
            yu.pause();
            this.setState({
                play: !this.state.play
            })
        } else {
            yu.play();
            this.setState({
                play: !this.state.play
            }, () => {
                this.startAnimation()
            })
        }
    };
    
     startAnimation () {
        Animated.parallel([
            Animated.timing(this.state.width, {
                toValue: 200,
                duration: 1000,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.state.height, {
                toValue: 200,
                duration: 1000,
                easing: Easing.linear,// 线性的渐变函数
            }),
            Animated.timing(this.state.radius, {
                toValue: 100,
                duration: 1000,
                easing: Easing.linear,// 线性的渐变函数
            })
        ]).start(() => this.rotate());
    }
    
    rotate () {
        if (this.state.play) {
            this.state.rotate.setValue(0);
            
            Animated.timing(this.state.rotate, {
                toValue: 1,
                duration: 10000,
                easing: Easing.linear,// 线性的渐变函数
            }).start(() => this.rotate())
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 4}}>
                    <Text style={styles.title}>{this.state.title}</Text>
                    <Text style={styles.intro}>
                        鱼玄机，女，晚唐诗人，长安（今陕西西安）人。初名鱼幼微，字蕙兰。咸通（唐懿宗年号，860—874）中为补阙李亿妾，以李妻不能容，进长安咸宜观出家为女道士。与文学家温庭筠为忘年交，唱和甚多。后被京兆尹温璋以打死婢女之罪名处死。鱼玄机性聪慧，有才思，好读书，尤工诗。与李冶、薛涛、刘采春并称唐代四大女诗人。其诗作现存五十首，收于《全唐诗》。有《鱼玄机集》一卷。其事迹见《唐才子传》等书。
                    </Text>
                </View>
                <View style={{flex: 5}}>
                    <Animated.Image
                        style={{
                            height: this.state.height,
                            width: this.state.width,
                            borderRadius: this.state.radius,
                            transform: [
                                {rotateZ: this.state.rotate.interpolate({
                                    inputRange: [0,1],
                                    outputRange: ['0deg', '360deg']
                                })}
                            ]
                        }}
                        source={require('../assets/bg-music.jpg')}
                    />
                </View>
                <View style={{flex: 1, width: Dimensions.get('window').width - 40}}>
                    {
                        this.state.play ?
                            <Button color="#EE8094" title="暂停" onPress={this.play} />
                            :
                            <Button color="#95EE79" title="播放" onPress={this.play} />
                    }
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        color: '#ee69e0',
        textAlign: 'center',
        fontSize: 24
    },
    intro: {
        padding: 20
    }
});

```

上面是一个播放音乐旋转的动画。native编写动画，感觉不如web来的直接，我们要通过state定义好一个一个初始值，然后通过函数去改变state去刷新视图。不要直接更改state去操作动画，一定通过官方的API去实现，否则会产生很大的性能消耗。这里用了一个 react-native-sound库，貌似已经是Github上能找到的最好的库了，这个库最大的一个缺点是没有播放完的回调，你不能判断是否完成播放。


## 小结

如果已经会react  ，感觉开发native 的阻力是非常小的，基本只要看几遍文档后就差不多能用了。如果不会react ，那还是必须得先把react学会用了。

如果觉得本文对你有所帮助，就star一下吧～大传送之术！    [我的博客Github](https://github.com/xu455255849/myBlog)