module.exports = (state=[], action) => {
  switch(action.type) {
    case 'SET_PLANT':
      return action.todos;

    default:
      return state;
  }
};
