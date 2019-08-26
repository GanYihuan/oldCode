## 高德地图       

## TabBarIOS
- 1TabBarIOS,分层
- 2 组件化开发
- 3 react-native-vector-ions

## util.js
```
// utils工具类
// 获取屏幕宽带和高度
// 获取一像素宽的线
// fetch > ajax
Dimensions,
PixelRatio
get: function (url, successCallback, failCallback) {
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          successCallback(responseJson);
        })
        .catch((error) => {
          failCallback(error);
        });
}
```




>## twebview.js
WebView
传入一个地址显示出来



>## 传参数
Toilet.js
import TwebView from '../twebview/twebview';
{/*kill01:传递参数url*/}
<TwebView url="http://baidu.com"/>
twebview.js
// kill02:接受参数
constructor(props) {
    // kill03:接受参数
    super(props);
    // getInitialState()
    this.state = {
      // kill04:接受参数
      url: this.props.url,
    }
}  




