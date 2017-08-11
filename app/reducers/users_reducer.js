import merge from 'lodash/merge';


const defaultState = {
  currentUser: undefined,
  partner: undefined
}

const userReducer = (state=defaultState, action) => {
  Object.freeze(state);
  switch(action.type) {
    case 'RECEIVE_PAIR':
      return action.users;
    case 'RECEIVE_USER':
    console.log(merge({}, state, {currentUser: action.user}),'user?');
      return merge({}, state, {currentUser: action.user})
    default:
      return state;
  }
}

export default userReducer;
