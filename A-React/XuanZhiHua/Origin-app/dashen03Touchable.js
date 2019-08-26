import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


export default class dashen03Touchable extends Component {
  // unchange datas
  static defaultProps = {
    sex: 'man'
  };

  constructor() {
    super();
    // changeable data
    this.state = {
      title: '不透明触摸',
      person: '张三'
    }
  }

  render() {
    return (
        <View
            style={styles.container}
            ref="topView"
        >
          <TouchableOpacity
              // when click change opacity
              activeOpacity={0.5}
              onPress={() => this.activeEvent('点击')}
              onPressIn={() => this.activeEvent('按下')}
              onPressOut={() => this.activeEvent('抬起')}
              onLongPress={() => this.activeEvent('长按')}
          >
            <View style={styles.innerViewStyle}>
              <Text ref="textNor">常用的事件</Text>
            </View>
          </TouchableOpacity>
          <View>
            <Text>{this.state.title}</Text>
            <Text>{this.state.person}</Text>
            <Text>{this.props.sex}</Text>
          </View>
        </View>
    );
  }

  activeEvent(event) {
    this.setState({
      title: event,
      person: '李四'
    });
    // 拿到View  获取DOM节点
    this.refs.topView;
    this.refs.textNor;
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  innerViewStyle: {
    backgroundColor: '#f00',
  },
});


