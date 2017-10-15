import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import {PLANT_URL} from '../api';
import {addAlert} from './alert_actions';

export const SET_PLANT = 'SET_PLANT';

export const setPlant = plant => {
  return {
    type: SET_PLANT,
    plant
  };
};

export const fetchPlant = connectionId => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(PLANT_URL(connectionId), {
      headers: {authorization:password}
    }).then((response) => {
      dispatch(setPlant(response.data.plant));
    }).catch((err) => {
      dispatch(addAlert("Plant is hiding"));
    });
  });
};

export const updatePlant = (connectionId, plantObj) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.patch(PLANT_URL(connectionId), {connectionId, plantObj}, {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(setPlant(response.data.plant));
    }).catch((err) => {
      dispatch(addAlert("Couldn't update plant"));
    });
  });
};
