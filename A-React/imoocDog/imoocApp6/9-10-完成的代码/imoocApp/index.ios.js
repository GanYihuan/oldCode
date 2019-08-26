import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TabBarIOS,
    Navigator,
    // AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的,它用来代替LocalStorage。
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './app/creation/index';
import Edit from './app/edit/index';
import Acount from './app/acount/index';  // hard to understand!
import Login from './app/acount/login';

export default class imoocApp extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'acount',
      notifCount: 0,
      presses: 0,
      logined: false,
      user: null,
      selectTab: 'list'
    }
  }

  render() {
    // begin enter main.index
    if (!this.state.logined) {
      // Receive data from the lower level
      return <Login afterLogin={this._afterLogin.bind(this)}/>
    }

    return (
        <TabBarIOS tintColor="#ee735c">
          <Icon.TabBarItem
              iconName="ios-videocam-outline"
              selectedIconName="ios-videocam"
              selected={this.state.selectedTab === 'list'}
              onPress={() => {
              this.setState({
                selectedTab: 'list'
              });
          }}>
            <Navigator
                initialRoute={{
                  name: 'list',
                  component: List
                }} configureScene={(route) => {
                  return Navigator.SceneConfigs.FloatFromRight
                }} renderScene={(route, navigator) => {
                  var Component = route.component;
                  return <Component {...route.params} navigator={navigator}/>
                }}
            />
          </Icon.TabBarItem>
          <Icon.TabBarItem
              iconName="ios-recording-outline"
              selectedIconName="ios-recording"
              selected={this.state.selectedTab === 'edit'}
              onPress={() => {
                this.setState({
                  selectedTab: 'edit',
                  notifCount: this.state.notifCount + 1,
                });
              }}
          >
            <Edit />
          </Icon.TabBarItem>
          <Icon.TabBarItem
              iconName="ios-more-outline"
              selectedIconName="ios-more"
              selected={this.state.selectedTab === 'acount'}
              onPress={() => {
                this.setState({
                  selectedTab: 'acount',
                  presses: this.state.presses + 1
                });
              }}
          >
            <Acount
                logout={this._logout.bind(this)}
                user={this.state.user}
            />
          </Icon.TabBarItem>
        </TabBarIOS>
    );
  }

  componentDidMount() {
    this._asyncAppStatus();
  }

  _asyncAppStatus() {
    var that = this;
    // AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。它用来代替LocalStorage。
    // static getItem(key: string, callback?: ?(error: ?Error, result: ?string) => void) #
    // 读取key字段并将结果作为第二个参数传递给callback
    AsyncStorage.getItem('user')
        .then((data) => {
          var user;
          var newState = {};
          if (data) {
            // data transform object
            user = JSON.parse(data);
          }
          if (user && user.accessToken) {
            newState.user = user;
            newState.logined = true;
          } else {
            newState.logined = false;
          }
          that.setState(newState);
        });
  }

  _logout() {
    AsyncStorage.removeItem('user');
    this.setState({
      user: null,
      logined: false
    })
  }

  _afterLogin(user) {
    var that = this;
    // object transfer string
    user = JSON.stringify(user);
    // static setItem(key: string, value: string, callback?: ?(error: ?Error) => void)
    // 将key字段的值设置成value，并在完成后调用callback函数。
    AsyncStorage.setItem('user', user)
        .then(() => {
          that.setState({
            logined: true,
            user: user
          })
        })
  }
}

AppRegistry.registerComponent('imoocApp', () => imoocApp);