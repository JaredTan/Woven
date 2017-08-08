import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import alertReducer from './alert_reducer';
import todosReducer from './todos_reducer';

module.exports = combineReducers({
  form: formReducer,
  auth: authReducer,
  alerts: alertReducer,
  todos: todosReducer
})
