import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import MyPage from './MyPage';


export default class imooc_gp extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    this.state = {
      selectedTab: 'home'
    };
  }

  render() {
    let homeView = (
        <View style={[styles.flex, styles.center, {backgroundColor: '#0f0'}]}>
          <Text style={{fontSize: 22}}>我是主页</Text>
        </View>
    );

    let settingView = (
        <View style={[styles.flex, styles.center, {backgroundColor: '#ff0'}]}>
          <Text style={{fontSize: 22}}>我是设置页面</Text>
        </View>
    );

    return (
        <View style={styles.container}>
          <TabNavigator tabBarStyle={{height: 60}}>
            <TabNavigator.Item
                title="主页"
                badgeText="1"
                selectedTitleStyle={{color: '#f00'}}
                selected={this.state.selectedTab === 'home'}
                renderIcon={() => <Image style={styles.img} source={require('./icon_tabbar_homepage.png')}/>}
                renderSelectedIcon={() => <Image style={[styles.img, {tintColor: '#f00'}]} source={require('./icon_tabbar_homepage.png')}/>}
                onPress={() => this.setState({selectedTab: 'home'})}
            >
              <MyPage {...this.props}/>
            </TabNavigator.Item>
            <TabNavigator.Item
                title="设置"
                selectedTitleStyle={{color: '#f0f'}}
                selected={this.state.selectedTab === 'setting'}
                renderBadge={() => <Text>3</Text>}
                renderIcon={() => <Image style={styles.img} source={require('./icon_tabbar_mine.png')}/>}
                renderSelectedIcon={() => <Image style={[styles.img, {tintColor: '#f0f'}]} source={require('./icon_tabbar_mine_selected.png')}/>}
                onPress={() => this.setState({selectedTab: 'setting'})}
            >
              {settingView}
            </TabNavigator.Item>
          </TabNavigator>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  flex: {
    flex: 1,
  },
  img: {
    width: 36,
    height: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('imooc_gp', () => imooc_gp);
