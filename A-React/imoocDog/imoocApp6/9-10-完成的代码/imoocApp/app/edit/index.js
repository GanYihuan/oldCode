import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    AsyncStorage,
    AlertIOS
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import CountDown from 'react-native-countdown';
import request from '../common/request';
import config from '../common/config';

var {width} = Dimensions.get("window");
var {height} = Dimensions.get("window");
var videoOptions = {
  title: '选择视频',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '录制10s视频',
  chooseFromLibraryButtonTitle: '选择已有的视频',
  videoQuality: 'medium',
  mediaType: 'video',
  durationLimit: 10,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

export default class Edit extends Component {
  constructor(props) {
    super(props);
    var user = this.props.user || {};
    this.state = {
      user: user,
      previewVideo: null,

      // video upload
      video: null,
      videoUploaded: false,
      videoUploading: false,
      videoUploadPregress: 0.14,

      // video control
      videoTotal: 0,
      videoProgress: 0.01,
      currentTime: 0,

      // count down
      counting: false,
      recording: false,

      // video player
      rate: 1,
      muted: true,
      resizeMode: 'contain',
      repeat: false,
      videoUploadedProgress: 0.1
    }
  }

  componentDidMount() {
    var that = this;
    AsyncStorage.getItem('user')
        .then((data) => {
          var user;
          if (data) {
            user = JSON.parse(data);
          }
          if (user && user.accessToken) {
            that.setState({
              user: user
            })
          }
        });
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>
              {this.state.previewVideo ? '点击按钮配音' : '理解狗狗从配音开始'}
            </Text>
            {
              this.state.previewVideo && this.state.videoUploaded
                  ?
                  <Text style={styles.toolbarExtra}
                        onPress={this._pickVideo}
                  >

                    更换视频
                  </Text>
                  :
                  null
            }
          </View>
          <View style={styles.page}>
            {
              this.state.previewVideo
                  ?
                  <View style={styles.videoContainer}>
                    <View style={styles.videoBox}>
                      <Video
                          ref="videoPlayer"
                          source={{uri: this.state.previewVideo}}
                          style={styles.video}
                          volume={5}  // 0 is muted, 1 is normal.
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
                      {
                        !this.state.videoLoaded && this.state.videoUploading
                            ?
                            <View style={styles.progressTipBox}>
                              <progressTipBox
                                  style={styles.progressBar}
                                  progressTintColor="#ee735c"
                                  progress={this.state.videoUploadedProgress}
                              />
                              <Text style={styles.progressTip}>
                                正在生成静音视频,已完成{(this.state.videoUploadedProgress * 100).toFixed(2)}%
                              </Text>
                            </View>
                            :
                            null
                      }

                      {
                        this.state.recording
                            ?
                            <View style={styles.progressTipBox}>
                              <progressTipBox
                                  style={styles.progressBar}
                                  progressTintColor="#ee735c"
                                  progress={this.state.videoProgress}
                              />
                              <Text style={styles.progressTip}>
                                正在录制声音中
                              </Text>
                            </View>
                            :
                            null
                      }
                    </View>
                  </View>
                  :
                  <TouchableOpacity style={styles.uploadContainer} onPress={this._pickVideo}>
                    <View style={styles.uploadBox}>
                      <Image
                          source={require('../assets/images/record.png')}
                          style={styles.uploadIcon}
                      />
                      <Text style={styles.uploadTitle}>点我上传视频</Text>
                      <Text style={styles.uploadDesc}>建议时长不超过20s</Text>
                    </View>
                  </TouchableOpacity>
            }
            {
              this.state.videoUploaded
                  ?
                  <View style={styles.recordBox}>
                    <View style={[styles.recordIconBox, this.state.recording && styles.recordOn]}>
                      {
                        this.state.counting && this.state.recording
                            ?
                            <CountDown
                                onPress={this._record.bind(this)} //default null
                                text={'剩秒数:'} //default ''
                                time={60} //default 60
                                buttonStyle={{padding: 10}}
                                textStyle={{color: '#ccc'}} //default black
                                disabledTextStyle={{color: '#fff'}} //default gray
                            />
                            :
                            <TouchableOpacity onPress={this._counting.bind(this)}>
                              <Icon name="ios-mic" style={styles.recordIcon}></Icon>
                            </TouchableOpacity>
                      }
                    </View>
                  </View>
                  :
                  null
            }
          </View>
        </View>
    )
  }

  _record() {
    this.setState({
      videoProgress: 0,
      counting: false,
      recoring: true
    })
    this.refs.videoPlay.seek(0);  // 重新开始
  }

  _counting() {
    if (!this.state.counting && !this.state.recording) {
      this.setState({
        counting: true
      })
      this.refs.videoPlay.seek(this.state.videoTotal - 0.01);  // 重新开始
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
    // total time
    var duration = data.playableDuration;
    var currentTime = data.currentTime;
    var percent = Number((currentTime / duration).toFixed(2));

    this.setState({
      videoTotal: duration,
      currentTime: Number(data.currentTime.toFixed(2)),
      videoProgress: percent
    });
  }

  _onEnd() {
    if (this.state.recoring) {
      this.setState({
        videoProgress: 1,
        recoring: false
      });
    }
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

  _upload(body) {
    var that = this;
    var xhr = new XMLHttpRequest(); // 异步
    var url = config.qiniu.upload;

    this.setState({
      videoUploadedProgress: 0,
      videoUploading: true,  // 正在上传
      videoUploaed: false
    });

    xhr.open('POST', url);  // 调用实例open方法
    xhr.onload = () => {
      if (xhr.status !== 200) {
        AlertIOS.alert('请求失败1');
        return;
      }
      if (!xhr.responseText) {
        AlertIOS.alert('请求失败2');
        return;
      }
      var response; // string
      try {
        // string转成json对象
        response = JSON.parse(xhr.response);
      } catch (e) {
        console.log(e);
      }

      if (response) {
        var user = this.state.user;

        if (response.public_id) {
          user.avatar = response.public_id;
        }

        if (response.key) {
          user.avatar = response.key;
        }

        that.setState({
          video: response,
          videoUploading: false,  // 正在上传
          videoUploaed: true
        })

        var videoURL = config.aip.base + config.api.video;
        var accessToken = this.state.user.accessToken;

        request.post(videoURL, {
          accessToken: accessToken,
          video: response
        }).catch((e) => {
          console.log(e);
          AlertIOS.alert('视频出错,请重新上传');
        }).then((data) => {
          if (!data || !data.success) {
            AlertIOS.alert('视频出错,请重新上传');
          }
        })
      }
    }

    // 圆形进度条
    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) { // 可计算长度
          var percent = Number((event.loaded / event.total).toFixed(2));
          that.setState({
            videoUploadedProgress: percent
          });
        }
      }
    }

    xhr.send(body);
  }

  _getQiniuToken() {
    var accessToken = this.state.user.accessToken;  // 用户标示
    var signatureURL = config.api.base + config.api.signature;  // 获取签名的地址

    return request.post(signatureURL, {
      accessToken: accessToken,
      cloud: 'avatar',
      type: 'video'
    }).catch((err) => {
      console.log(err);
    })
  }

  _pickVideo() {
    var that = this;

    ImagePicker.showImagePicker(videoOptions, (res) => {
      if (res.didCancel) {
        return;
      }

      var uri = res.uri;

      that.setState = ({
        previewVideo: uri
      })

      that._getQiniuToken()
          .then((data) => {
            if (data && data.success) {
              var token = data.data.token;
              var key = data.data.key;
              var body = new FormData(); // 构建新表单

              body.append('token', token);
              body.append('key', key);
              body.append('file', {
                type: 'video/mp4',
                uri: uri,
                name: key
              });

              that._upload(body);
            }
          })

    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },

  toolbar: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 12,
    backgroundColor: '#ee735c'
  },

  toolbarTitle: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600'
  },

  toolbarExtra: {
    position: 'absolute',
    right: 10,
    top: 26,
    color: '#fff',
    textAlign: 'right',
    fontWeight: '600',
    fontSize: 14
  },

  page: {
    flex: 1,
    alignItems: 'center'
  },

  uploadContainer: {
    marginTop: 90,
    width: width - 40,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: '#ee735c',
    justifyContent: 'center',
    borderRadius: 6,
    backgroundColor: '#fff'
  },

  uploadTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
    color: '#000'
  },

  uploadDesc: {
    color: '#999',
    textAlign: 'center',
    fontSize: 12
  },

  uploadIcon: {
    width: 120,
    resizeMode: 'contain'
  },

  uploadBox: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  videoContainer: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },

  videoBox: {
    width: width,
    height: height * 0.6
  },

  video: {
    width: width,
    height: height * 0.6,
    backgroundColor: '#333'
  },

  progressTipBox: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: width,
    height: 30,
    backgroundColor: 'rgba(244, 244, 244, 0.65)'
  },

  progressTip: {
    color: '#333',
    width: width - 10,
    padding: 5
  },

  progressBar: {
    width: width
  },

  recordBox: {
    width: width,
    height: 60,
    alignItems: 'center'
  },

  recordIconBox: {
    width: 68,
    height: 68,
    marginTop: -30,
    borderRadius: 34,
    backgroundColor: '#ee735c',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  recordIcon: {
    fontSize: 58,
    backgroundColor: 'transparent',
    color: '#fff'
  },

  countBtn: {
    fontSize: 32,
    fontWeight: '600',
    color: '#fff'
  },

  recordOn: {
    backgroundColor: '#ccc'
  }
});

