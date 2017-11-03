import React from 'react';
import SignUpNavigator from './signup_navigator';
import Link from '../styling/link';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import LogIn from './login';

class LogInNavigator extends React.Component {
  constructor(props) {
    super(props);

    this.handleBack = this.handleBack.bind(this);
    this.redirectToSignUp = this.redirectToSignUp.bind(this);
  }

  handleBack() {
    this.props.navigator.pop();
  }

  redirectToSignUp() {
    this.props.navigator.push({
      component: SignUpNavigator,
      title: 'Sign Up Navigator',
      navigationBarHidden: true
    });
  }

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
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  logIn: {
    flex: 8
  },
  signUp: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1
  },
});

export default LogInNavigator;
