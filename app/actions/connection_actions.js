import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {CONNECTION_URL} from '../api';
import {addAlert} from './alert_actions';
//

// export const requestConnection = (connection_id) => dispatch => {
//   return Keychain.getGenericPassword().then((credentials) => {
//     var {username, password} = credentials;
//     return axios.get(CONNECTION_URL(username), {connection_id}, {
//       headers: {authorization: password}
//     }).then((response) => {
//       dispatch(receiveSingleUser(response.data));
//     }).catch((err) => {
//       dispatch(addAlert("Couldn't obtain user."));
//     })
//   })
// }

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
