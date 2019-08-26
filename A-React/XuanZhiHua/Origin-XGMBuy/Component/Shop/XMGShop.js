import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Platform,
    TouchableOpacity,
    Image,
    WebView
} from 'react-native';


class Shop extends Component {
  constructor() {
    super();
    this.state = {
      detailurl: 'http://imooc.com'
    }
  }

  render() {
    return (
        <View style={styles.container}>
          {this.renderNavBar()}
          <WebView
              // copy
              source={{uri: this.state.detailurl}}  // change url
              automaticallyAdjustContentInsets={false}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              decelerationRate="normal"
              startInLoadingState={true}
          />
        </View>
    );
  }

  // 导航栏
  renderNavBar() {
    return (
        <View style={styles.navOutViewStyle}>
          <TouchableOpacity style={styles.leftViewStyle} onPress={()=>{this.popTopHome()}}>
            <Image style={styles.navImageStyle} source={{uri: 'icon_shop_local'}}/>
          </TouchableOpacity>
          <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>商家</Text>
          <TouchableOpacity style={styles.rightViewStyle} onPress={()=>{alert('点了!')}}>
            <Image style={styles.navImageStyle} source={{uri: 'icon_shop_search'}}/>
          </TouchableOpacity>
        </View>
    )
  }

  popTopHome() {
    this.props.navigator.pop();
  }
}


const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  navImageStyle: {
    width: Platform.OS === 'ios' ? 28 : 24,
    height: Platform.OS === 'ios' ? 28 : 24
  },
  leftViewStyle: {
    position: 'absolute',
    left: 10,
    bottom: Platform.OS === 'ios' ? 15 : 13
  },
  rightViewStyle: {
    // 绝对定位
    position: 'absolute',
    right: 10,
    bottom: Platform.OS === 'ios' ? 15 : 13
  },
  navOutViewStyle: {
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: 'rgba(255,96,0,1.0)',
    // 设置主轴的方向
    flexDirection: 'row',
    // 垂直居中 ---> 设置侧轴的对齐方式
    alignItems: 'center',
    // 主轴方向居中
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#e8e8e8'
  }
});

// 输出组件类
module.exports = Shop;
