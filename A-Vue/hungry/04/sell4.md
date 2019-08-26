>##
#传递数据，子级调用父级的方法
<li class="food-item"
    v-for="food in item.foods"
    @click="selectFood(food, $event)"
>
</li>
------                
<food @add="addFood" :food="selectedFood" ref="food"></food>
------
data() {
  return {
    selectedFood: {}
  };
},
------
selectFood(food, event) {
    if (!event._constructed) {
      // 去掉自带click事件的点击
      return;
    }
    this.selectedFood = food;
    // $refs一个对象，其中包含了所有拥有 ref 注册的子组件。
    // 调用food组件里的show方法
    this.$refs.food.show();
  },



>##
#宽高相等的容器
.image-header {
    position: relative;
    width: 100%;
    // 宽高相等容器
    height: 0;
    padding-top: 100%;
}
img {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}



>##
#child and father transimit
#ratingselect (child)
<span class="block positive"
      :class="selectType === 0 ? 'active' : ''"
      @click="select(0, $event)"
>
</span>
####
select(type, event) {
  if (!event._constructed) {
    return;
  }
  // 子组件通过$emit触发父组件的方法increment,可传参this.counter
  // this.$emit('increment' ,this.counter);
  this.$emit('select', type);
},
-------------------------------
#food (father)
<ratingselect
  @select="selectRating"
>
####
</ratingselect>
selectRating(type) {
  this.selectType = type;
  this.$nextTick(() => {
    this.scroll.refresh();
  });
},
####
<ratingselect
  :select-type="selectType"
>
</ratingselect>
-------------------------------



>##
#
formateDate(date, 'yyyy-MM-dd hh:mm')





