import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
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
    this.isRemoveKey = this.props.isRemoveKey ? true : false;
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
    if (this.isRemoveKey === true) {
      for (let i = 0, l = this.chanageValues.length; i < l; i++) {
        ArrayUtils.remove(this.state.dataArray, this.chanageValues[i]);
      }
    }
    this.languageDao.save(this.state.dataArray);
    this.props.navigator.pop();
  }

  onBack() {
    if (this.chanageValues.length > 0) {
      Alert.alert(
          'Confirm Exit',
          'Do you want to save your changes before exitting Gan?',
          [
            {
              text: 'No',
              onPress: () => {
                this.props.navigator.pop();
              }
            },
            {
              text: 'Yes',
              onPress: () => {
                this.onSave();
              }
            }
          ]
      )
    } else {
      this.props.navigator.pop();
    }
  }

  renderView() {
    // return <Text style={{width: 400, height: 400}}>{JSON.stringify(this.state.dataArray)}</Text>
    if (!this.state.dataArray || this.state.dataArray.length === 0) return;
    let len = this.state.dataArray.length;
    let views = [];
    for (let i = 0, l = len - 2; i < l; i += 2) {
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
    if (!this.isRemoveKey) data.checked = !data.checked;
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
    let title = this.isRemoveKey ? 'RemovePage' : 'SelfPage';
    let rightButtonTitle = this.isRemoveKey ? 'Remove' : 'Save';
    let navigationBar =
        <NavigationBar
            title={title}
            backgroundColor="#6495ED"
            leftButton={ViewUtils.getLeftButton(() => this.onBack())}
            rightButton={ViewUtils.getRightButton(rightButtonTitle, () => this.onSave())}
        />

    return (
        <View style={styles.container}>
          {navigationBar}
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