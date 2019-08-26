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
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';


export default class HomePage extends Component {
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
          <TabNavigator
              tabBarStyle={{height: 60}}
          >
            <TabNavigator.Item
                title="主页"
                badgeText="1"
                selectedTitleStyle={{color: '#2196F3'}}
                selected={this.state.selectedTab === 'home'}
                renderIcon={() =>
                    <Image
                        style={styles.img}
                        source={require('../../res/images/icon_tabbar_homepage.png')}
                    />
                }
                renderSelectedIcon={() =>
                    <Image
                        style={[styles.img, {tintColor: '#f00'}]}
                        source={require('../../res/images/icon_tabbar_homepage.png')}
                    />
                }
                onPress={() => this.setState({selectedTab: 'home'})}
            >
              <PopularPage/>
            </TabNavigator.Item>
            <TabNavigator.Item
                title="设置"
                selectedTitleStyle={{color: '#f0f'}}
                selected={this.state.selectedTab === 'setting'}
                renderBadge={() => <Text>3</Text>}
                renderIcon={() =>
                    <Image
                        style={styles.img}
                        source={require('../../res/images/icon_tabbar_mine.png')}
                    />
                }
                renderSelectedIcon={() =>
                    <Image
                        style={[styles.img, {tintColor: '#f0f'}]}
                        source={require('../../res/images/icon_tabbar_mine_selected.png')}
                    />
                }
                onPress={() => this.setState({selectedTab: 'setting'})}
            >
              <AsyncStorageTest/>
            </TabNavigator.Item>
          </TabNavigator>
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

