import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View
} from 'react-native';

import AuthMain from './auth/auth_main';
import MainNavigator from './main/main_navigator';
import AlertContainer from './alerts/alert_container';
import SuccessContainer from './successes/success_container';
import Chat from './chat/chat';
import {fetchPlant} from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const renderMainView = () => {
      if (this.props.userId) {
        return (
          <MainNavigator/>
        );
      } else {
        return (
          <AuthMain />
        );
      }
    };
    return (
      <View style={{flex: 1}}>
        {renderMainView()}
        <AlertContainer/>
        <SuccessContainer/>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#ccc'
  },
});

const mapStateToProps = (state) => {
  return {
    userId: state.auth.user_id,
    connectionId: state.auth.connectionId
  };
};

export default connect(mapStateToProps)(App);
