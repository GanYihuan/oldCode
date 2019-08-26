#
## 不可改变的值
// 不可改变的值 es5
getDefaultProps(){
  age: 18
}
// 不可改变的值 es6
static defaultProps = {
  age: 18
};



## 可以改变的值
```
// 可以改变的值 es5
getInitialState(){
  return {
   title: '不透明触摸',
    person: '张三'
  }
}
// 可以改变的值 es6
  constructor() {
    super();
    this.state = {
      title: '',
      person: ''
    }
  }
```



## TouchableOpacity
```
<TouchableOpacity
  activeOpacity={0.5} // when click change opacity
  onPress={() => this.activeEvent('点击')}
  onPressIn={() => this.activeEvent('按下')}
  onPressOut={() => this.activeEvent('抬起')}
  onLongPress={() => this.activeEvent('长按')}
>
</TouchableOpacity>
```



## 改变状态 getInitialState()
```
this.setState({
  title: event,
  person: '李四'
});
```



## 设置ref,拿到View,获取DOM节点
```
<View ref="topView"></View>
this.refs.topView;
```