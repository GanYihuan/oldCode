import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator} from 'react-navigation';
// import Icon from 'react-native-vector-icons/Ionicons';
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
        navigationOptions: () => (
            {
              tabBarLabel: 'List',
              tabBarIcon: ({tintColor, focused}) => (
                  <TabBarItem
                      tintColor={tintColor}
                      focused={focused}
                      normalImage={require('./app/img/icon_tabbar_misc.png')}
                      selectedImage={require('./app/img/icon_tabbar_misc_selected.png')}
                  />
              )
            }
        )
      },
      Edit: {
        screen: EditScreen,
        navigationOptions: () => (
            {
              tabBarLabel: 'Edit',
              tabBarIcon: ({tintColor, focused}) => (
                  <TabBarItem
                      tintColor={tintColor}
                      focused={focused}
                      normalImage={require('./app/img/icon_tabbar_mine.png')}
                      selectedImage={require('./app/img/icon_tabbar_mine_selected.png')}
                  />
              )
            }
        )
      },
      Picture: {
        screen: PictureScreen,
        navigationOptions: () => (
            {
              tabBarLabel: 'Picture',
              tabBarIcon: ({tintColor, focused}) => (
                  <TabBarItem
                      tintColor={tintColor}
                      focused={focused}
                      normalImage={require('./app/img/icon_tabbar_merchant_normal.png')}
                      selectedImage={require('./app/img/icon_tabbar_merchant_selected.png')}
                  />
              )
            }
        )
      },
      Account: {
        screen: AccountScreen,
        navigationOptions: ({navigation}) => (
            {
              tabBarLabel: 'Account',
              tabBarIcon: ({tintColor, focused}) => (
                  <TabBarItem
                      tintColor={tintColor}
                      focused={focused}
                      normalImage={require('./app/img/icon_tabbar_homepage.png')}
                      selectedImage={require('./app/img/icon_tabbar_homepage_selected.png')}
                  />
              )
            }
        )
      }
    },
    {
      // The routeName for the initial tab route when first loading.
      initialRouteName: 'Account',
      // Position of the tab bar, can be 'top' or 'bottom'.，android default at 'bottom'
      tabBarPosition: 'bottom',
      // Whether to allow swiping between tabs.。
      swipeEnabled: false,
      // Whether to animate when changing tabs.。
      animationEnabled: false,
      // 在app打开的时候将底部标签栏全部加载，默认false,推荐改成true
      // Whether to lazily render tabs as needed as opposed to rendering them upfront.
      lazy: true,
      // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
      // Should the back button cause a tab switch to the initial tab? If yes, set to initialRoute,
      backBehavior: 'none',
      tabBarOptions: {
        // Label and icon color of the active tab.
        activeTintColor: '#ff8500',
        // Label and icon color of the inactive tab.
        inactiveTintColor: '#999',
        //  Background color of the inactive tab.
        inactiveBackgroundColor: '#E8E5F8',
        // Whether to show label for tab, default is true.
        showLabel: true,
        // Whether to show icon for tab, default is false. android default 'false'
        showIcon: true,
        // Whether to make label uppercase, default is true.
        upperCaseLabel: false,
        // Style object for the tab indicator (line at the bottom of the tab).
        indicatorStyle: {
          // 如TabBar下面显示有一条线，可以设高度为0后隐藏.
          height: 0
        },
        // Style object for the tab bar.
        style: {
          backgroundColor: '#fff'
        },
        // Style object for the tab label.
        labelStyle: {
          fontSize: 10
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
      // Sets the default screen of the stack. Must match one of the keys in route configs.
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

