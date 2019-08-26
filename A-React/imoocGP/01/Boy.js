import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Girl from './Girl';


export default class Boy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      word: ''
    }
  }

  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>I am a Boy</Text>
          <Text
              style={styles.text}
              onPress={() => {
                this.props.navigator.push({
                  component: Girl,
                  params: {
                    word: 'flower',
                    onCallBack: (word) => {
                      this.setState({
                        word: word
                      })
                    }
                  }
                })
              }}
          >
            Give girl a flower
          </Text>
          <Text style={styles.text}>{this.state.word}</Text>
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