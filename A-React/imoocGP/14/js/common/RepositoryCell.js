/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';


export default class RepositoryCell extends Component {
  render() {
    return (
        <TouchableOpacity style={[styles.container, styles.cell_container]}>
          <View style={{margin: 10}}>
            <Text style={styles.title}>{this.props.data.full_name}</Text>
            <Text style={styles.description}>{this.props.data.description}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Author:</Text>
                <Image
                    style={{height: 22, width: 22}}
                    source={{uri: this.props.data.owner.avatar_url}}
                />
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text>Stars:</Text>
                <Text>{this.props.data.stargazers_count}</Text>
              </View>
              <Image
                  style={{width: 22, height: 22}}
                  source={require('../../res/images/icon_tabbar_mine_selected.png')}
              />
            </View>
          </View>
        </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 14,
    marginBottom: 2,
    color: '#212121'
  },
  description: {
    fontSize: 14,
    marginBottom: 2,
    color: '#757575',
    borderRadius: 2
  },
  cell_container: {
    backgroundColor: '#fff',
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginVertical: 4,
    borderWidth: 0.5,
    shadowColor: '#ccc',
    shadowOpacity: 0.4,
    shadowRadius: 1,
    shadowOffset: {width: 0.5, height: 0.5}
  }
});

