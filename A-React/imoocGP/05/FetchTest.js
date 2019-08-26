import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import NavigationBar from "./NavigationBar";


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
                this.onLoad("http://rapapi.org/mockjsdata/24698/test")
              }}
          >
            get Data
          </Text>
          <Text
              style={styles.text}
              onPress={() => {
                this.onSubmit("http://rapapi.org/mockjsdata/24698/submit", {
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

  onLoad(url) {
    fetch(url)
        .then(response => response.json())
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

  onSubmit(url, data) {
    fetch(url, {
      method: "POST",
      header: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
        .then(response => response.json())
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