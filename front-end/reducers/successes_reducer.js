import uuid from 'uuid';

var defaultState = [];

module.exports = (state=defaultState, action) => {
  switch(action.type) {
    case 'ADD_SUCCESS':
      return [
        ...state,
        {
          text: action.text,
          id: uuid.v4()
        }
      ];

    case 'REMOVE_SUCCESS':
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
}
