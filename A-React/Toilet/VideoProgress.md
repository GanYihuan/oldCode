## 环境搭建



## node 安装
```
node -v
node
```
^ C 退出node



## 查看Mac安装的东西
```
cd /usr/local/bin/
ls
```



## 2-3 Express创建项目
### Express创建
```
sudo nppm install -g express-generator
```

### express 的 ejs 创建项目
```
<!-- 创建项目 -->
express -e service01

<!-- 进入项目service01安装相关依赖 -->
npm install

<!-- 查看service01的package.json内容 -->
cat package.json

<!-- 启动项目service01 -->
npm start
```

浏览打开
localhost:3000

为何是3000?
查看package.json
  "scripts": {
    "start": "node ./bin/www"
  },
查看www文件
```
cd bin/
cat www
<!-- 查看到port = 3000 -->
```



## 2-4 服务接口设计
app.js是服务入口文件 



### 监听service，随时能刷新,替代了npm start
```
sudo npm install -g supervisor

<!-- 使用supervisor启动项目 -->
supervisor bin/www
```



### 2-5 数据读取接口
浏览器打开
http://localhost:3000/data/read?type=it
查看到it.json数据,(/Users/ganyihuan/Documents/Code/Web/React/Toilet/service01/public/data/it.json)
```
var express = require('express');
var router = express.Router();
var fs = require('fs');
var PATH = './public/data/';

//读取数据模块，供客户端调用
//查询接口，token校验
//公共接口，无需校验
//data/read?type=it
//data/read?type=it.json
router.get('/read', function(req, res, next) {
  var type = req.param('type') || '';
  fs.readFile(PATH + type + '.json', function(err, data){
    if(err){
      return res.send({
        status:0,
        info:'读取文件出现异常'
      });
    }
    var COUNT = 50;
    var obj = [];
    try{
      obj = JSON.parse(data.toString());
    }catch(e){
      obj = [];
    }
    if(obj.length > COUNT){
      obj = obj.slice(0, COUNT);
    }
    return res.send({
      status:1,
      data:obj
    });
  });
});
```


## 2-6 数据存储接口
删除it.json数据

浏览器
localhost:3000/data/write?type=it&&url=xx.com&img=img.xx.com&title=helloGanYihuan


## 改代码
/Users/ganyihuan/Documents/Code/Web/React/Toilet/service01/routes/data.js
```
数据存储模块 后台开发使用
router.get('/write', function (req, res, next) {
 if (!req.session.user) {
   return res.send({
     status: 0,
     info: '未鉴权认证'
   });
 }
//router.post('/write', function (req, res, next) {
//  if (!req.session.user) {
//    return res.send({
//      status: 0,
//      info: '未鉴权认证'
//    });
//  }
```


## 2-7 阅读模块配置接口



## 3-1 后台系统开发讲解
## data.js
## // 登录接口
app.js
```
<!-- service01 -->
npm install express-session --save
```
```
// session
var session = require('express-session');
// session
app.use(session({
  secret: '#sddjswjdhww22ygfw2233@@@%#$!@%Q!%*12',
  resave: false,
  saveUninitialized: true
}));
```



## 4-2 React Native 运行项目注意事项


##  5-1 界面结构搭建
Finish
5-1


## 5-2 主题界面组件化
WebView



## 6-1 卫生间模块之WebView组件开发


## 6-2 卫生间模块之错误提示水平垂直居中
flex


## 6-3 - 6-8 卫生间之地图模块开发
高德地图
选择跳过高德地图使用


## 7-1 工具类封装
util.js


## 8-1 阅读模块功能设计
intro


## 8-2 五大模块创建和加载


## 8-3 搜索组建UI开发


## 8-4 推荐专题完成














