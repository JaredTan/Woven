import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {USERS_URL} from '../api';
import {addAlert} from './alert_actions';
import {addSuccess} from './success_actions';


export const requestPair = (user_id) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(USERS_URL(username),{user_id}, {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(receivePair(response.data));
    }).catch((err) => {
      dispatch(addAlert("Couldn't obtain pair."));
    });
  });
};

export const updateUser = (user_id, firstName, lastName, imageUrl, birthday, anniversary) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.patch(USERS_URL(username), {user_id, firstName, lastName, imageUrl, birthday, anniversary}, {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(receiveUser(response.data));
      dispatch(addSuccess("Profile updated!"));
    }).catch((err) => {
      dispatch(addAlert("Couldn't update user."));
    });
  });
};

export const receiveUser = user => {
  return {
    type: "RECEIVE_USER",
    user
  };
};

export const resetPair = () => {
  return {
    type: "RESET_PAIR"
  };
};

export const receivePair = (users) => {
  return {
    type: "RECEIVE_PAIR",
    users
  };
};
