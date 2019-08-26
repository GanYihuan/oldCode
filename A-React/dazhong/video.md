
---------------------------------------
# Redux
npm install redux --save
npm install react-redux --save


# 1
> redux demo


# 2


# 3 


# 4 (important!)




---------------------------------------
# fetch
> JavaScript promiss (important!)
> koa
> webpack.config.js/devServer





---------------------------------------

# 2
- routerMap.jsx
- containers/index.jsx



# 3
> containers/index.jsx 
- render()
- componentDidMount()



# 4
> util/localStore.js
> containers/index.jsx 
- componentDidMount()



# 5
> store/configureStore.js
> reducers/index.js
> reducers/serinfo.js
- (redux react binding)



# 6
> components/HomeHeader/index.jsx



# 7
> components/HomeHeader/index.jsx



# 8
> conatiners/Home/index.jsx



# 9
> components/Category/index.jsx
- react-wipe



# 10
> components/Category/index.jsx



# 11    首页开发11-轮播图完成
> components/Category/index.jsx



-------------------------------------------
# 12    首页开发12-超值特惠-后端接口
> mock/server.js (koa)
> fetch/get.js
> fetch/post.js
> fetch/home.js




# 13    首页开发13-超值特惠-获取数据
> Home/Ad.jsx
- componentDidMount()



# 14    首页开发14-超值特惠-展示数据
> components/HomeAd/index.jsx 
- styles.less (change!) 
- index.jsx  (change!)



# 15    首页开发15-猜你喜欢-后端数据
> Home/List.jsx



# 16    首页开发16-猜你喜欢-获取列表数据
> Home/List.jsx
- loadMoreData()
- resultHandle() 



# 17    首页开发17-猜你喜欢-显示标题
> components/ListCompoent/index.jsx
> components/ListCompoent/Item/index.jsx



# 18    首页开发18-猜你喜欢-显示内容
> components/ListCompoent/Item/index.jsx



# 19    首页开发19-加载更多-准备数据
> components/ListCompoent/index.jsx
- loadMoreData()



# 20    首页开发20-加载更多-实现功能
> components/LoadMore/index.jsx
> conatiners/Home/List.jsx
- loadMoreData()
- resultHandle()



# 21    首页开发21-加载更多-下拉效果
> LoadMore/index.jsx
- componentDidMount()




-------------------------------------------
# react-dianping-state2-city-page
# 开发城市页面
> components/Category/style.less (change!)
> components/HomeAd/style.less (change!)
> components/HomeAd/index.jsx (change!)
> containers/Home/style.less (change!)
> mock/search/list.js (change!)



# 2     开发城市页面01-路由介绍
> HomeHeader
> containers/City



# 3     开发城市页面03-完成Header
> components/Header



# 4     开发城市页面04-当前城市



# 5     开发城市页面05-修改城市的方法
> components/CityList
> containers/City
- changeCity()



# 6     开发城市页面06-修改城市完成
> components/CityList
- clickHandle()





# react-dianping-state3-search-page
# 开发搜索页



# 1     开发搜索页01-路由配置
> components/Category



# 2     开发搜索页02-约束性和非约束性组件
> SearchInput



# 3     开发搜索页03-抽离input-1
> SearchInput



# 4     开发搜索页04-抽离input-2
> SearchInput
> HomeHeader 
- enterHandle()
- ChangeHandle()
- KeyUpHandle()
- componentDidMount()



# 5     开发搜索页05-SearchHeader组件
> Search
> SearchHeader
- clickHandle()
- enterHandle()



# 6     开发搜索页06-结果列表
> SearchList
- componentDidUpdate()




-------------------------------------------
# 开发详情页
> components/Category/style.less (change!)
> components/HomeAd/style.less (change!)
> components/HomeAd/index.jsx (change!)
> containers/Home/style.less (change!)
> mock/search/list.js (change!)



# 1     开发详情页01-header
> routeMap
> Detail



# 2     开发详情页02-获取商户信息
> Info



# 3     开发详情页03-展示商户信息-1
> DetailInfo
- XSS attact



# 4     开发详情页04-展示商户信息-2
> Star



# 5     开发详情页05-用户评论列表
> Comment
> CommentList
> Item





-------------------------------------------
# 开发登录页
> components/Category/style.less (change!)
> components/HomeAd/style.less (change!)
> components/HomeAd/index.jsx (change!)
> containers/Home/style.less (change!)
> mock/search/list.js (change!)


# 1     开发登录页01-路由配置
> HomeHeader
> routeMap
> Login
> LoginComponent



# 2     开发登录页02-登录组件-1
> Login
- loginHandle ?



# 3     开发登录页03-登录组件-2
> LoginComponent(Login)
- 约束性组件
```
<input
    type="text"
    placeholder="输入手机号"
    onChange={this.changeHandle.bind(this)}
    value={this.state.username}
/>
changeHandle(e) {
    this.setState({
      username: e.target.value
    })
}
```



-------------------------------------------
# 购买和收藏
> components/Category/style.less (change!)
> components/HomeAd/style.less (change!)
> components/HomeAd/index.jsx (change!)
> containers/Home/style.less (change!)
> mock/search/list.js (change!)


# 1     购买和收藏01-创建子页面
> Buy
> BuyAndStore



# 4     购买和收藏02-购买功能
> Redux (not familliar !)
> reducers/store.js (not familliar !)
> reducers/index.js (not familliar !)
> reducers/userinfo.js (not familliar !)
> mock/search/list.js (change!)



# 5     购买和收藏05-收藏功能-准备3
> Buy
- storeHandle()



# 6     购买和收藏06-收藏功能-完成
> BuyAndStore



-------------------------------------------
# 用户中心
> components/Category/style.less (change!)
> components/HomeAd/style.less (change!)
> components/HomeAd/index.jsx (change!)
> containers/Home/style.less (change!)
> Header (change!)
> User (change!)
> mock/search/list.js (change!)

# 1     用户中心01-Header
> Header (change!)
> User (change!)


# 2     用户中心02-用户信息
> UserInfo


# 3     用户中心03-获取订单
> OrderList


# 4     用户中心04-展示订单
> OrderList
> Item



-------------------------------------------
# 评价
> components/Category/style.less (change!)
> components/HomeAd/style.less (change!)
> components/HomeAd/index.jsx (change!)
> containers/Home/style.less (change!)
> Header (change!)
> User (change!)
> mock/search/list.js (change!)

# 1     评价01-评价状态
introduce


# 2     评价02-显示输入框
> OrderListComponent(List)/Item


# 3     评价03-获取评价内容
> OrderListComponent(List)/Item
> User/OrderList
- submitComment


# 4     评价04-提交数据
> User/OrderList
- submitComment()





