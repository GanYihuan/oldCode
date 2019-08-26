# 相册
```
import ImagePicker from 'react-native-image-picker';
let photoOptions = {
  title: '选择头像',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从相册选择',
  quality: 0.75,  // 图片质量
  allowsEditing: true,  // 允许图片操作?
  noData: false,  // false:改变图片性能转换为png64
  storageOptions: {
    skipBackup: true, // 不会被传到cloudinary
    path: 'images'  // 存储路径
  }
};
ImagePicker.showImagePicker(photoOptions, (res) => {
  // 取消选图
  if (res.didCancel) {
    return;
  }
  // copy 'data:image/jpeg;base64,'
  var avatarData = 'data:image/jpeg;base64,' + res.data;
  var user = that.state.user;
  user.avatar = avatarData;
  that.setState({
    user: user
  });
});
```



# cloudinary图床
- 

