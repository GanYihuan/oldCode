/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import NavigatorBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';

const data = {
  "result": [
    {
      "email": "583520052@qq.com",
      "fullName": "GanYihuan"
    },
    {
      "email": "1234567@gmail.com",
      "fullName": "aaaaaa"
    },
    {
      "email": "78932323232@gmail.com",
      "fullName": "ccccccc"
    }
  ],
  "statusCode": "0"
}


export default class ListViewTest extends Component {
  constructor(props) {
    super(props);//这一句不能省略，照抄即可
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(data.result),
      isLoading: true
    };
    this.onLoad();
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigatorBar title="ListViewTest"/>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={(item) => this.renderRow(item)}
              renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => this.renderSeparator()}
              renderFooter={() => this.renderFooter()}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isLoading}
                  onRefresh={() => this.onLoad()}
                />
              }
          />
          <Toast ref={toast => {
            this.toast = toast
          }}/>
        </View>
    );
  }

  renderRow(item) {
    return (
        <View style={styles.row}>
          <TouchableOpacity
              onPress={() => {
                this.toast.show("you click :" + item.fullName, DURATION.LENGTH_LONG);
              }}
          >
            <Text style={styles.text}>{item.fullName}</Text>
            <Text style={styles.text}>{item.email}</Text>
          </TouchableOpacity>
        </View>
    )
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return <View key={rowID} style={styles.line}></View>
  }

  renderFooter() {
    return <Image style={styles.img} source={require('./icon_tabbar_mine.png')}/>
  }

  onLoad() {
    setTimeout(() => {
      this.setState({
        isLoading: false
      })
    }, 2000)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  text: {
    fontSize: 20
  },
  row: {
    height: 50
  },
  line: {
    height: 1,
    backgroundColor: '#000'
  },
  img: {
    width: 100,
    height: 100
  }
});

