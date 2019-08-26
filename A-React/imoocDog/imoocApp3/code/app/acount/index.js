import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';


export default class Account extends Component {
  constructor() {
    super();
    this.state = {
      selectedTab: 'list',
      notifCount: 0,
      presses: 0,
      logined: false,
      user: null,
      selectTab: 'list'
    }
  }

  render() {
    // const {navigate} = this.props.navigation;
    // // begin enter main.index
    // if (!this.state.logined) {
    //   // Receive [data.data] from the lower level
    //   // return <Login afterLogin={this._afterLogin.bind(this)}/>
    //   navigate('Login');
    // }

    return (
        <View style={styles.container}>
          <Text>Account</Text>
          <Button
              style={styles.btn}
              onPress={this._logout.bind(this)}
          >
            Logout
          </Button>
        </View>
    )
  }

  _logout() {
    const {navigate} = this.props.navigation
    navigate('Login');
    // this.props.logout();
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btn: {
    marginTop: 30,
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: '#ee753c',
    borderWidth: 1,
    borderRadius: 4,
    color: '#ee753c',
    marginLeft: 10,
    marginRight: 10
  }
});

