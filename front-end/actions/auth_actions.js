import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {SIGNIN_URL, SIGNUP_URL} from '../api';
import {addAlert} from './alert_actions';
import {requestPair} from './user_actions';
import {fetchPlant} from './plant_actions';
import {addSuccess} from './success_actions';

export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';

export const loginUser = (email, password) => {
  return function(dispatch) {
    return axios.post(SIGNIN_URL, {email, password}).then((response) => {
      var {user_id, token, connectionId} = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function() {
          dispatch(fetchPlant(connectionId)).then(() => {
            dispatch(authUser(user_id, connectionId));
            dispatch(requestPair(user_id));
          });
        }).catch((error) => {
          dispatch(addAlert("Could not log in."));
        });
    }).catch((error) => {
      dispatch(addAlert("Could not log in. Invalid username / password, or your partner has not connected yet."));
    });
  };
};

export const signupUser = (email, password, firstName, lastName, partnerEmail) => {
  return function(dispatch) {
    return axios.post(SIGNUP_URL, {email, password, firstName, lastName, partnerEmail}).then((response) => {
      var {user_id, token} = response.data;
      Keychain.setGenericPassword(user_id, token)
        .then(function() {
          dispatch(addSuccess("Thanks for signing up! You may login once both partners have connected."));
        });
    }).catch((error) => {
      dispatch(addAlert("Could not sign up: E-mail already taken or your partner is connected with someone else."));
    });
  };
};

const authUser = (user_id, connectionId) => {
  return {
    type: 'AUTH_USER',
    user_id,
    connectionId
  };
};

export const unauthUser = {
  type: 'UNAUTH_USER'
};
