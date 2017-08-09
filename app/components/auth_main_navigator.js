import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import SignUpNavigator from './signup_navigator';
import LogInNavigator from './login_navigator';


var AuthMainNavigator = React.createClass({

  redirectToLogin() {
    this.props.navigator.push({
      component: LogInNavigator,
      title: 'Log In Navigator',
      navigationBarHidden: true
    })
  },

  redirectToSignUp() {
    this.props.navigator.push({
      component: SignUpNavigator,
      title: 'Sign Up Navigator',
      navigationBarHidden: true
    })
  },

  render() {
    return (
      <View>
        <TouchableOpacity onPress={this.redirectToSignUp}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.redirectToLogin}>
          <Text>Log In</Text>
        </TouchableOpacity>
      </View>
    );
  }
});

module.exports = AuthMainNavigator;
