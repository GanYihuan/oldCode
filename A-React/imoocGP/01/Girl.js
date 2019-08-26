import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';


export default class Girl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>I am a Girl</Text>
          <Text style={styles.text}>Boy give me a -> {this.props.word}</Text>
          <Text
              style={styles.text}
              onPress={() => {
                this.props.onCallBack('one punch');
                this.props.navigator.pop();
              }}
          >
            give boy one punch
          </Text>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 50
  },
  text: {
    fontSize: 20
  }
});