

module.exports = (state=null, action) => {
  switch(action.type) {
    case 'RECEIVE_SINGLE_USER':
      return action.user;
    default:
      return state;
  }
}
