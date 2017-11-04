import {SET_PLANT} from '../actions/plant_actions';

const plantReducer = (state = {}, action) => {
  switch(action.type) {
    case SET_PLANT:
      return action.plant;
    default:
      return state;
  }
};

export default plantReducer;
