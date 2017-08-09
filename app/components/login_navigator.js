import React from 'react';
import Icon from 'react-native-vector-icons/Octicons';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  NavigatorIOS
} from 'react-native';

import LogIn from './login';

var LogInNavigator = React.createClass({

  handleBack() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={{flex: 1}}>
      <View style={styles.topBar}>
        <TouchableOpacity onPress={this.handleBack}>
          <Icon name="chevron-left" size={30} color="white"/>
        </TouchableOpacity>
      </View>
      <LogIn/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  topBar: {
    padding: 16,
    paddingTop: 28,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2ecc71'
  },
  title: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center'
  },
  todoContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: -1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});


module.exports = LogInNavigator;
