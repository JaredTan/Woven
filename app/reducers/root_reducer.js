import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import alertReducer from './alert_reducer';
import todosReducer from './todos_reducer';
import usersReducer from './users_reducer';
import connectionReducer from './connection_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alerts: alertReducer,
  todos: todosReducer,
  users: usersReducer,
  connection: connectionReducer
});

export default rootReducer;
