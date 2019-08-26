import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    TouchableOpacity,
    Image,
    ListView,
    TextInput,
    Modal,
    AlertIOS
} from 'react-native';
import Video from 'react-native-video';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/Ionicons';
import config from '../common/config';
import request from '../common/request';

var {width} = Dimensions.get("window");
var cachedResults = {
  nextPage: 1,
  items: [],
  total: 0
};

export default class Detail extends Component {
  constructor(props) {
    super(props);
    var data = this.props.data;
    this.state = {
      data: data,
      //评论
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      }).cloneWithRows([]),
      //video player
      rate: 1,
      muted: false,
      resizeMode: 'contain',
      repeat: false,
      //video control
      videoOk: true,
      videoLoaded: false,
      playing: false,
      paused: false,
      videoProgress: 0.01,
      videoTotal: 0,
      currentTime: 0,
      // modal
      content: '',
      animationType: 'none',
      modalVisible: false,
      isSending: false
    }
  }

  _pop() {
    this.props.navigator.pop();
  }

  _onLoadStart() {
  }

  _onLoad() {
  }

  // 进度条的控制
  _onProgress(data) {
    if (!this.state.videoLoaded) {
      this.setState({
        videoLoaded: true
      })
    }
    // total time
    var duration = data.playableDuration;
    var currentTime = data.currentTime;
    var percent = Number((currentTime / duration).toFixed(2));
    var newState = {
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent
    };

    if (!this.state.videoLoaded) {
      newState.videoLoaded = true
    }

    if (!this.state.playing) {
      newState.playing = true
    }

    this.setState(newState);
  }

  _onEnd() {
    this.setState({
      videoProgress: 1,
      playing: false
    });
  }

  _onError(e) {
    this.setState({
      videoOk: false
    });
  }

  _rePlay() {
    this.refs.videoPlayer.seek(0)
  }

  _pause() {
    if (!this.state.paused) {
      this.setState({
        paused: true
      })
    }
  }

  _resume() {
    if (this.state.paused) {
      this.setState({
        paused: false
      })
    }
  }

  componentDidMount() {
    this._fetchData();
  }

  _fetchData(page) {
    var that = this;

    this.setState({
      isLoadingTail: true
    });

    request.get(config.api.base + config.api.comment, {
          accessToken: 'abc',
          page: page,
          creation: 124
        })
        .then((data) => {
          if (data.success) {
            var items = cachedResults.items.slice();

            items = items.concat(data.data);
            cachedResults.nextPage += 1;
            cachedResults.items = items;
            cachedResults.total = data.total;

            that.setState({
              isLoadingTail: false,
              dataSource: that.state.dataSource.cloneWithRows(
                  cachedResults.items
              )
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoadingTail: false
          });
          console.warn(error);
        });
  }

  _hasMore() {
    return cachedResults.items.length !== cachedResults.items.total;
  }

  _fetchMoreData() {
    if (!this._hasMore() || this.state.isLoadingTail) {
      return
    }

    var page = cachedResults.nextPage;

    this._fetchData(page)
  }

  _renderFooter() {
    if (!this._hasMore() && cachedResults.items.total !== 0) {
      return (
          <View style={styles.loadingMore}>
            <Text style={styles.loadingText}>没有更多</Text>
          </View>
      )
    }

    if (!this.state.isLoadingTail) {
      return <View style={styles.loadingMore}/>
    }

    return <ActivityIndicator
        style={styles.loadingMore}
    />
  }

  _renderHeader() {
    var data = this.state.data;

    return (
        <View style={styles.listHeader}>
          {/* 头部内容 */}
          <View style={styles.infoBox}>
            <Image
                style={styles.avatar}
                source={{uri: data.author.avatar}}
            />
            <View style={styles.descBox}>
              <Text style={styles.nickname}>{data.author.nickname}</Text>
              <Text style={styles.title}>{data.title}</Text>
            </View>
          </View>
          {/* 评论部分 */}
          <View style={styles.commentBox}>
            <View style={styles.comment}>
              <TextInput
                  style={styles.content}
                  placeholder="love that cat"
                  multiline={true}
                  onFocus={this._focus.bind(this)}
              />
            </View>
          </View>
          <View style={styles.commentArea}>
            <Text style={styles.commentTitle}>nice comment</Text>
          </View>
        </View>
    )
  }

  _renderRow(row) {
    return (
        <View
            style={styles.replyBox}
            key={row._id}
        >
          <Image
              style={styles.replyAvator}
              source={{uri: row.replyBy.avatar}}
          />
          <View style={styles.reply}>
            <Text style={styles.replyNickname}>{row.replyBy.nickname}</Text>
            <Text style={styles.replyContent}>{row.content}</Text>
          </View>
        </View>
    )
  }

  _focus() {
    this._setModalVisible(true);
  }

  _closeModal() {
    this._setModalVisible(false);
  }

  _setModalVisible(isVisible) {
    this.setState({
      modalVisible: isVisible
    })
  }

  _submit() {
    var that = this;

    if (!this.state.content) {
      return AlertIOS.alert('can not null');
    }

    if (this.state.isSending) {
      return AlertIOS.alert('commenting');
    }

    this.setState({
      isSending: true
    }, function () {
      var body = {
        accessToken: 'abc',
        creation: '123',  // 评论视频
        content: this.state.content // 评论内容
      };
      var url = config.api.base + config.api.comment;

      request.post(url, body)
          .then(function (data) {
            if (data && data.success) {
              var items = cachedResults.items.slice();

              items = [{
                content: that.state.content,
                replyBy: {
                  avatar: 'http://dummyimage.com/640X640/7c1d80)',
                  nickname: 'cat say'
                }
              }].concat(items);

              cachedResults.items = items;
              cachedResults.total = cachedResults.total + 1;

              that.setState({
                isSending: false,
                dataSource: that.state.dataSource.cloneWithRows(
                    cachedResults.items
                )
              });
              that._setModalVisible(false);
            }
          })
          .catch((err) => {
            that.setState({
              isSending: false
            });
            that._setModalVisible(false);
            AlertIOS.alert('leave message error');
          });
    });
  }

  render() {
    var data = this.props.data;
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
                style={styles.backBox}
                onPress={this._pop.bind(this)}
            >
              <Icon style={styles.backIcon} name='ios-arrow-back'/>
              <Text style={styles.backText}>back</Text>
            </TouchableOpacity>
            <Text
                style={styles.headerTitle}
                numberOfLines={1} // line only 1
            >
              Video detail page
            </Text>
          </View>
          <View style={styles.videoBox}>
            <Video
                // https://github.com/react-native-community/react-native-video
                // quote
                ref="videoPlayer"
                // address
                source={{uri: data.video}}
                style={styles.video}
                // Sound magnification
                volume={5}  // 0 is muted, 1 is normal.
                paused={this.state.paused}  // Pauses playback entirely.
                // Pause and normal
                rate={this.state.rate}  // 0 is paused, 1 is normal.
                muted={this.state.muted}  // Mutes the audio entirely.
                // Video stretching mode
                resizeMode={this.state.resizeMode}  // Fill the whole screen at aspect ratio.*
                // Play again
                repeat={this.state.repeat}  // Repeat forever.
                onLoadStart={this._onLoadStart.bind(this)} // Callback when video starts to load
                onLoad={this._onLoad.bind(this)} // Callback when video loads
                // Video playback 250ms call
                onProgress={this._onProgress.bind(this)} // Callback every ~250ms with currentTime
                onEnd={this._onEnd.bind(this)} // Callback when playback finishes
                onError={this._onError.bind(this)} // Callback when video cannot be loaded
            />

            {/* Error message */}
            {
              !this.state.videoOk && <Text style={styles.failText}>Video wrong!</Text>
            }

            {/* Chrysanthemum appears when no loading */}
            {
              !this.state.videoLoaded && <ActivityIndicator style={styles.loading} color="#ee735c"/>
            }

            {/* When the player is loaded and played */}
            {
              this.state.videoLoaded && !this.state.playing
                  ?
                  <Icon
                      style={styles.playIcon}
                      onPress={this._rePlay.bind(this)}
                      name='ios-play'
                      size={48}
                  />
                  : null
            }

            {/* Already loaded and playing */}
            {/* TouchableOpacity not null */}
            {
              this.state.videoLoaded && this.state.playing
                  ?
                  <TouchableOpacity
                      style={styles.pauseBtn}
                      onPress={this._pause.bind(this)}
                  >
                    {
                      this.state.paused
                          ?
                          <Icon
                              style={styles.resumeIcon}
                              size={48}
                              onPress={this._resume.bind(this)}
                              name="ios-play"
                          />
                          :
                          <Text></Text>
                    }
                  </TouchableOpacity>
                  : null
            }

            {/* scrollbar */}
            <View style={styles.progressBox}>
              <View style={[styles.progressBar, {width: width * this.state.videoProgress}]}></View>
            </View>
          </View>
          <ListView
              dataSource={this.state.dataSource}  // 列表依赖的数据源
              renderRow={this._renderRow.bind(this)} // copy 从数据源(Data source)接受一条数据,它所在section的ID,返回一个可渲染的组件
              renderHeader={this._renderHeader.bind(this)} // copy 页头会在每次渲染过程中都重新渲染
              renderFooter={this._renderFooter.bind(this)} // copy 页脚会在每次渲染过程中都重新渲染
              onEndReached={this._fetchMoreData.bind(this)} // copy 当所有的数据都已经渲染过，
              onEndReachedThreshold={20}  // 滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。单位是像素。
              enableEmptySections={true}  // 渲染空的区块
              showsVerticalScrollIndicator={false}  // 是否展示垂直的滚动条
              automaticallyAdjustContentInsets={false}  // 控制是否调整内容（消除小空白）
          />
          <Modal
              animationType={'fade'}  //  controls how the modal animates.
              visible={this.state.modalVisible}
              onRequestClose={() => { // passing a function that will be called once the modal has been dismissed.
                this._setModalVisible(false)
              }}>
            <View style={styles.modalContainer}>
              <Icon
                  style={styles.closeIcon}
                  onPress={this._closeModal.bind(this)}
                  name="ios-close-outline"
              />
              <View style={styles.commentBox}>
                <View style={styles.comment}>
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
                </View>
              </View>
              <Button
                  style={styles.submitBtn}
                  onPress={this._submit.bind(this)}>
                comment
              </Button>
            </View>
          </Modal>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },

  modalContainer: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#fff'
  },

  closeIcon: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#ee753c'
  },

  submitBtn: {
    width: width - 20,
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ee735c',
    borderRadius: 4,
    fontSize: 18,
    color: '#ee735c'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: 64,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff'
  },

  backBox: {
    position: 'absolute',
    left: 12,
    top: 32,
    width: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },

  headerTitle: {
    width: width - 120,
    textAlign: 'center'
  },

  backIcon: {
    color: '#999',
    fontSize: 20,
    marginRight: 5
  },

  backText: {
    color: '#999'
  },

  videoBox: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },

  video: {
    width: width,
    height: width * 0.56,
    backgroundColor: '#000'
  },

  loading: {
    position: 'absolute',
    left: 0,
    top: 80,
    width: width,
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },

  failText: {
    position: 'absolute',
    left: 0,
    top: 90,
    width: width,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'transparent'
  },

  progressBox: {
    width: width,
    height: 2,
    backgroundColor: '#ccc'
  },

  progressBar: {
    width: 1,
    height: 2,
    backgroundColor: '#ff6600'
  },

  playIcon: {
    position: 'absolute',
    top: 90,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },

  pauseBtn: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: width * 0.56
  },

  resumeIcon: {
    position: 'absolute',
    top: 80,
    left: width / 2 - 30,
    width: 60,
    height: 60,
    paddingTop: 8,
    paddingLeft: 22,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 30,
    color: '#ed7b66'
  },

  infoBox: {
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 30
  },

  descBox: {
    flex: 1
  },

  nickname: {
    fontSize: 18
  },

  title: {
    marginTop: 8,
    fontSize: 16,
    color: '#666'
  },

  replyBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10
  },

  replyAvator: {
    width: 40,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20
  },

  replyNickname: {
    color: '#666'
  },

  replyContent: {
    marginTop: 4,
    color: '#666'
  },

  reply: {
    flex: 1
  },

  loadingMore: {
    marginVertical: 20
  },

  loadingText: {
    color: '#777',
    textAlign: 'center'
  },

  listHeader: {
    width: width,
    marginTop: 10
  },

  commentBox: {
    marginTop: 0,
    marginBottom: 10,
    padding: 8,
    width: width
  },

  commentArea: {
    width: width,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  commentTitle: {},

  content: {
    paddingLeft: 2,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    fontSize: 14,
    height: 80
  }
});
