import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import Main from './main';


var MainNavigator = React.createClass({
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Main,
          title: 'Main',
          navigationBarHidden: true
        }}
        style={{flex: 1}}/>
    );
  }
});

module.exports = MainNavigator;
