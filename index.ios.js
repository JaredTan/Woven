import App from './front-end/components/app';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './front-end/store';
import { AppRegistry } from 'react-native';

export default class Woven extends React.Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <App/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('Woven', () => Woven);
