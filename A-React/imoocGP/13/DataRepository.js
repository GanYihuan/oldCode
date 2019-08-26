import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class DataRepository extends Component {
  fetchNetRepository(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
          .then(response => response.json())
          .then(result => {
            resolve(result)
          })
          .catch(err => {
            resolve(err)
          })
    })
  }
}

