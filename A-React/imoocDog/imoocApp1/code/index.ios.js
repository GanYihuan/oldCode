/**
 * 170924
 * 使用 Icon 组件
 * 使用 ListView 组件
 * 异步请求封装 request.js
 *
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
} from 'react-native';
import App from './App';


class imoocCat extends Component {
  render() {
    return (
        <App/>
    );
  }
}


AppRegistry.registerComponent('imoocCat', () => imoocCat);
