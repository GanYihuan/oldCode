import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import ImageData from '../json/ImageData.json';


let {width} = Dimensions.get('window');


export default class dashen05ScrollView extends Component {
  // unchangeable data
  static defaultProps = {
    duration: 1000
  };

  constructor() {
    super();
    // changeable data
    this.state = {
      currentPage: 0
    };
    // this._jumpTo = this._jumpTo.bind(this);
  }

  render() {
    return (
        <View style={styles.container}>
          <ScrollView
              // scrollEnabled={false}  // can't scroll
              // 样式会应用到一个内层的内容器上，子视图会包裹在内容容器内。
              contentContainerStyle={styles.contentContainer}
              ref="scrollView"
              // true:子视图会在水平方向上排成一行,false:在垂直方向上排成一列。
              horizontal={true}
              // true:显示一个垂直方向的滚动条。
              showsHorizontalScrollIndicator={false}
              // true:滚动条会停在滚动视图的尺寸的整数倍位置。用在水平分页上。默认false。
              pagingEnabled={true}
              // 一帧滚动结束callback,(e)传递ScrollView
              onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
              onScrollBeginDrag={this.onScrollBeginDrag.bind(this)}
              onScrollEndDrag={this.onScrollEndDrag.bind(this)}
          >
            {this.renderAllImage()}
          </ScrollView>
          <View style={styles.pageViewStyle}>
            {this.renderPageCircle()}
          </View>
        </View>
    );
  }

  // 根据移动的距离来判断小圆点走到哪
  onAnimationEnd(e) {
    // 1.水平方向的偏移量,(e):ScrollView
    let offSetX = e.nativeEvent.contentOffset.x;
    // 2.当前的页数
    let currentPage = Math.floor(offSetX / width);
    this.setState({
      currentPage: currentPage
    });
  }

  onScrollBeginDrag() {
    this.componentWillUnmount();
  }

  onScrollEndDrag() {
    this.startTimer();
  }

  // 实现一些复杂的操作
  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    this.timer && clearInterval(this.timer);
  }

  // 开启定时器
  startTimer() {
    let scrollView = this.refs.scrollView;
    let imgCount = ImageData.data.length;

    // 2.添加定时器  this.timer -> 可以理解成一个隐式的全局变量
    this.timer = setInterval(() => {
      let activePage = 0;

      if ((this.state.currentPage + 1) >= imgCount) {
        activePage = 0;
      } else {
        activePage = this.state.currentPage + 1;
      }

      this.setState({
        currentPage: activePage
      });

      let offsetX = activePage * width;
      scrollView.scrollResponderScrollTo({x: offsetX, y: 0, animated: true});
    }, this.props.duration);
  }

  // 返回所有的图片
  renderAllImage() {
    let allImage = [];
    let imgsArr = ImageData.data;
    for (let i = 0; i < imgsArr.length; i++) {
      // 取出单独的每一个对象
      let imgItem = imgsArr[i];
      allImage.push(
          <Image
              style={{width: width, height: 120}}
              source={{uri: imgItem.img}}
              key={i}
          />
      );
    }
    // 返回数组
    return allImage;
  }

  renderPageCircle() {
    let indicatorArr = [];
    let style;
    let imgsArr = ImageData.data;
    for (let i = 0; i < imgsArr.length; i++) {
      style = (i === this.state.currentPage) ? styles.activeCirle : styles.circle;
      indicatorArr.push(
          <Text
              key={i}
              style={[{fontSize: 25}, style]}
              onPress={this._jumpTo.bind(this, i)}
          >
            &bull;
          </Text>
      );
    }
    // 返回
    return indicatorArr;
  }

  _jumpTo(index) {
    this.setState({
      currentPage: index - 1
    });
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 25
  },
  pageViewStyle: {
    // 设置主轴的方向
    flexDirection: 'row',
    // 设置侧轴方向的对齐方式
    alignItems: 'center',
    width: width,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.4)',
    // 定位
    position: 'absolute',
    bottom: 0
  },
  activeCirle: {
    color: '#f00'
  },
  circle: {
    color: '#fff'
  },
  contentContainer: {
    paddingVertical: 25
  }
});


