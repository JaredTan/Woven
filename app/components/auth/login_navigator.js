import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';
import SignUpNavigator from './signup_navigator';
import Header from '../styling/header';
import Link from '../styling/link';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

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
    })
  },

  render() {
    return (
      <View style={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={this.handleBack}>
            <Icon name="chevron-left" size={22} color="white"/>
          </TouchableOpacity>
        </View>
        <LogIn style={styles.logIn} />
        <TouchableOpacity onPress={this.redirectToSignUp} style={styles.signUp}>
          <Link><Text>Sign Up</Text></Link>
        </TouchableOpacity>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  logIn: {
    flex: 1,
  },
  signUp: {
    flex: 1
  },
});


module.exports = LogInNavigator;
