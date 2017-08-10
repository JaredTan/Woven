import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {USERS_URL} from '../api';
import {addAlert} from './alert_actions';


export const requestSingleUser = (user_id) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(USERS_URL(username),{user_id}, {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(receiveSingleUser(response.data));
    }).catch((err) => {
      dispatch(addAlert("Couldn't obtain user."));
    })
  })
}

export const receiveSingleUser = (user) => {
  return {
    type: "RECEIVE_SINGLE_USER",
    user
  }
};
