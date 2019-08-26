import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Dimensions,
} from 'react-native';
import ImageData from '../json/imgData.json';


let {width} = Dimensions.get('window');


export default class dashen02TextInput extends Component {
  render() {
    return (
        <View style={styles.container}>
          {this._renderImage(0)}
          <TextInput
              style={styles.textInputStyle}
              placeholder={'UserName'}
              // value={'default text'}
          />
          <TextInput
              style={styles.textInputStyle}
              placeholder={'Password'}
              password={true}
              keyboardType={'default'}
              multiline={true}
              clearButtonMode={'always'}
          />
          <View style={styles.loginBtnStyle}>
            <Text style={{color: '#fff'}}>Login</Text>
          </View>
          <View style={styles.settingStyle}>
            <Text>Can't Login</Text>
            <Text>New User</Text>
          </View>
          <View style={styles.otherLoginStyle}>
            <Text>Other Login: </Text>
            {this._renderImage(1)}
            {this._renderImage(2)}
            {this._renderImage(3)}
          </View>
        </View>
    );
  }

  _renderImage(index) {
    let allImage = [];
    let imgsArr = ImageData.data;
    let imgItem = imgsArr[index];
    let styleType = (index === 0) ? styles.imgheader : styles.imgfooter;

    allImage.push(
        <Image
            key={index}
            style={styleType}
            source={{uri: imgItem.img}}
        />
    );
    return allImage;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 默认为纵向.设置侧轴的对齐方式
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  iconStyle: {
    width: 80,
    height: 80,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  otherImageStyle: {
    width: 50,
    height: 50,
    marginLeft: 8,
    borderRadius: 25,
  },
  textInputStyle: {
    height: 38,
    marginBottom: 1,
    // 内容居中
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  loginBtnStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.9,
    height: 35,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#00f',
  },
  settingStyle: {
    // 设置主轴的方向
    flexDirection: 'row',
    // 主轴的对齐方式
    justifyContent: 'space-between',
    width: width * 0.9,
  },
  otherLoginStyle: {
    // backgroundColor:'red',
    // 设置主轴的方向
    flexDirection: 'row',
    // 设置侧轴的对齐方式
    alignItems: 'center',
    // 绝对定位
    position: 'absolute',
    bottom: 10,
    left: 20,
  },
  imgheader: {
    width: 80,
    height: 80,
    marginTop: 50,
    marginBottom: 30,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#fff',
  },
  imgfooter: {
    width: 50,
    height: 50,
    marginLeft: 8,
    borderRadius: 25,
  }
});

