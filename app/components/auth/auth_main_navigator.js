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
        <View style={styles.topBar}>
          <Text style={styles.title}>Woven</Text>
        </View>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.redirectToSignUp}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.redirectToLogin}>
            <Text style={styles.login}>Log In</Text>
          </TouchableOpacity>
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
    color: 'black',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 50,
    fontSize: 24,
  },
  signup: {
    color: 'black',
    borderStyle: 'solid',
    borderColor: 'black',
    padding: 50,
    fontSize: 24,
  }
};

module.exports = AuthMainNavigator;
