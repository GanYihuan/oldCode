import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator, TabBarBottom} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import List from './app/creation/index';
import Edit from './app/edit/index';
import Account from './app/acount/index';
import Picture from './app/picture/index';


const MyTab = TabNavigator({
  List: {
    screen: List,
    navigationOptions: () => ({
      tabBarIcon: (({tintColor, focused}) => {
        return (
            <Icon
                name={'ios-videocam-outline'}
                size={30}
                color={focused ? '#ee735c' : '#000'}
            />
        )
      })
    })
  },
  Edit: {
    screen: Edit,
    navigationOptions: () => ({
      tabBarIcon: (({tintColor, focused}) => {
        return (
            <Icon
                name={'ios-recording-outline'}
                size={30}
                color={focused ? '#ee735c' : '#000'}
            />
        )
      })
    })
  },
  Picture: {
    screen: Picture,
    navigationOptions: () => ({
      tabBarIcon: (({tintColor, focused}) => {
        return (
            <Icon
                name={'ios-reverse-camera-outline'}
                size={30}
                color={focused ? '#ee735c' : '#000'}
            />
        )
      })
    })
  },
  Account: {
    screen: Account,
    navigationOptions: () => ({
      tabBarIcon: (({tintColor, focused}) => {
        return (
            <Icon
                name={'ios-contact-outline'} // 图标
                size={30}
                color={focused ? '#ee735c' : '#000'}
            />
        )
      })
    })
  }
}, {
  initialRouteName: 'Account', // 设置默认的页面组件
  tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
  swipeEnabled: false, // 是否允许在标签之间进行滑动。
  animationEnabled: false, // 是否在更改标签时显示动画。
  lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
  backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  tabBarOptions: {
    activeTintColor: '#f00', // label和icon的前景色 活跃状态下（选中）。
    inactiveTintColor: '#ee735c', // label和icon的前景色 不活跃状态下(未选中)。
    // activeBackgroundColor: 'red', //label和icon的背景色 活跃状态下（选中） 。
    inactiveBackgroundColor: '#E8E5F8', // label和icon的背景色 不活跃状态下（未选中）。
    showLabel: true, // 是否显示label，默认开启。
    showIcon: true, // 是否显示图标，默认关闭。
    upperCaseLabel: false // 是否使标签大写，默认为true。
  }
});


// 初始化StackNavigator
const MyNav = StackNavigator({
  // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
  MyTab: {
    screen: MyTab,
    navigationOptions: {
      header: null
    }
  }
}, {
  //initialRouteName: 'Login'
  initialRouteName: 'MyTab'
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


export default MyNav;

