# 两列布局，右侧能自由变动，左侧固定
```scss
.goods {
  display: flex;
  .menu-wrapper {
    // 等分 缩放 占位
    flex: 0 0 80px;
    width: 80px;
  }
  .foods-wrapper {
    flex: 1;
  }
}
```



# 启动current样式, 传递index
## :class="{'current':currentIndex === index}"
## 如果index === currentIndex则启动current类名
```html
<li class="menu-item border-1px"
    :class="{'current':currentIndex === index}"
    v-for="(item, index) in goods"
    @click="selectMenu(index, $event)"
></li>
```



## 多行文本垂直居中
```scss
  .menu-item {
    display: table;
    height: 12px;
    line-height: 12px;
    .text {
      display: table-cell;
      vertical-align: middle;
    }
  }
  // 内边距和边框都将在已设定的宽度和高度内进行绘制。 
  box-sizing: border-box;
```



## 4
```js
// $nextTick在下次 DOM 更新循环结束之后执行延迟回调。
// 修改数据后立即使用这个方法，获取更新后的 DOM。
this.$nextTick(() => {
  this._initScroll();
  this._calculateHeight();
});
```



## 能滚动,检测滚动位置
```html
<div class="menu-wrapper" ref="menuWrapper"></div>
```

--------

```js
import BScroll from 'better-scroll';
// vue1.0
// v-el:
// this.menuScroll = new BScroll(this.$el.menuWrapper, {})
this.foodScroll = new BScroll(this.$refs.foodWrapper, {
  // 3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
  // 实时滚动的位置
  probeType: 3,
  click: true
});
this.foodScroll.on('scroll', (pos) => {
  // food-list scroll distance
  this.scrolly = Math.abs(Math.round(pos.y));
});
```


#搜集一共有几个菜图的高度
```js
_calculateHeight() {
  // 获取带class元素
  let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
  let height = 0;
  this.listHeight.push(height);
  for (let i = 0; i < foodList.length; i++) {
    let item = foodList[i]; // 单个菜图对象
    height += item.clientHeight;  // 每个菜图的高度
    this.listHeight.push(height); // listHeight -> 多个菜图的高度
  }
},
```



## 落入第几个food-list的位置,返回是第几个
```js
currentIndex() {
  for (let i = 0; i < this.listHeight.length; i++) {
//  1.const定义的变量不可以修改，而且必须初始化。
//  2.var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
//  3.let是块级作用域，函数内部使用let定义后，对函数外部无影响。
    let height = this.listHeight[i];
    let height2 = this.listHeight[i + 1];
    // 不落入height2,落入height上top到height2上top区间
    if (!height2 || (this.scrolly >= height && this.scrolly < height2)) {
      return i;
    }
  }
  // 起点
  return 0;
}
```



## 添加一个food属性count=1
```js
Vue.set(this.food, 'count', 1);
```

--------

## 子组件:
//        触发当前实例上的事件
//        子组件通过 $emit触发父组件的方法 increment
this.$emit('cart.add', event.target);
--------

## 父组件:
```html
<cartControl @add="addFood" :food="food"></cartControl>
```
```js
events: {
  'cart.add'(target) {
  }
}
```



## 阻止默认事件和冒泡
<div class="content-right" @click.stop.prevent="pay"></div>



>##
#10
 selectMenu(index, event) {
  // 去掉自带click事件的点击
  if (!event._constructed) {
    return;
  }
  // get class
  let foodList = this.$refs.foodWrapper.getElementsByClassName('food-list-hook');
  let el = foodList[index];
  // scrollToElement(object,ca time)
  this.foodScroll.scrollToElement(el, 100);
},



>##
#11
#二维数组嵌套, foods[]是嵌套在goods[]里面的(data.json)
selectFoods() {
  let foods = [];
  this.goods.forEach((good) => {
    good.foods.forEach((food) => {
      if (food.count) {
        foods.push(food);
      }
    });
  });
  return foods;
}



>##
#12
#子组件传递参数给父组件
this.$emit('add', event.target);
---------
// 父组件
html:
<cartControl @add="addFood" :food="food"></cartControl>
js:
addFood(target) {
  this._drop(target);
}
_drop(target) {
  // 体验优化,异步执行下落动画
  this.$nextTick(() => {
    // 调用shopCart组件里的drop方法
    this.$refs.shopCart.drop(target);
  });
}



>##
#13
#遗留难点
#动画处理函数
<!-- drop is a methods -->
<!-- beforeDrop is a methods -->
<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop"></transition>
------
drop(el){}
------
beforeDrop(el) {
  let count = this.balls.length;
  while (count--) {
    let ball = this.balls[count];
    if (ball.show) {
      // getBoundingClientRect获得元素相当与适口的位置
      let rect = ball.el.getBoundingClientRect();
      // 偏移
      let x = rect.left - 32;
      let y = -(window.innerHeight - rect.top - 22);
      // 设置初始位置
      el.style.display = '';
      el.style.webkitTransform = `translate3d(0,${y}px,0)`;
      el.style.transform = `translate3d(0,${y}px,0)`;
      let inner = el.getElementsByClassName('inner-hook')[0];
      inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
      inner.style.transform = `translate3d(${x}px,0,0)`;
    }
  }
},
------
 dropping(el, done) {
  // 触发浏览器重构 
  /* eslint-disable no-unused-vars */
  let rf = el.offsetHeight;
  this.$nextTick(() => {
    // style reset
    el.style.webkitTransform = 'translate3d(0,0,0)';
    el.style.transform = 'translate3d(0,0,0)';
    let inner = el.getElementsByClassName('inner-hook')[0];
    inner.style.webkitTransform = 'translate3d(0,0,0)';
    inner.style.transform = 'translate3d(0,0,0)';
    el.addEventListener('transitionend', done);
  });
},
------
afterDrop(el) {
  let ball = this.dropBalls.shift();
  if (ball) {
    ball.show = false;
    el.style.display = 'none';
  }
}
-------
css:
// http://cubic-bezier.com/#.51,-0.45,.83,.67 运动曲线的设置
transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);



>##
#14
if (!this.scroll) {
  this.scroll = new BScroll(this.$refs.listCountent, {
    click: true
  });
} else {
  this.scroll.refresh();
}





clientHeight
内容可视区域的高度，也就是说页面浏览器中可以看到内容的这个区域的高度

IE、Opera 认为 offsetHeight = clientHeight + 滚动条 + 边框。
NS、FF 认为 offsetHeight 是网页内容实际高度，可以小于 clientHeight。

scrollHeight
IE、Opera 认为 scrollHeight 是网页内容实际高度，可以小于 clientHeight。
NS、FF 认为 scrollHeight 是网页内容高度，不过最小值是 clientHeight。


就是clientHeight的值不包括scrollbar的高度，而offsetHeight的值包括了scrollbar的高度

clientHeight的值由DIV内容的实际高度和CSS中的padding值决定，而offsetHeight的值由DIV内容的实际高度，CSS中的padding值，scrollbar的高度和DIV的border值决定；至于CSS中的margin值，则不会影响clientHeight和offsetHeight的值。




