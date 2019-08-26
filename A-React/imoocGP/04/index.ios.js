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
  Navigator,
  ListView
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Boy from './Boy';
import ListViewTest from './ListViewTest';


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
          <ListViewTest/>
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
