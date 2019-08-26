import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';
import NavigationBar from "../../common/NavigationBar";
import ViewUtils from '../../util/ViewUtils';
import ArrayUtils from '../../util/ArrayUtils';
import LanguageDao, {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';
import CheckBox from 'react-native-check-box'


export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
    this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_key);
    this.chanageValues = [];
    this.state = {
      dataArray: []
    }
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    this.languageDao
        .fetch()
        .then(result => {
          this.setState({
            dataArray: result
          })
        })
        .catch(err => {
          console.log(err);
        })
  }

  onSave() {
    if (this.chanageValues.length === 0) {
      this.props.navigator.pop();
      return;
    }
    this.languageDao.save(this.state.dataArray);
    this.props.navigator.pop();
  }

  renderView() {
    // return <Text style={{width: 400, height: 400}}>{JSON.stringify(this.state.dataArray)}</Text>
    if (!this.state.dataArray || this.state.dataArray.length === 0) return;
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
          <View style={styles.line}></View>
        </View>
    )
    return views;
  }

  onClick(data) {
    data.checked = !data.checked;
    ArrayUtils.updateArray(this.chanageValues, data);
  }

  renderCheckBox(data) {
    let leftText = data.name;
    return (
        <CheckBox
            style={{flex: 1, padding: 10}}
            onClick={() => this.onClick(data)}
            isChecked={data.checked}
            leftText={leftText}
            checkedImage={
              <Image
                  source={require('../../../res/images/icon_camera_finish_normal.png')}
              />
            }
            unCheckedImage={
              <Image
                  source={require('../../../res/images/icon_camera_finish_disabled.png')}
              />
            }
        />
    )
  }

  render() {
    let rightButton = <TouchableOpacity
        onPress={() => this.onSave()}
    >
      <View style={{margin: 10}}>
        <Text style={styles.title}>Save</Text>
      </View>
    </TouchableOpacity>

    return (
        <View style={styles.container}>
          <NavigationBar
              title="MyPage"
              backgroundColor="#6495ED"
              leftButton={ViewUtils.getLeftButton(() => this.onSave())}
              rightButton={rightButton}
          />
          <ScrollView>
            {this.renderView()}
          </ScrollView>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f2f2',
  },
  tips: {
    fontSize: 20
  },
  title: {
    fontSize: 20,
    color: '#fff'
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
  item: {
    flexDirection: 'row',
  }
})