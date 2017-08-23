import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import alertReducer from './alert_reducer';
import todosReducer from './todos_reducer';
import plantReducer from './plant_reducer';
import usersReducer from './users_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alerts: alertReducer,
  todos: todosReducer,
  plant: plantReducer,
  users: usersReducer
});

export default rootReducer;
