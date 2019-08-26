import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableOpacity,
    Dimensions,
    Image,
    AlertIOS,
    Modal,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
import sha1 from 'sha1';  // 加密算法
import * as Progress from 'react-native-progress';
import Button from 'react-native-button';
import request from '../common/request';
import config from '../common/config';

var width = Dimensions.get('window').width;
// react-native-image-picker
var photoOptions = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
var CLOUDINARY = {
  'cloud_name': 'digvexgsl',
  'api_key': '675977649267356',
  //'api_secret': 'PiE1GK4qItX4l_YSoUWeAjyKBMo', 9-08 5:06
  'base': 'http://res.cloudinary.com/digvexgsll',
  'image': 'https://api.cloudinary.com/v1_1/digvexgsl/image/upload',
  'video': 'https://api.cloudinary.com/v1_1/digvexgsl/video/upload',
  'audio': 'https://api.cloudinary.com/v1_1/digvexgsl/raw/upload'
}

// 生成地址地址,主要因为请求方式不同
function avatar(id, type) {
  if(id.indexOf('http') > -1) {
    return id;
  }

  if(id.indexOf('data:image') > -1) {
    return id;
  }

  return CLOUDINARY.base + '/' + type + '/upload/' + id;
}

export default class Acount extends Component {
  constructor(props) {
    super(props);
    var user = this.props.user || {};

    this.state = {
      user: user,
      avatarProgress: 0,
      avatarUploading: false,
      modalVisible: false
    }
  }

  componentDidMount() {
    var that = this;

    AsyncStorage.getItem('user')
        .then((data) => {
          var user;

          if (data) {
            // parse: string -> obj
            user = JSON.parse(data);
          }

          if (user && user.accessToken) {
            that.setState({
              user: user
            });
          }
        });
  }

  render() {
    var user = this.state.user;
    return (
        <View style={styles.container}>
          <View style={styles.toolbar}>
            <Text style={styles.toolbarTitle}>My Acount</Text>
            <Text
                style={styles.toolbarExtra}
                onPress={this._edit.bind(this)}
            >
              Edit
            </Text>
          </View>
          {
            user.avatar
                ?
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={this._pickPhoto.bind(this)}
                >
                  <Image
                      style={styles.avatarContainer}
                      source={{uri: avatar(user.avatar, 'image')}}
                  >
                    <View style={styles.avatarBox}>
                      {
                        this.state.avatarUploading
                            ?
                            <Progress.Circle
                                size={75}
                                showsText={true}
                                color={'#ee735c'}
                                progress={this.state.avatarProgress}
                            />
                            :
                            <Image
                                style={styles.avatar}
                                source={{uri: avatar(user.avatar, 'image')}}
                            />
                      }
                    </View>
                    <Text style={styles.avatarTip}>click here to change the avatar!</Text>
                  </Image>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={this._pickPhoto.bind(this)}
                >
                  <Text style={styles.avatarTip}>Add dog avatar</Text>
                  <View style={styles.avatarBox}>
                    {
                      this.state.avatarUploading
                          ?
                          <Progress.Circle
                              size={75}
                              showsText={true}
                              color={'#ee735c'}
                              progress={this.state.avatarProgress}
                          />
                          :
                          <Icon
                              style={styles.plusIcon}
                              name="ios-cloud-upload-outline"
                          />
                    }
                  </View>
                </TouchableOpacity>
          }
          <Modal
              animationType={"slide"}
              visible={this.state.modalVisible}
          >
            <View style={styles.modalContainer}>
              <Icon
                  style={styles.closeIcon}
                  name="ios-close-outline"
                  onPress={this._closeModal.bind(this)}
              />
              <View style={styles.fieldItem}>
                <Text style={styles.label}>Nickname</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder={'input your nickName'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    defaultValue={user.nickname}
                    onChangeText={(text) => {
                      this._changeUserState.bind(this, 'nickname', text)
                    }}
                />
              </View>
              <View style={styles.fieldItem}>
                <Text style={styles.label}>Breed</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder={'input your breed'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    defaultValue={user.breed}
                    onChangeText={(text) => {
                      this._changeUserState.bind(this, 'breed', text)
                    }}
                />
              </View>
              <View style={styles.fieldItem}>
                <Text style={styles.label}>Age</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder={'input your age'}
                    autoCapitalize={'none'}
                    autoCorrect={false}
                    defaultValue={user.age}
                    onChangeText={(text) => {
                      this._changeUserState.bind(this, 'age', text)
                    }}
                />
              </View>
              <View style={styles.fieldItem}>
                <Text style={styles.label}>Sex</Text>
                <Icon.Button
                    style={[styles.gender, user.gender === 'male' && styles.genderChecked]}
                    name="ios-paw-outline"
                    onPress={() => {
                      this._changeUserState.bind(this, 'gender', 'male')
                    }}
                >
                  male
                </Icon.Button>
                <Icon.Button
                    style={[styles.gender, user.gender === 'female' && styles.genderChecked]}
                    name="ios-paw"
                    onPress={() => {
                      this._changeUserState.bind(this, 'gender', 'female')
                    }}
                >
                  female
                </Icon.Button>
              </View>
              <Button
                  style={styles.btn}
                  onPress={this._submit.bind(this)}
              >
                Save
              </Button>
            </View>
          </Modal>
          <Button
              style={styles.btn}
              onPress={this._logout.bind(this)}
          >
            Logout
          </Button>
        </View>
    )
  }

  _pickPhoto() {
    var that = this;
    // react-native-image-picker 里面的方法 copy[start]
    ImagePicker.showImagePicker(photoOptions, (res) => {
      if (res.didCancel) {
        return;
      }

      var avatarData = 'data:image/jpeg;base64,' + res.data;
      var timestamp = Date.now();
      var tags = 'app.avatar';
      var folder = 'avatar';
      var signatureURL = config.api.base + config.api.signature;
      var accessToken = this.state.user.accessToken;

      request.post(signatureURL, {
        accessToken: accessToken,
        timestamp: timestamp,
        folder: folder,
        tags: tags,
        type: 'avatar'
      }).catch((err) => {
        console.log(err);
      }).then((data) => {
        if (data && data.success) {
          var signature = data.data;
          var body = new FormData(); // 构建新表单

          body.append('folder', folder);
          body.append('signature', signature);
          body.append('tags', tags);
          body.append('timestamp', timestamp);
          body.append('api_key', config.cloudinary.api_key);
          body.append('resource_type', 'image');
          body.append('file', avatarData);

          that._upload(body); // 传入构建好的表单
        }
      })
    });
  }

  _upload(body) {
    var that = this;
    var xhr = new XMLHttpRequest();
    var url = CLOUDINARY.image;

    this.setState({
      avatarUploading: true,  // 正在上传
      avatarProgress: 0
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
          avatarUploading: false, // 上传结束
          avatarProgress: 0,
          user: user
        });

        that._asynUser(true);
      }
    };

    // 圆形进度条
    if (xhr.upload) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) { // 可计算长度
          var percent = Number((event.loaded / event.total).toFixed(2));

          that.setState({
            avatarProgress: percent
          });
        }
      }
    }

    xhr.send(body);
  }

  // 传给服务器端 public_id -> isAvatar
  _asynUser(isAvatar) {
    var that = this;
    var user = this.state.user;

    if (user && user.accessToken) {
      var url = config.api.base + config.api.update;

      request.post(url, user)
          .then((data) => {
            if (data && data.success) {
              var user = data.data;

              if (isAvatar) {
                AlertIOS.alert('头像更新完毕');
              }

              that.setState({
                user: user
              }, function () {
                that._closeModal();
                // 保存在本地
                AsyncStorage.setItem('user', JSON.stringify(user));
              })
            }
          })
    }
  }

  _edit() {
    this.setState({
      modalVisible: true
    })
  }

  _closeModal() {
    this.setState({
      modalVisible: false
    })
  }

  _changeUserState(key, value) {
    var user = this.state.user;
    user[key] = value;
    this.setState({
      user: user
    })
  }

  _submit() {
    this._asynUser();
  }

  _logout() {
    this.props.logout();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    fontWeight: '600',
    fontSize: 14
  },

  avatarContainer: {
    width: width,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#666'
  },

  avatarTip: {
    color: '#fff',
    backgroundColor: 'transparent',
    fontSize: 14
  },

  avatarBox: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },

  avatar: {
    marginBottom: 15,
    width: width * 0.2,
    height: width * 0.2,
    // 颜色填充方式
    resizeMode: 'cover',
    borderRadius: width * 0.1
  },

  plusIcon: {
    padding: 20,
    paddingLeft: 25,
    paddingRight: 25,
    color: '#999',
    fontSize: 24,
    backgroundColor: '#fff',
    borderRadius: 8
  },

  modalContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff'
  },

  fieldItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: '#eee',
    borderBottomWidth: 1
  },

  label: {
    color: '#ccc',
    marginRight: 10,
    width: 100
  },

  inputField: {
    flex: 1,
    height: 50,
    color: '#666',
    fontSize: 14
  },

  closeIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    fontSize: 32,
    right: 20,
    top: 30,
    color: '#ee735c'
  },

  gender: {
    backgroundColor: '#ccc'
  },

  genderChecked: {
    backgroundColor: '#ee735c'
  },

  btn: {
    marginTop: 30,
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#ee753c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee753c',
    marginLeft: 10,
    marginRight: 10
  }
});