# 改变模拟器大小
- Commond + (1,2,3,4)
- Commond + d : open命令行

---

# 使用Icon组件 
- [react-native : TabBarIOS](http://reactnative.cn/docs/0.46/tabbarios.html#content)
- [配置图标](http://www.cnblogs.com/moxiaoyan33/p/5482024.html)
- [图标官网](http://www.ionicons.com)

```
import Icon from 'react-native-vector-icons/Ionicons';
<Icon.TabBarItem
  iconName="ios-videocam-outline"     // Ordinary state  
  selectedIconName="ios-videocam"     // Select icon change
  selected={this.state.selectedTab === 'list'} // 
  onPress={() => {
    this.setState({
      selectedTab: 'list',
    });
  }}>
</Icon.TabBarItem>
```



# ListView from react-native
- [react-native : ListView](http://reactnative.cn/docs/0.46/listview.html#content)

```
constructor() {
  super();
  this.state = {
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    }).cloneWithRows([])
  }
}
render() {
  return (
      <View style={styles.container}>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderRow}
            // warning :in next release empty section ...
            enableEmptySections={true}
            // 自动调节内容内偏移，navigation bar或者tab bar或者toolbar不挡住Scrollview中的内容。默认是true
            automaticallyAdjustContentInsets={false}
        />
      </View>
  )
}
```



# mockjs: chrome 
```
var data = Mock.mock({"data|10":[{"video":"blob:http:\/\/www.imooc.com\/5aa3c7ce-253e-4d01-977c-16b77b83184c","id":"@ID","thumb":"@IMG(1200X600,@color())"}],"success":true});data.data.forEach(function(item){$('example').append('<h3>' + item._id + '</h3><img src="' + item.thumb + '"/>')})
```



# resizeMode
>我们一般将Image定义的宽和高乘以当前运行环境的像素密度称为Image的实际宽高.当Image的实际宽、高与图片的实际宽、高不符时,视图片样式定义中resizeMode的取值不同而分为三种情况, 三个取值分别是: contain, cover和stretch.默认值是cover.
cover模式只求在显示比例不失真的情况下填充整个显示区域。可以对图片进行放大或者缩小，超出显示区域的部分不显示， 也就是说，图片可能部分会显示不了。
contain模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。 如果图片宽高都小于控件宽高，则不会对图片进行放大。
stretch模式不考虑保持图片原来的宽,高比.填充整个Image定义的显示区域,这种模式显示的图片可能会畸形和失真。
center模式, 9月11号的0.33版本才支持，contain模式基础上支持等比放大。



# 异步请求 (creation index.js)
```
  //异步请求时机
  componentDidMount: function () {
    this._fechData();
  },
  _fetchData() {
    request.get(config.api.base + config.api.creations, {
      accessToken: 'abc'
    }).then((data) => {
      if (data.success) {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data.data)
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  },
```



# 异步封装 request.js



# 箭头函数
var a = [1,2];
var b = a.map(function(item) {
  return item + 1
})
---
var b = a.amp((item) => {item + 1})


