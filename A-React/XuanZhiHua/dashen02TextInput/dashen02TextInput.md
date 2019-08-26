# 更加不同的传入参数赋予不同的样式
```
_renderImage(index) {
    let allImage = [];
    let imgsArr = ImageData.data;
    let imgItem = imgsArr[index];
    let styleType = (index === 0) ? styles.imgheader : styles.imgfooter;
    allImage.push(
        <Image
            key={index}
            style={styleType}
            source={{uri: imgItem.img}}
        />
    );
    return allImage;
}
```



# TextInput
```
<TextInput
    style={styles.textInputStyle}
    // value={'文本框中的文字内容。'}
    placeholder={'请输入密码'}
    password={true}
    // 键盘类型
    keyboardType={'number-pad'}
    // 多行显示
    multiline={true}
    // 'x' button
    clearButtonMode={'always'}
/>
```


