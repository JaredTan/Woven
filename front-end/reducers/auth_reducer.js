import {AUTH_USER, UNAUTH_USER} from '../actions';

const defaultState = {
  user_id: undefined,
  connectionId: undefined
};

const authReducer = (state=defaultState, action) => {
  switch(action.type) {
    case AUTH_USER:
      return {
        user_id: action.user_id,
        connectionId: action.connectionId
      };
    case UNAUTH_USER:
      return {
        user_id: undefined
      };
    default:
      return state;
  }
};

export default authReducer;
