# 使用图片
# xcode add image
> copy image to
right click ios -> reveal in findle -> ios -> dashen01Image -> images.xcassets
xcode open dashen01Image.xcodeeproj -> dashen01Image -> images.xcassets

> index.ios.js
import BadgeData from './BadgeData.json';

> BadgeData.json
```
{"data": [{"icon":"iconName"},{"icon":"iconName"}]}
```



# 遍历数组
```
for (let i = 0; i < BadgeData.data.length; i++) {
      let item = BadgeData.data[i];
      allBadge.push(
          <View
              key={i}
              style={styles.outViewStyle}
          >
            <Image
                style={styles.imageStyle}
                source={{uri: item.icon}}
            />
            <Text style={styles.mainTitleStyle}>{item.title}</Text>
          </View>
      );
    } 
```



# flex布局
> 默认为纵轴,确定主轴的方向为横轴: flexDirection: 'row'
> 换行显示: flexWrap: 'wrap'
> 设置主轴的对齐方式: justifyContent: 'center'
> 侧轴为主轴的相反轴,设置侧轴的对齐方式: alignItems: 'center'
