import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import NavigationBar from "./NavigationBar";


export default class ViewUtils {
  static getLeftButton(callBack) {
    return (
        <TouchableOpacity
            style={{padding: 8}}
            onPress={callBack}
        >
          <Image
              style={{width: 26, height: 26, tintColor: '#fff'}}
              source={require('./icon_tabbar_mine.png')}
          />
        </TouchableOpacity>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tips: {
    fontSize: 20
  }
})