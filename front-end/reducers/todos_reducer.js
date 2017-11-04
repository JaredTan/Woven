import {ADD_TODO, SET_TODOS, REMOVE_TODO, RESET_TODOS} from '../actions';

const todosReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [
        ...state,
        action.newTodo
      ];
    case SET_TODOS:
      return action.todos;
    case REMOVE_TODO:
      return state.filter((todo) => {
        if (todo._id === action.todoId) {
          return false;
        } else {
          return true;
        }
      });
    case RESET_TODOS:
      return [];
    default:
      return state;
  }
};

export default todosReducer;
