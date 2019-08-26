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


export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'WebViewTest',
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
                        style={[styles.img, {tintColor: '#2196F3'}]}
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
            <TabNavigator.Item
                title="自定义标签页"
                selectedTitleStyle={{color: '#0f0'}}
                selected={this.state.selectedTab === 'self'}
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
                onPress={() => this.setState({selectedTab: 'self'})}
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

