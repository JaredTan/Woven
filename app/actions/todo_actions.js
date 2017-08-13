import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alert_actions';

exports.createTodo = (connectionId, text) => {
  return function(dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      var {username, password} = credentials;
      return axios.post(TODOS_URL(connectionId), {text}, {
        headers: {authorization: password}
      }).then((response) => {
        dispatch(addTodo(response.data.todo));
      }).catch((err) => {
        dispatch(addAlert("Couldn't create todo."));
      });
    });
  };
};

exports.deleteTodo = (connectionId, todoId) => {
  return function(dispatch) {
    return Keychain.getGenericPassword().then((credentials) => {
      var {username, password} = credentials;
      return axios.delete(TODO_URL(connectionId, todoId), {
        headers: {authorization: password}
      }).then((response) => {
        dispatch(removeTodo(todoId));
      }).catch((err) => {
        dispatch(addAlert("Couldn't delete todo."));
      });
    });
  };
};

exports.getTodos = (connectionId) => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(TODOS_URL(connectionId), {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(setTodos(response.data.todos));
    }).catch((err) => {
      dispatch(addAlert("Couldn't get todos."));
    });
  });
};

var addTodo = (newTodo) => {
  return {
    type: 'ADD_TODO',
    newTodo
  };
};

var removeTodo = (todoId) => {
  return {
    type: 'REMOVE_TODO',
    todoId
  };
};

export var setTodos = (todos) => {
  return {
    type: 'SET_TODOS',
    todos
  };
};
