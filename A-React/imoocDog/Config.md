# 检测xcode版本
xcode-select --install


# homebrew
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"


#homebrew install
brew install watchman flow git gcc pkg-config cairo libpng jpeg gitlib mongodb
> watchman: 用来监视文件记录文件改变的情况
> flow: 找出js中的类型错误,js静态类型检测器


# nvm install
# (github nvm)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
# nvm install nodejs
# 要在根目录里运行
$ nvm install v4.2.3
# nodejs变成默认版本
# 要在根目录里运行
$ nvm alias default v4.2.3
# version
node -v     v4.2.3 / v8.5.0
npm -v      v2.14.7 / v5.3.0


# 淘宝
sudo npm install cnpm -g
-----
如果想下载express的话，只需要使用–registry参数指定镜像服务器地址
npm install express --registry=http://registry.npm.taobao.org
可以使用如下命令进行永久设置
npm config set registry http://registry.npm.taobao.org


# 保留8081端口
# 关chrome插件
# RN api 0.22 -version


# react-native
cnpm install -g react-native-cli@0.1.10 -g
react-native -v     (0.1.10)
(xcode 7以上版本适用)


# install module
react-native init imoocApp
# run
react-native run-ios


# Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。
npm install -g yarn react-native-cli


# 安装完yarn后同理也要设置镜像源：
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global


# 如果你看到EACCES: permission denied这样的权限报错，那么请参照上文的homebrew译注，修复/usr/local目录的所有权：
sudo chown -R `whoami` /usr/local
# 安装完yarn之后就可以用yarn代替npm了，例如用yarn代替npm install命令，用yarn add 某第三方库名代替npm install --save 某第三方库名。



# keep your programs up-to-date.
brew update && brew upgrade



# xcode simulators
https://devimages.apple.com.edgekey.net/downloads/xcode/simulators/com.apple.pkg.iPhoneSimulatorSDK9_0-9.0.1.1443554484.dmg.




# 新版本出问题，使用该版本
react-native init imoocApp --version 0.44.0
npm install --version 0.44.0




