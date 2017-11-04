import uuid from 'uuid';
import {ADD_SUCCESS, REMOVE_SUCCESS} from '../actions';

const successesReducer = (state=[], action) => {
  switch(action.type) {
    case ADD_SUCCESS:
      return [
        ...state,
        {
          text: action.text,
          id: uuid.v4()
        }
      ];
    case REMOVE_SUCCESS:
      return state.filter((success) => {
        if (success.id === action.id) {
          return false;
        } else {
          return true;
        }
      });
    default:
      return state;
  }
};

export default successesReducer;
