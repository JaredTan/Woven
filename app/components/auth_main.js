import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import LogIn from './login';
import SignUp from './signup';

var AuthMain = React.createClass({
  render() {
    return (
      <View style={{flex: 1}}>

    
        <SignUp />

      </View>
    );
  }
});

module.exports = AuthMain;
