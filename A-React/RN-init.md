# init
# 高版本有问题
react-native init XuanZhiHua --version 0.44.0


# 到此就完成了welcome界面的打开
# run
react-native run-ios


# 查看package.json
# "react": "16.0.0-alpha.6",
# "react-native": "0.44.0"
{
    "name": "demo",
    "version": "0.0.1",
    "private": true,
    "scripts": {
        "start": "node node_modules/react-native/local-cli/cli.js start",
        "test": "jest"
    },
    "dependencies": {
        "react": "16.0.0-alpha.6",
        "react-native": "0.44.0"
    },
    "devDependencies": {
        "babel-jest": "21.0.2",
        "babel-preset-react-native": "4.0.0",
        "jest": "21.1.0",
        "react-test-renderer": "16.0.0-alpha.6"
    },
    "jest": {
        "preset": "react-native"
    }
}


# 如果package.json改变了，可以install一下
npm install

# run
react-native run-ios