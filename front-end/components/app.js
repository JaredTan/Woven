import React from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';
import AuthMain from './auth/auth_main';
import MainNavigator from './main/main_navigator';
import AlertsContainer from './alerts/alerts_container';
import SuccessesContainer from './successes/successes_container';
import Chat from './chat/chat';
import {fetchPlant} from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const renderMainView = () => {
      if (this.props.user_id) {
        return (
          <MainNavigator
            fetchPlant={this.props.fetchPlant}
            connectionId={this.props.connectionId} />
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
        <AlertsContainer/>
        <SuccessesContainer/>
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
    user_id: state.auth.user_id,
    connectionId: state.auth.connectionId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchPlant: (connectionId) => dispatch(fetchPlant(connectionId))
  }
}

export default connect(mapStateToProps)(App);
