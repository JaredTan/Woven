module.exports = (state={}, action) => {
  switch(action.type) {
    case 'SET_PLANT':
      return action.plant;

    default:
      return state;
  }
};
