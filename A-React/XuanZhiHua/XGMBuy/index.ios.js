import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import LaunchImage from './Component/Main/XMGLaunchImage';

class XGMBuy extends Component {
  render() {
    return (
        <Navigator
            tintColor="#f0f"
            initialRoute={{
              name: '启动页',
              component: LaunchImage
              //title:'网易',
              //leftButtonIcon:require('image!navigationbar_friendattention'),
              //leftButtonIcon:require('../image/NavigationBar/navigationbar_friendattention.png'),
              //rightButtonIcon:require('image!navigationbar_pop')
              //rightButtonIcon:require('../image/NavigationBar/navigationbar_pop.png')
            }}
            configureScene={() => {
              return Navigator.SceneConfigs.PushFromRight;  // animated
            }}
            renderScene={(route, navigator) => {
              let Component = route.component;
              return <Component {...route.passProps} navigator={navigator}/>;
            }}
        />
    );
  }
}

AppRegistry.registerComponent('XGMBuy', () => XGMBuy);
