import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator, TabBarBottom} from 'react-navigation';
import Icomoon from 'react-native-vector-icons/Icomoon';
import Icon from 'react-native-vector-icons/Ionicons';

import ListScreen from './app/creation/index';
import EditScreen from './app/edit/index';
import AccountScreen from './app/acount/index';
import PictureScreen from './app/picture/index';

import DetailScreen from './app/creation/detail';
import LoginScreen from './app/acount/login';


class TabBarItem extends Component {
  render() {
    return (
        <Image
            style={{tintColor: this.props.tintColor, width: 25, height: 25}}
            source={this.props.focused ? this.props.selectedImage : this.props.normalImage}
        />
    )
  }
}


const Tab = TabNavigator(
    {
      List: {
        screen: ListScreen,
        navigationOptions: () => ({
          tabBarLabel: 'List',
          tabBarIcon: ({tintColor, focused}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./app/img/icon_tabbar_misc.png')}
                  selectedImage={require('./app/img/icon_tabbar_misc_selected.png')}
              />
          )
        })
      },
      Edit: {
        screen: EditScreen,
        navigationOptions: () => ({
          tabBarLabel: 'Edit',
          tabBarIcon: ({tintColor, focused}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./app/img/icon_tabbar_mine.png')}
                  selectedImage={require('./app/img/icon_tabbar_mine_selected.png')}
              />
          )
        })
      },
      Picture: {
        screen: PictureScreen,
        navigationOptions: () => ({
          tabBarLabel: 'Picture',
          tabBarIcon: ({tintColor, focused}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./app/img/icon_tabbar_merchant_normal.png')}
                  selectedImage={require('./app/img/icon_tabbar_merchant_selected.png')}
              />
          )
        })
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: ({navigation}) => ({
          tabBarLabel: 'Account',
          tabBarIcon: ({tintColor, focused}) => (
              <TabBarItem
                  tintColor={tintColor}
                  focused={focused}
                  normalImage={require('./app/img/icon_tabbar_homepage.png')}
                  selectedImage={require('./app/img/icon_tabbar_homepage_selected.png')}
              />
          )
        })
      }
    },
    {
      initialRouteName: 'Account', // 设置默认的页面组件
      tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
      swipeEnabled: false, // 是否允许在标签之间进行滑动。
      animationEnabled: false, // 是否在更改标签时显示动画。
      lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
      backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
      tabBarOptions: {
        activeTintColor: '#ff8500', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片未选中颜色
        showLabel: true, // 是否显示label，默认开启。
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        upperCaseLabel: false, // 是否使标签大写，默认为true。
        inactiveBackgroundColor: '#E8E5F8', // label和icon的背景色 不活跃状态下（未选中）。
        indicatorStyle: {
          height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏.
        },
        style: {
          // TabBar 背景色
          backgroundColor: '#fff'
        },
        labelStyle: {
          fontSize: 10, // 文字大小
        }
      }
    }
);


// 初始化StackNavigator
const Navigator = StackNavigator(
    {
      // 将TabNavigator包裹在StackNavigator里面可以保证跳转页面的时候隐藏tabbar
      Tab: {
        screen: Tab,
        navigationOptions: {
          header: null
        }
      },
      Detail: {
        screen: DetailScreen,
        navigationOptions: {
          header: null
        }
      },
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          header: null
        }
      }
    },
    {
      //initialRouteName: 'Login'
      initialRouteName: 'Tab'
    }
);


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


export default Navigator;

