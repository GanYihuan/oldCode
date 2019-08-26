import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    AlertIOS,
    AsyncStorage,
    Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import CountDown from 'react-native-countdown';
import request from '../common/request';
import config from '../common/config';

let width = Dimensions.get("window").width - 20;

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      verifyCode: '',
      phoneNumber: '',
      codeSent: false,  // 验证码发出否?
      countingDone: false // 倒计时结束否?
    }
  }

  _sendVerifyCode() {
    let that = this;
    let phoneNumber = this.state.phoneNumber;

    if (!phoneNumber) {
      return AlertIOS.alert('手机号不能为空');
    }

    let body = {
      phoneNumber: phoneNumber
    };
    let signupURL = config.api.base + config.api.signup;

    request.post(signupURL, body)
        .then((data) => {
          if (data && data.success) {
            that._showVerifyCode();
          } else {
            AlertIOS.alert('验证码失败1');
          }
        })
        .catch(function (err) {
          AlertIOS.alert('验证码失败2');
        })
  }

  _showVerifyCode() {
    this.setState({
      codeSent: true
    })
  }

  _countingDone() {
    this.setState({
      countingDone: true
    })
  }

  _submit() {
    let that = this;
    let phoneNumber = this.state.phoneNumber;
    let verifyCode = this.state.verifyCode;
    if (!phoneNumber || !verifyCode) {
      return AlertIOS.alert('手机号和验证码不能为空');
    }

    let body = {
      phoneNumber: phoneNumber,
      verifyCode: verifyCode
    };
    let verifyURL = config.api.base + config.api.verify;

    request.post(verifyURL, body)
        .then((data) => {
          if (data && data.success) {
            // Pass to the father
            that.props.afterLogin(data.data);
          } else {
            AlertIOS.alert('验证码失败3');
          }
        })
        .catch((err) => {
          AlertIOS.alert('验证码失败4');
        });
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.signupBox}>
            <Text style={styles.title}>login</Text>
            <TextInput
                style={styles.inputField}
                placeholder='输入手机号'
                autoCapitalize={'none'} // 是否开头大小
                autoCorrect={false} // 是否校验
                keyboardType={'number-pad'} // 数字键盘
                onChangeText={(text) => { // 改变文字后处理
                  this.setState({
                    phoneNumber: text
                  })
                }}
            />
            {
              this.state.codeSent
                  ?
                  <View style={styles.verifyCodeBox}>
                    <TextInput
                        placeholder='输入验证码'
                        autoCapitalize={'none'}
                        autoCorrect={false}
                        keyboardType={'number-pad'}
                        style={styles.inputField2}
                        onChangeText={(text) => {
                          this.setState({
                            verifyCode: text
                          })
                        }}
                    />
                    {
                      this.state.countingDone
                          ?
                          <Button
                              style={styles.countBtn}
                              onPress={this._sendVerifyCode.bind(this)}>
                            获取验证码
                          </Button>
                          :
                          <CountDown
                              onPress={this._countingDone.bind(this)} //default null
                              text={'剩秒数:'} //default ''
                              time={60} //default 60
                              buttonStyle={{padding: 10}}
                              textStyle={{color: '#ccc'}} //default black
                              disabledTextStyle={{color: '#fff'}} //default gray
                          />
                    }
                  </View>
                  : null
            }
            {
              this.state.codeSent
                  ?
                  <Button
                      style={styles.btn}
                      onPress={this._submit.bind(this)}
                  >
                    登录
                  </Button>
                  :
                  <Button
                      style={styles.btn}
                      onPress={this._sendVerifyCode.bind(this)}
                  >
                    获取验证码
                  </Button>
            }
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f9f9f9',
  },

  signupBox: {
    marginTop: 30
  },

  title: {
    marginBottom: 20,
    color: '#333',
    fontSize: 20,
    textAlign: 'center'
  },

  inputField: {
    // flex: 1,
    width: width,
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },

  inputField2: {
    // flex: 1,
    width: width - 110,
    height: 40,
    padding: 5,
    color: '#666',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
  },

  verifyCodeBox: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  countBtn: {
    height: 40,
    padding: 10,
    marginLeft: 8,
    color: '#fff',
    backgroundColor: '#ee735c',
    borderColor: '#ee735c',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: 15,
    borderRadius: 2
  },

  btn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#ee753c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee753c'
  }
});

