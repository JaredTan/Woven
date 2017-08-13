import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {PLANT_URL} from '../api';
import {addAlert} from './alert_actions';

export const setPlant = plant => {
  console.log("$$$$$$$$$$$$$  PLANT  $$$$$$$$$$$$$$$$");
  console.log(plant);
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

// exports.updatePlant = (connectionId, plantObj) => {
//   return function(dispatch) {
//     return Keychain.getGenericPassword().then((credentials) => {
//       var {username, password} = credentials;
//       return axios.patch(PLANT_URL(connectionId), plantObj, {
//         headers: {authorization: password}
//       }).then((response) => {
//         dispatch(setPlant(response.data.plant));
//       }).catch((err) => {
//         dispatch(addAlert("Can't update plant"));
//       });
//     });
//   };
// };

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
