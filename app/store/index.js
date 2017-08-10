import thunk from 'redux-thunk';
import {createStore, compose, applyMiddleware} from 'redux';
import {AsyncStorage} from 'react-native';
import {persistStore, autoRehydrate} from 'redux-persist';
import rootReducer from '../reducers/root_reducer';

var defaultState = {};

exports.configureStore = (initialState=defaultState) => {
  var store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunk),
    autoRehydrate()
  ));
  persistStore(store, {storage: AsyncStorage});
  return store;
}
