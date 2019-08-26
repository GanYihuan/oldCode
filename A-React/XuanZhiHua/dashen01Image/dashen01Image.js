import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import BadgeData from '../json/BadgeData.json';


let {width} = Dimensions.get('window');
let cols = 3;
let boxW = 100;
let vMargin = (width - cols * boxW) / (cols + 1);
let hMargin = 25;


export default class LoginView extends Component {
  render() {
    return (
        <View style={styles.container}>
          {/*this代表这个类,调用类里面的方法, ()代表马上执行 */}
          {this.renderAllBadge()}
        </View>
    );
  }

  // 返回所有的包
  renderAllBadge() {
    // 定义数组,装所有的子组件
    let allBadge = [];
    for (let i = 0; i < BadgeData.data.length; i++) {
      // 取出单独的数据对象
      let item = BadgeData.data[i];
      // 直接转入数组
      allBadge.push(
          <View
              key={i}
              style={styles.outViewStyle}
          >
            <Image
                style={styles.imageStyle}
                source={{uri: item.icon}}
            />
            <Text style={styles.mainTitleStyle}>{item.title}</Text>
          </View>
      );
    }
    // 返回数组
    return allBadge;
  }
}


const styles = StyleSheet.create({
  container: {
    // 确定主轴的方向
    flexDirection: 'row',
    // 换行显示
    flexWrap: 'wrap'
  },
  outViewStyle: {
    alignItems: 'center',
    width: boxW,
    height: boxW,
    marginLeft: vMargin,
    marginTop: hMargin,
    backgroundColor: '#f00'
  },
  imageStyle: {
    width: 80,
    height: 80
  },
  mainTitleStyle: {
    color: '#fff'
  },
});



