/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

class Chat extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Chat component goes here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:200
  },
});

export default Chat;
