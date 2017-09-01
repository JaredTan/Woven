import React from 'react';
import SignUpNavigator from './signup_navigator';
import Header from '../styling/header';
import Link from '../styling/link';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS,
  Image
} from 'react-native';
import Dimensions from 'Dimensions';

import LogIn from './login';

var LogInNavigator = React.createClass({

  handleBack() {
    this.props.navigator.pop();
  },

  redirectToSignUp() {
    this.props.navigator.push({
      component: SignUpNavigator,
      title: 'Sign Up Navigator',
      navigationBarHidden: true
    });
  },

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.logIn}>
          <LogIn/>
        </View>
        <View style={styles.signUp}>
          <TouchableOpacity onPress={this.redirectToSignUp}>
            <Link><Text>Sign Up</Text></Link>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  logIn: {
    flex: 9
  },
  signUp: {
    flex: 1
  },
});


module.exports = LogInNavigator;
