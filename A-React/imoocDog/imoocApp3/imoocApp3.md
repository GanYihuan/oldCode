# 注册登录界面
```
<TextInput
  placeholder='输入手机号'
  autoCapitalize={'none'}
  autoCorrect={false}
  keyboardType={'number-pad'}
  style={styles.inputField}
  onChangeText={(text) => {
    this.setState({
      phoneNumber: text
    })
  }}。
/>
```



# CountDown
```
import CountDown from 'react-native-countdown';
<CountDown
    onPress={this._countingDone.bind(this)} //default null
    text={'剩余秒数:'} // default ''
    time={5} // default 60
    buttonStyle={{padding: 10}}
    textStyle={{color: '#ccc'}} // default black
    disabledTextStyle={{color: '#fff'}} // default gray
/>
```



# Pass to the top (Login.js)
```
request.post(verifyURL, body)
  .then((data) => {
  if (data && data.success) {
    // Pass to father(index.ios.js)
    that.props.afterLogin(data.data);
  } 
```



# father receive data from the children (index.js)
```
if (!this.state.logined) {
  // Receive data from the lower level
  return <Login afterLogin={this._afterLogin.bind(this)}/>
}
```



# Determine whether you have logged in
```
componentDidMount() {
  this._asyncAppStatus();
}
_asyncAppStatus() {
    var that = this;
    AsyncStorage.getItem('user')
      .then((data) => {
        var user;
        var newState = {};
        if (data) {
          // data transform object
          user = JSON.parse(data);
        }
        if (user && user.accessToken) {
          newState.user = user;
          newState.logined = true;
        } else {
          newState.logined = false;
        }
        that.setState(newState);
      });
}
_afterLogin(user) {
  var that = this;
  // object transfer string
  user = JSON.stringify(user);
  // can pass string
  AsyncStorage.setItem('user', user)
    .then(() => {
      that.setState({
        logined: true,
        user: user
      })
    })
}
_logout() {
  AsyncStorage.removeItem('user');
  this.setState({
    user: null,
    logined: false
  })
}
```

