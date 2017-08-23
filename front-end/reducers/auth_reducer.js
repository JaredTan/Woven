var defaultState = {
  user_id: undefined,
  connectionId: undefined
}

module.exports = (state=defaultState, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return {
        user_id: action.user_id,
        connectionId: action.connectionId
      }

    case 'UNAUTH_USER':
      return {
        user_id: undefined
      };

    default:
      return state;
  }
}
