import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput
} from 'react-native';
import DataRepository, {FLAG_STORAGE} from '../expand/dao/DataRepository';

const URL = 'https://github.com/trending/';


export default class TrendingPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository(FLAG_STORAGE.flag_trending);
    this.state = {
      data: ''
    }
  }

  onClick() {
    this.loadData('https://github.com/trending/' + this.text);
  }

  loadData(url) {
    this.dataRepository.fetchRepository(url)
        .then((data) => {
          this.setState({
            data: JSON.stringify(data)
          })
        })
        .catch((error) => {
          this.setState({
            data: error
          })
        })
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput
              style={{height: 40, borderWidth: 1, margin: 10}}
              onChangeText={text => this.text = text}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
                style={styles.tips}
                onPress={() => this.onClick()}
            >
              Load
            </Text>
            <Text style={{flex: 1}}>
              {this.state.data}
            </Text>
          </View>
        </View>
    );
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
    color: '#333',
    marginBottom: 5,
  },
  tips: {
    padding: 10,
    fontSize: 20
  }
});


