# sell1

## 路由
>## 抄模板



## _base.scss
## 适配不同dip屏幕
## iphone dip更加高级
```scss
@media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
  .border-1px{
    &::after{
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
}
@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
  .border-1px{
    &::after{
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
```



## _base.scss
## 清除浮动
```scss
.clearfix{
  display: inline-block;
  &:after{
    display: block;
    content: ".";
    height: 0;
    line-height: 0;
    clear: both;
    visibility: hidden;
  }
}
```



## _mixin.scss
## 一像素横线
```scss
@mixin border-1px($color) {
  position: relative;
  &:after {
    display: block;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid $color;
    content: ' ';
  }
}
```



## _mixin.scss
## 无一像素横线
```scss
@mixin border-none(){
  &:after{
    display: none;
  }
}
```



## 2x3x图
```scss
@mixin bg-image($url) {
  background-image: url($url + "@2x.png");
  @media (-webkit-min-device-pixel-ratio: 3) {
    background-image: url($url + "@3x.png");
  }
  @media (min-device-pixel-ratio: 3) {
    background-image: url($url + "@3x.png");
  }
}
```



## 超出显示 …
```scss
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
#模糊效果
filter: blur(10px);
```



## 异步ajax请求
## vue-resource:
```js
    // vue-resource
    // https://github.com/pagekit/vue-resource    copy!
    // called after the instance has been created.
    created() {
      // GET /someUrl
      // AJAX
      this.$http.get('/api/seller').then((response) => {
        // get body data
        response = response.body;
        if (response.errno === ERO_OK) {
          this.seller = response.data;
        }
      });
      this.seller = data.seller;
    },
```


 
## 异步传来的ajax，先要判断是否有数据supports
```html
<!-- v-if="seller.supports: 是否有supports,因为是异步传数据，防止没传来就处理 -->
<div class="support" v-if="seller.supports">
  <span class="icon" :class="classMap[seller.supports[0].type]"></span>
  <span class="text">{{seller.supports[0].description}}</span>
</div>

<!-- ajax请求，因为是异步传数据，防止没传来就处理，需要v-bind -->
<!-- v-bind -> :src -->
<img :src="seller.avatar" width="64" height="64" alt="avatar"/>

 <!-- v-if="seller.supports: 是否有supports,因为是异步传数据，防止没传来就处理 -->
<div class="support-count" v-if="seller.supports" @click="showDetail">
  <span class="count">{{seller.supports.length}}个</span>
  <i class="icon-keyboard_arrow_right"></i>
</div>
```



## 数据动态切换样式与内容
## data.json:
```json
"supports": [
  {
    "type": 0,
    "description": "在线支付满28减5"
  },
  {
    "type": 1,
    "description": "VC无限橙果汁全场8折"
  }
],
```

--------

## template.js:
```html
<span class="icon" :class="classMap[seller.supports[0].type]"></span>
<span class="text">{{seller.supports[0].description}}</span>
```

--------

## script.js:
```js
created() {
  this.classMap = ['decrease', 'discount'];
}
```

--------

## style.scss:
```scss
.support {
  &.decrease {
    @include bg-image('decrease_1')
  }
  &.discount {
    @include bg-image('discount_1')
  }
}
```



## 




