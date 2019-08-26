import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import List from './app/creation/index';
import Edit from './app/edit/index';
import Acount from './app/acount/index';

export default class imoocApp1 extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'list'
    }
  }

  render() {
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
              }}
          >
            <List/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
              iconName="ios-recording-outline"
              selectedIconName="ios-recording"
              selected={this.state.selectedTab === 'edit'}
              onPress={() => {
                this.setState({
                  selectedTab: 'edit'
                });
              }}
          >
            <Edit/>
          </Icon.TabBarItem>
          <Icon.TabBarItem
              iconName="ios-more-outline"
              selectedIconName="ios-more"
              selected={this.state.selectedTab === 'acount'}
              onPress={() => {
                this.setState({
                  selectedTab: 'acount'
                });
              }}
          >
            <Acount/>
          </Icon.TabBarItem>
        </TabBarIOS>
    );
  }
}

AppRegistry.registerComponent('imoocApp1', () => imoocApp1);
