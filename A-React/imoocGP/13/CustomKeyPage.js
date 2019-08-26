import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import NavigationBar from "./NavigationBar";
import ViewUtils from './ViewUtils';


export default class CustomKeyPage extends Component {
  constructor(props) {
    super(props);
  }

  onSave() {
    this.props.navigator.pop();
  }

  renderView() {

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
              leftButton={ViewUtils.getLeftButton(() => this.onSave())}
              rightButton={rightButton}
          />
          <ScrollView>
            {this.renderView()}
          </ScrollView>
          <Text style={styles.tips}>CustomKeyPage</Text>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20
  },
  title: {
    fontSize: 20,
    color: '#fff'
  }
})