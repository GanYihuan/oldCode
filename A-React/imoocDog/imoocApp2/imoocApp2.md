# Navigator copy!
> index.ios.js
```
  <Navigator
    initialRoute={{
      name: 'list',
      // 组件上面的声明
      component: List
    }}
    // 配置场景动画和手势
    configureScene={(route) => {
      return Navigator.SceneConfigs.FloatFromRight
    }}
    renderScene={(route, navigator) => {
      var Component = route.component;
      return <Component {...route.params} navigator={navigator}/>
    }}
  />
```

> jumb to detail page
```
  _loadPage(row) {
      // 压站进入detail
      this.props.navigator.push({
        name: 'detail',
        component: Detail,
        // data transfer
        params: {
          row: row
        }
      })
  }
```

> return to main.index
```
  _pop() {
    // 取消压站内容
    this.props.navigator.pop();
  }
```



# ListView
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
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        // remove Warning
        enableEmptySections={true}  
        // hide listview scrollbar
        automaticallyAdjustContentInsets={false}  
        // hide vertical scrollbar
        showsVerticalScrollIndicator={false}  
        // when touch the bottom then callback
        onEndReached={this._fetchMoreData.bind(this)} 
        // more higher 20 then bottom
        onEndReachedThreshold={20}  
        // when touch the foot then callback
        renderFooter={this._renderFooter.bind(this)}  
        // refresh
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff6600"
            title="拼命加载中"
          />
        }
      />
    )
  }
```



# ActivityIndicator Chrysanthemum icon
```
  import {
      ActivityIndicator
  } from 'react-native';
  ...
  return <ActivityIndicator/>
```



# refresh
```
<RefreshControl
    refreshing={this.state.isRefreshing}
    onRefresh={this._onRefresh.bind(this)}
    tintColor="#ff6600"
    title="Loading..."
/>
```


#视频
[视频](https://github.com/react-native-community/react-native-video)
```
  <Video
    ref="videoPlayer"
    source={{uri: data.video}}
    style={styles.video}
    volume={5}  // Sound: 0 is muted, 1 is normal.
    paused={this.state.paused}  // Pauses playback entirely.
    rate={this.state.rate}  // 0 is paused, 1 is normal.
    muted={this.state.muted}  // Mutes the audio entirely.
    resizeMode={this.state.resizeMode}  // Fill the whole screen at aspect ratio.*
    repeat={this.state.repeat}  // Repeat forever.
    onLoadStart={this._onLoadStart.bind(this)} // Callback when video starts to load
    onLoad={this._onLoad.bind(this)} // Callback when video loads
    onProgress={this._onProgress.bind(this)} // Callback every ~250ms with currentTime
    onEnd={this._onEnd.bind(this)} // Callback when playback finishes
    onError={this._onError.bind(this)} // Callback when video cannot be loaded
  />
```



#进度条



#重新开始播放



#生成视频评论
```
<ListView
  dataSource={this.state.dataSource}  // 列表依赖的数据源
  renderRow={this._renderRow} // 从数据源(Data source)中接受一条数据，以及它和它所在section的ID,返回一个可渲染的组件来为这行数据进行渲染
  renderHeader={this._renderHeader} // 页头会在每次渲染过程中都重新渲染
  renderFooter={this._renderFooter} // 页脚会在每次渲染过程中都重新渲染
  onEndReached={this._fechMoreData} // 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。
  onEndReachedThreshold={20}  // 调用onEndReached之前的临界值，单位是像素。
  enableEmptySections={true}  // 渲染空的区块
  showsVerticalScrollIndicator={false}  // 是否展示垂直的滚动条
  automaticallyAdjustContentInsets={false}  // 控制是否调整内容（消除小空白）
/>
```




#Modal
```
<Modal
  animationType={'fade'}  //  controls how the modal animates.
  visible={this.state.modalVisible}
  onRequestClose={() => { // passing a function that will be called once the modal has been dismissed.
    this._setModalVisible(false)
  }}>
</Modal>
<TextInput
  style={styles.content}
  placeholder="comment me"
  multiline={true}
  defaultValue={this.state.content}
  onChangeText={(text) => {
    this.setState({
      content: text
    });
  }}
/>
```



 