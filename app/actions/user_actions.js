import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {USERS_URL} from '../api';
import {addAlert} from './alert_actions';


export const requestPair = (user_id) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(USERS_URL(username),{user_id}, {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(receivePair(response.data));
    }).catch((err) => {
      dispatch(addAlert("Couldn't obtain pair."));
    })
  })
};

export const updateUser = (user_id, firstName, lastName, navigator) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.patch(USERS_URL(username), {user_id, firstName, lastName}, {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(addAlert("Profile updated!"));
      dispatch(receiveUser(response.data));
    }).then(() => {
      navigator.pop();
    }).catch((err) => {
      dispatch(addAlert("Couldn't update user."));
    })
  })
};

export const receiveUser = user => {
  return {
    type: "RECEIVE_USER",
    user
  }
};

export const receivePair = (users) => {
  return {
    type: "RECEIVE_PAIR",
    users
  }
};
