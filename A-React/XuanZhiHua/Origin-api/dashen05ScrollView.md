#
## ScrollView
```
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
```



## 根据移动的距离来判断小圆点走到哪
```
  onAnimationEnd(e) {
    // 1.水平方向的偏移量,(e):ScrollView
    let offSetX = e.nativeEvent.contentOffset.x;
    // 2.当前的页数
    let currentPage = Math.floor(offSetX / width);
    this.setState({
      currentPage: currentPage
    });
  }
```



## 让scrollView滚动起来
```
let scrollView = this.refs.scrollView;
scrollView.scrollResponderScrollTo({x: offsetX, y: 0, animated: true});
```



## 实现一些复杂的操作
```
  componentDidMount() {
    this.startTimer();
  }
```



## 清timer
```
componentWillUnmount() {
    // 如果存在this.timer，则使用clearTimeout清空。
    this.timer && clearInterval(this.timer);
  }
```
