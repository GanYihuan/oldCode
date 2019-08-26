/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  ScrollView,
  View,
  Image
} from 'react-native'
import CheckBox from 'react-native-check-box'
import keys from './res/data/keys.json'
import Toast from 'react-native-easy-toast'

export default class dongFang1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.setState({
      dataArray: keys
    })
  }

  onClick(data) {
    data.checked = !data.checked;
    let msg=data.checked? 'you checked ':'you unchecked '
    this.toast.show(msg+data.name);
  }

  renderView() {
    if (!this.state.dataArray || this.state.dataArray.length === 0)return;
    var len = this.state.dataArray.length;
    var views = [];
    for (var i = 0, l = len - 2; i < l; i += 2) {
      views.push(
          <View key={i}>
            <View style={styles.item}>
              {this.renderCheckBox(this.state.dataArray[i])}
              {this.renderCheckBox(this.state.dataArray[i + 1])}
            </View>
            <View style={styles.line}/>
          </View>
      )
    }
    views.push(
        <View key={len - 1}>
          <View style={styles.item}>
            {len % 2 === 0 ? this.renderCheckBox(this.state.dataArray[len - 2]) : null}
            {this.renderCheckBox(this.state.dataArray[len - 1])}
          </View>
        </View>
    )
    return views;

  }

  renderCheckBox(data) {
    var leftText = data.name;
    return (
        <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={()=>this.onClick(data)}
            isChecked={data.checked}
            leftText={leftText}
            checkedImage={
              <Image
                  source={require('./res/images/icon_camera_finish_normal.png')}
              />
            }
            unCheckedImage={
              <Image
                  source={require('./res/images/icon_camera_finish_disabled.png')}
              />
            }
        />);
  }

  render() {
    return (
        <View style={styles.container}>
          <ScrollView>
            {this.renderView()}
          </ScrollView>
          <Toast ref={e=>{this.toast=e}}/>
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
    marginTop:30
  },
  item: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
})


AppRegistry.registerComponent('dongFang1', () => dongFang1);
