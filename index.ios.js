import App from './app/components/app';
import React, { Component } from 'react';
import {Provider, connect} from 'react-redux';
import {configureStore} from './app/store'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Woven extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Woven', () => Woven);
