import axios from 'axios';
import * as Keychain from 'react-native-keychain';

import {TODOS_URL, TODO_URL} from '../api';
import {addAlert} from './alert_actions';


exports.getTodos = function(dispatch) {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(TODOS_URL(username), {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(setTodos(response.data.todos));
    }).catch((err) => {
      dispatch(addAlert("Couldn't get todos."));
    })
  })
}

export const requestSingleUser = userId => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(USERS_URL(username), {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(receiveSingleUser(response.data.user));
    }).catch((err) => {
      dispatch(addAlert("Couldn't obtain user."));
    })
  })
}

export const updateUser = userId => dispatch => {
  return Keychain.getGenericPassword().then((credentials) => {
    var {username, password} = credentials;
    return axios.get(USERS_URL(username), {
      headers: {authorization: password}
    }).then((response) => {
      dispatch(receiveSingleUser(response.data.user));
    }).catch((err) => {
      dispatch(addAlert("Couldn't obtain user."));
    })
  })
}

export const receiveSingleUser = (user) => {
  return {
    type: RECEIVE_SINGLE_USER,
    user
  }
};

export const requestSingleUser = id => (dispatch) => {
  return APIUtil.fetchSingleUser(id).then(
    user => dispatch(receiveSingleUser(user))
  );
};

export const updateUser = (user, id) => (dispatch) => {

  return APIUtil.updateUser(user, id).then(user => {
    dispatch(receiveSingleUser(user));
    dispatch(resetUserErrors());
    return user;
  }).fail(err => dispatch(receiveUserErrors(err.responseJSON)))
};


var addTodo = (newTodo) => {
  return {
    type: 'ADD_TODO',
    newTodo
  }
}

var removeTodo = (todo_id) => {
  return {
    type: 'REMOVE_TODO',
    todo_id
  }
}

export var setTodos = (todos) => {
  return {
    type: 'SET_TODOS',
    todos
  }
}
