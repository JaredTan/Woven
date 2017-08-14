import { SET_PLANT } from '../actions/plant_actions';

module.exports = (state={}, action) => {
  switch(action.type) {
    case SET_PLANT:
      console.log('I AM THE NEW PLANT: ', action.plant);
      return action.plant;

    default:
      return state;
  }
};
