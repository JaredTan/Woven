const connectionReducer = (state = {}, action) => {
  switch(action.type) {
    case "RECEIVE_SINGLE_CONNECTION":
      return action.connection;
    default:
      return state;
  }
}

export default connectionReducer;
