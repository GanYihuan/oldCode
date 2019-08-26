/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Boy from './Boy';


export default class imooc_gp extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      selectedTab: 'home',
    };
  }

  render() {
    let homeView = (
        <View style={[styles.flex, styles.center, {backgroundColor: '#ffff0044'}]}>
          <Text style={{fontSize: 22}}>我是主页</Text>
        </View>
    );

    let settingView = (
        <View style={[styles.flex, styles.center, {backgroundColor: '#ff000044'}]}>
          <Text style={{fontSize: 22}}>我是设置页面</Text>
        </View>
    );

    return (
        <View style={styles.container}>
          <Navigator
              initialRoute={{component: Boy}}
              //配置场景
              configureScene={(route) => {
                //这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js
                return Navigator.SceneConfigs.HorizontalSwipeJumpFromLeft;
              }}
              renderScene={(route, navigator) => {
                let Component = route.component;
                return <Component {...route.params} navigator={navigator}/>
              }}
          />
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  flex: {
    flex: 1,
  },
  img: {
    width: 36,
    height: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('imooc_gp', () => imooc_gp);
