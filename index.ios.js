import App from './front-end/components/app';
import React, { Component } from 'react';
import {Provider, connect} from 'react-redux';
import configureStore from './front-end/store';
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
