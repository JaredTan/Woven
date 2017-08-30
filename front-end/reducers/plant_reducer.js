import { SET_PLANT } from '../actions/plant_actions';

module.exports = (state={}, action) => {
  switch(action.type) {
    case SET_PLANT:
      return action.plant;

    default:
      return state;
  }
};
