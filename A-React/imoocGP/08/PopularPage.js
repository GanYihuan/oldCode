import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';
import DataRepository from '../../js/expand/dao/DataRepository';
import NavigationBar from '../common/NavigationBar';


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';


export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.dataRepository = new DataRepository();
    this.state = {
      result: ''
    }
  }

  onLoad() {
    let url = this.genUrl(this.text);

    this.dataRepository.fetchNetRepository(url)
        .then(result => {
          this.setState({
            result: JSON.stringify(result)
          })
        })
        .catch(err => {
          this.setState({
            result: JSON.stringify(err)
          })
        })
  }

  genUrl(key) {
    return URL + key + QUERY_STR
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigationBar
              title="PopularPage"
              style={{backgroundColor: '#6495ED'}}
          />
          <Text
              onPress={() => {
                this.onLoad()
              }}
              style={styles.tips}
          >
            get Data
          </Text>
          <TextInput
              style={{height: 40, borderWidth: 1}}
              onChangeText={text => this.text = text}
          />
          <Text style={{height: 500}}>{this.state.result}</Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

