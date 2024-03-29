/**
 * Created by guguyanhua on 12/11/15.
 */
import React, {Component} from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';
var TimerMixin = require('react-timer-mixin');

var CountDown = React.createClass({
  mixins: [TimerMixin],
  getInitialState: function () {
    return {
      time: this.props.time ? this.props.time : 60,
      disabled: true
    };
  },
  componentDidMount(){
    this._countdown();
  },
  render(){
    var style = [styles.text];
    var component;
    if (this.state.disabled) {
      style.push({color: 'gray'});
      style.push(this.props.disabledTextStyle);
      component =
          <View style={[styles.wrapper,this.props.buttonStyle]}>
            <TouchableWithoutFeedback>
              <View>
                <Text style={[style]}>{this.props.text}({this.state.time})</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
    } else {
      component =
          <TouchableHighlight
              style={[styles.touchableHighlight,this.props.buttonStyle]}
              onPress={this._onPress}
          >
            <Text style={[style,this.props.textStyle]}>{this.props.text}({this.state.time})</Text>
          </TouchableHighlight>
    }
    return (
        component
    )
  },
  _onPress(){
    if (this.state.disabled) {
      //nothing
    } else {
      this.setState({disabled: true});
      this._countdown();
      if (this.props.onPress) {
        this.props.onPress();
      }
    }
  },

  _countdown(){
    var timer = function () {
      var time = this.state.time - 1;
      this.setState({time: time});
      if (time > 0) {
        this.setTimeout(timer, 1000);
      } else {
        this.setState({disabled: false});
        this.setState({time: this.props.time ? this.props.time : 60});
      }
    };
    this.setTimeout(timer, 1000);
  }
});

var styles = StyleSheet.create({
  text: {
    color: 'black'
  },
  wrapper: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#ee735c'
  },
  touchableHighlight: {
    padding: 10,
    marginRight: 10,
    backgroundColor: '#ee735c'
  }
});

module.exports = CountDown;
