import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ImgData from './app/imageData/img.json';

import ToiPage from './app/toilet/toiletPage';
import ReadPage from './app/read/read';
import WeatherPage from './app/weather/weather';
import SettingPage from './app/setting/setting';


class Toilet extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'read'
    }
  }

  render() {
    return (
        <TabBarIOS
            tintColor="#00f" // icon color
            barTintColor="#ff0" // bar color
        >
          <Icon.TabBarItem
              iconName="ios-videocam-outline"
              selectedIconName="ios-videocam"     // 选择时图标变化
              selected={this.state.selectedTab === 'toilet'}
              onPress={() => {
                this.setState({
                  selectedTab: 'toilet'
                });
              }}
          >
            <Toi/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
              iconName="ios-recording-outline"
              selectedIconName="ios-recording"
              selected={this.state.selectedTab === 'read'}
              onPress={() => {
                this.setState({
                  selectedTab: 'read'
                });
              }}
          >
            <Read/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
              iconName="ios-more-outline"
              selectedIconName="ios-more"
              selected={this.state.selectedTab === 'weather'}
              onPress={() => {
                this.setState({
                  selectedTab: 'weather'
                });
              }}
          >
            <Weather/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
              //title="setting"
              //icon={{uri: base64Icon, scale: 3}}
              iconName="ios-videocam-outline"
              selectedIconName="ios-videocam"     // 选择时图标变化
              selected={this.state.selectedTab === 'setting'}
              onPress={() => {
                this.setState({
                  selectedTab: 'setting'
                });
              }}
          >
            <Setting/>
          </Icon.TabBarItem>
        </TabBarIOS>
    );
  }
}


AppRegistry.registerComponent('Toilet', () => Toilet);
