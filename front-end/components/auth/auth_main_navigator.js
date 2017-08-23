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
import LogIn from './login';
import Header from '../styling/header';


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
        <View style={styles.topBar}>
          <Text style={styles.title}>Woven</Text>
        </View>
        <View style={styles.container}>
          <LogIn/>
  
        </View>
      </View>
    );
  }
});


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 150,
    alignItems: 'center'
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  login: {
    fontWeight: 'bold',
    color: '#208e4e',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 50,
    fontSize: 24,
  },
  signup: {
    fontWeight: 'bold',
    color: '#208e4e',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 50,
    fontSize: 24,
  }
};

module.exports = AuthMainNavigator;
