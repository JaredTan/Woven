import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {CONNECTION_URL} from '../api';
import {addAlert} from './alert_actions';
//

// export const requestSingleConnection = (connection_id) => dispatch => {
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

export const requestSingleConnection = (connection_id) => dispatch => {
    return axios.get(CONNECTION_URL(), {connection_id})
    .then((response) => {
      dispatch(receiveSingleConnection(response.data));
    })
    .catch((err) => {
      dispatch(addAlert("Couldn't obtain connection."));
      })
    })
  }


export const receiveSingleConnection = (connection) => {
  return {
    type: "RECEIVE_SINGLE_CONNECTION",
    connection
  }
};
