import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import AuthMainNavigator from './auth_main_navigator';


var AuthMain = React.createClass({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: AuthMainNavigator,
          title: 'Sign Up',
          navigationBarHidden: true
        }}
        style={{flex: 1}}/>
    );
  }
});

module.exports = AuthMain;
