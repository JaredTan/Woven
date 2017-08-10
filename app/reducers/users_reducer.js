const defaultState = {
  currentUser: undefined,
  partner: undefined
}

const userReducer = (state=defaultState, action) => {
  switch(action.type) {
    case 'RECEIVE_PAIR':
      return action.users;
    default:
      return state;
  }
}

export default userReducer;
