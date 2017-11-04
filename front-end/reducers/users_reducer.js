import merge from 'lodash/merge';
import {RECEIVE_PAIR, RECEIVE_USER, RESET_PAIR} from '../actions';

const defaultState = {
  currentUser: undefined,
  partner: undefined
};

const userReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_PAIR:
      return action.users;
    case RECEIVE_USER:
      return merge({}, state, {currentUser: action.user});
    case RESET_PAIR:
      return defaultState;
    default:
      return state;
  }
};

export default userReducer;
