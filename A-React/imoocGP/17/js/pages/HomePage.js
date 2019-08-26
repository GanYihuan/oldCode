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
  DeviceEventEmitter
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import AsyncStorageTest from '../../AsyncStorageTest';
import MyPage from './my/MyPage';
import Toast, {DURATION} from 'react-native-easy-toast';
import WebViewTest from '../../WebViewTest';
import TrendingTest from './../../TrendingTest';


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'MyPage',
    };
  }

  componentDidMount() {
    this.listener = DeviceEventEmitter.addListener('showToast', (text) => {
      this.toast.show(text, DURATION.LENGTH_LONG);
    })
  }

  componentWillUpMount() {
    this.listener && this.listener.remove();
  }

  render() {
    return (
        <View style={styles.container}>
          <TabNavigator
              tabBarStyle={{height: 60}}
          >
            <TabNavigator.Item
                title="PopularPage"
                badgeText="1"
                selectedTitleStyle={{color: '#2196F3'}}
                selected={this.state.selectedTab === 'PopularPage'}
                renderIcon={() =>
                    <Image
                        style={styles.img}
                        source={require('../../res/images/icon_tabbar_homepage.png')}
                    />
                }
                renderSelectedIcon={() =>
                    <Image
                        style={[styles.img, {tintColor: '#2196F3'}]}
                        source={require('../../res/images/icon_tabbar_homepage.png')}
                    />
                }
                onPress={() => this.setState({selectedTab: 'PopularPage'})}
            >
              {/* {...this.props} => 验证属性 包括navigator */}
              <PopularPage {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                title="TrendingTest"
                selectedTitleStyle={{color: '#f0f'}}
                selected={this.state.selectedTab === 'TrendingTest'}
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
                onPress={() => this.setState({selectedTab: 'TrendingTest'})}
            >
              <TrendingTest/>
            </TabNavigator.Item>
            <TabNavigator.Item
                title="MyPage"
                selectedTitleStyle={{color: '#0f0'}}
                selected={this.state.selectedTab === 'MyPage'}
                renderBadge={() => <Text>3</Text>}
                renderIcon={() =>
                    <Image
                        style={styles.img}
                        source={require('../../res/images/icon_tabbar_merchant_normal.png')}
                    />
                }
                renderSelectedIcon={() =>
                    <Image
                        style={[styles.img, {tintColor: '#0f0'}]}
                        source={require('../../res/images/icon_tabbar_merchant_selected.png')}
                    />
                }
                onPress={() => this.setState({selectedTab: 'MyPage'})}
            >
              <MyPage {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                title="WebViewTest"
                selectedTitleStyle={{color: '#FF7F24'}}
                selected={this.state.selectedTab === 'WebViewTest'}
                renderBadge={() => <Text>3</Text>}
                renderIcon={() =>
                    <Image
                        style={styles.img}
                        source={require('../../res/images/icon_tabbar_misc.png')}
                    />
                }
                renderSelectedIcon={() =>
                    <Image
                        style={[styles.img, {tintColor: '#FF7F24'}]}
                        source={require('../../res/images/icon_tabbar_misc_selected.png')}
                    />
                }
                onPress={() => this.setState({selectedTab: 'WebViewTest'})}
            >
              <WebViewTest/>
            </TabNavigator.Item>
            <TabNavigator.Item
                title="AsyncStorageTest"
                selectedTitleStyle={{color: '#A020F0'}}
                selected={this.state.selectedTab === 'AsyncStorageTest'}
                renderBadge={() => <Text>3</Text>}
                renderIcon={() =>
                    <Image
                        style={styles.img}
                        source={require('../../res/images/icon_tabbar_misc.png')}
                    />
                }
                renderSelectedIcon={() =>
                    <Image
                        style={[styles.img, {tintColor: '#A020F0'}]}
                        source={require('../../res/images/icon_tabbar_misc_selected.png')}
                    />
                }
                onPress={() => this.setState({selectedTab: 'AsyncStorageTest'})}
            >
              <AsyncStorageTest/>
            </TabNavigator.Item>
          </TabNavigator>
          <Toast ref={toast => this.toast = toast}/>
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
    height: 32,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

