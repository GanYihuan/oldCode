import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TabBarIOS
} from 'react-native';


class dongFang1 extends Component {
  constructor() {
    super();
    this.state = {
      selectedTabBarItem: 'home'
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.headerViewStyle}>
            <Text style={{color: '#fff'}}>Tab Header</Text>
          </View>
          <TabBarIOS
              barTintColor='#0f0'
              tintColor='#00f'
          >
            <TabBarIOS.Item
                systemIcon="downloads"
                selected={this.state.selectedTabBarItem === 'home'}
                onPress={() => {
                  this.setState({
                    selectedTabBarItem: 'home'
                  })
                }}
            >
              <View style={[{backgroundColor: '#f00'}, styles.commonViewStyle]}>
                <Text>Home</Text>
              </View>
            </TabBarIOS.Item>
            <TabBarIOS.Item
                systemIcon="bookmarks"
                selected={this.state.selectedTabBarItem === 'second'}
                badge="10"
                onPress={() => {
                  this.setState({
                    selectedTabBarItem: 'second'
                  })
                }}
            >
              <View style={[{backgroundColor: '#f0f'}, styles.commonViewStyle]}>
                <Text>Second</Text>
              </View>
            </TabBarIOS.Item>
          </TabBarIOS>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  headerViewStyle: {
    height: 64,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  commonViewStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});


AppRegistry.registerComponent('dongFang1', () => dongFang1);
