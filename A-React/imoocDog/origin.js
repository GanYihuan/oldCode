/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';
import Icomoon from 'react-native-vector-icons/Icomoon';
import Icon from 'react-native-vector-icons/Ionicons';

export default class mukeApp extends Component {
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
              iconName="ios-camera-outline"
              selectedIconName="ios-camera"
              selected={this.state.selectedTab === 'list'}
              onPress={() => {
                this.setState({
                  selectedTab: 'list'
                });
              }}
          >
            <Text>A1</Text>
          </Icon.TabBarItem>
          <Icomoon.TabBarItem
              iconName="addpeople_fill"
              selectedIconName="addpeople"
              selected={this.state.selectedTab === 'edit'}
              onPress={() => {
                this.setState({
                  selectedTab: 'edit'
                });
              }}
          >
            <Text>A2</Text>
          </Icomoon.TabBarItem>
          <Icomoon.TabBarItem
              iconName="brush_fill"
              selectedIconName="brush"
              selected={this.state.selectedTab === 'acount'}
              onPress={() => {
                this.setState({
                  selectedTab: 'acount'
                });
              }}
          >
            <Text>A3</Text>
          </Icomoon.TabBarItem>
        </TabBarIOS>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

AppRegistry.registerComponent('mukeApp', () => mukeApp);
