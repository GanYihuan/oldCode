# use react-native-vector-icons



## 1: Installation
- iTerm2 Run: npm install react-native-vector-icons --save
- iTerm2 Run: react-native link



## 2: Xcode配置
### iOS
- 将node_modules/react-native-vector-icons的Fonts文件拖到Xcode，对话框里要选择"Add to targets"，"Create groups"
![05-dragFonts.png](http://p0ia5hegr.bkt.clouddn.com/05-dragFonts.png)
- 将node_modules/react-native-vector-icons的RNVectorIcons.xcodeproj文件拖到Xcode项目的Libraries中，
 然后在Xcode的Build Phase/Link Binary 中添加libRNVectorIcons.a文件。
![01-vector-icons](http://p0ia5hegr.bkt.clouddn.com/01-vector-icons.png)



## 3: 准备图片
- 去[http://www.iconfont.cn/](http://www.iconfont.cn/plus) 找你自己需要的矢量图标下载下来, SVG下载
![10-iomoon.png](http://p0ia5hegr.bkt.clouddn.com/10-iconfont.png)
![11-iomoon.png](http://p0ia5hegr.bkt.clouddn.com/11-iconfont.png)
- 去[https://icomoon.io](https://icomoon.io)注册，然后将你下载的图标上传上去
![07-iomoon.png](http://p0ia5hegr.bkt.clouddn.com/07-iomoon.png)
![08-iomoon.png](http://p0ia5hegr.bkt.clouddn.com/08-iomoon.png)
![09-iomoon.png](http://p0ia5hegr.bkt.clouddn.com/09-iomoon.png)

- 编辑一下图标的Scale和Aligment，scale设置为fit to canvas, Alignment设置为Align to center.
 点击页面右下角的Generat Font将图标Download下来。



## 4: 配置xcode
- 将下载下来的Icomoon.ttf文件拖到Xcode中，然后在info.plist文件添加相应的键值对。
![02-vector-icons](http://p0ia5hegr.bkt.clouddn.com/02-vector-icons.png)
- node_modules/react-native-vector-icons下新建Icomoon.js文件，
![03-Icomoonjs](http://p0ia5hegr.bkt.clouddn.com/03-Icomoonjs.png)
- node_modules/react-native-vector-icons/glyphmaps下新建Icomoon.json文件。数字值查看Icomoon网页下载的selection.json文件
![04-Icomoonjson](http://p0ia5hegr.bkt.clouddn.com/04-Icomoonjson.png)
- 复制一份Icomoon.ttf到node_modules/react-native-vector-icons/Fonts目录下，



## 5: 使用icon
```jsx harmony
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} from 'react-native';
// 使用自定义的图标, 引入自己编写的Icomoon.js
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
```

  

## 6: 效果
![06-Finally](http://p0ia5hegr.bkt.clouddn.com/06-Finally.png)