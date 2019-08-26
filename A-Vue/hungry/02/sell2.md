# stickylayout布局
```html
<div class="detail">
  <!-- A:清浮动 -->
  <div class="detail-wrapper clearfix">
    <div class="detail-main"></div>
  </div>
  <!-- B:关闭按钮 -->
  <div class="detail-close">
    <i class="icon-close"></i>
  </div>
</div>
```

------

```scss
  .detail-wrapper {
    // 填充空间
    min-height: 100%;
    width: 100%;

    .detail-main {
      margin-top: 64px;
      // C:给关闭按钮的空间
      padding-bottom: 64px;
    }
    .detail-close {
      position: relative;
      width: 32px;
      height: 32px;
      // D:margin嵌入了main里的padding
      margin: -64px auto 0 auto;
      font-size: 32px;
      // E:clearfix
      clear: both;
    }
  }

```



## 星星
```html
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses"
          :class="itemClass" :key="itemClass.id">
    </span>
  </div>
```

----------  

```js
starType() {
    return 'star-' + this.size;
},
itemClasses() {
    let result = [];
    // 4.2 -> 4.5;  4.8 -> 4.5
    let score = Math.floor(this.score * 2) / 2;
    // 是否有小数,有就半星
    let hasDecimal = score % 1 !== 0;
    // 星星部分,不计半星
    let integer = Math.floor(score);
    // 全星星
    for (let i = 0; i < integer; i++) {
      result.push(CLS_ON);
    }
    // 半星星
    if (hasDecimal) {
      result.push(CLS_HALF);
    }
    // 空星星
    while (result.length < LENGTH) {
      result.push(CLS_OFF);
    }
    return result;
}
```



## flex实现行线+字符+行线
```html
<div class="title">
  <div class="line"></div>
  <div class="text">special offers</div>
  <div class="line"></div>
</div>
```

---------

```scss
.title {
  display: flex;
  width: 80%;
  margin: 28px auto 24px auto;
  .line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
  .text {
    padding: 0 12px;
    font-weight: 700;
    font-size: 14px;
  }
}
```



## animated
```html
<transition name="fade"></transition>
```

------

```scss
// 动画
  &.fade-transition {
    opacity: 1;
    background: rgba(7, 17, 27, 0.8);
  }
  // 动画
  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
  }
```







