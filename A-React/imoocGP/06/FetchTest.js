import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import NavigationBar from "./NavigationBar";
import HttpUtils from './HttpUtils';


export default class FetchTest extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: ''
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <NavigationBar
              title={'Fetch'}
          />
          <Text
              style={styles.text}
              onPress={() => {
                this.get("http://rapapi.org/mockjsdata/24698/test")
              }}
          >
            get Data
          </Text>
          <Text
              style={styles.text}
              onPress={() => {
                this.post("http://rapapi.org/mockjsdata/24698/submit", {
                  password: '1234567890',
                  userName: 'GanYihuan'
                })
              }}
          >
            upload data
          </Text>
          <Text>return result: {this.state.result}</Text>
        </View>
    )
  }

  get(url) {
    HttpUtils.get(url)
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

  post(url, data) {
    HttpUtils.post(url, data)
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
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 20
  }
});