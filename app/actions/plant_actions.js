import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {PLANT_URL} from '../api';
import {addAlert} from './alert_actions';

var setPlant = plant => {
  return {
    type: 'SET_PLANT',
    plant
  };
};

exports.fetchPlant = connectionId => function(dispatch) {
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

exports.updatePlant = (connectionId, condition) => function(dispatch) {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(PLANT_URL(connectionId), {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(setPlant(response.data.plant));
    }).catch((err) => {
      dispatch(addAlert("Can't change name for now"));
    });
  });
};
