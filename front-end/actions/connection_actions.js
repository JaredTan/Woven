import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {CONNECTION_URL} from '../api';
import {addAlert} from './alert_actions';

export const requestConnection = (connectionId) => dispatch => {
    return axios.get(CONNECTION_URL(connectionId))
    .then((response) => {
      dispatch(receiveConnection(response.data));
    })
    .catch((err) => {
      dispatch(addAlert("Couldn't obtain connection."));
      })
    }


export const receiveConnection = (connection) => {
  return {
    type: "RECEIVE_CONNECTION",
    connection
  }
};
