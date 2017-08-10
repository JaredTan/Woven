import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import AuthMain from './auth/auth_main';
import MainNavigator from './main_navigator';
import AlertContainer from './alerts/alert_container';

var App = React.createClass({
  getInitialState() {
    return {}
  },
  render() {
    var renderMainView = () => {
      if (this.props.user_id) {
        return (
          <MainNavigator />
        );
      } else {
        return (
          <AuthMain />
        );
      }
    }
    return (
      <View style={{flex: 1}}>
        {renderMainView()}
        <AlertContainer/>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ccc'
  },
});

var mapStateToProps = (state) => {
  return {
    user_id: state.auth.user_id
  }
}

module.exports = connect(mapStateToProps)(App);
