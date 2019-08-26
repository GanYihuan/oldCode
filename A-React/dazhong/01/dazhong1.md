# install webpack
- npm install webpack -g
- npm init
- npm install webpack --save-dev
- npm install webpack-dev-server --save-dev
- npm i react react-dom --save
- 在当前练习文件夹的根目录下新建一个名为webpack.config.js的文件

```
module.exports = {
  entry:  __dirname + "/app/main.js",//已多次提及的唯一入口文件
  output: {
    path: __dirname + "/public",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  }
}
```

>注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
- 在package.json中对npm的脚本部分进行相关设置
```
{
  "name": "webpack-sample-project",
  "version": "1.0.0",
  "description": "Sample webpack project",
  "scripts": {
    "start": "webpack" //配置的地方就是这里啦，相当于把npm的start命令指向webpack命令
  },
  "author": "zhang",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^1.12.9"
  }
}
```

- npm run start




# 性能检测
- npm i react-addons-perf --save
- Perf.start()
- Perf.stop()
- Perf.printWasted()



# PureRenderMixin 优化
- npm i react-addons-pure-render-mixin --save



# 
- npm install react-router --save
- ./app/containers/List
- 
