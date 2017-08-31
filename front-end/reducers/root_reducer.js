import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './auth_reducer';
import alertsReducer from './alerts_reducer';
import todosReducer from './todos_reducer';
import plantReducer from './plant_reducer';
import usersReducer from './users_reducer';
import successesReducer from './successes_reducer';

const rootReducer = combineReducers({
  form: formReducer,
  auth: authReducer,
  alerts: alertsReducer,
  todos: todosReducer,
  plant: plantReducer,
  users: usersReducer,
  successes: successesReducer
});

export default rootReducer;
