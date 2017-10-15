import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';
import LogInNavigator from './login_navigator';

class AuthMain extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: LogInNavigator,
          title: 'Sign Up',
          navigationBarHidden: true
        }}
        style={{flex: 1}}/>
    );
  };

}

export default AuthMain;
