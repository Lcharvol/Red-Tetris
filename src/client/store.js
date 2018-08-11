import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { compose } from 'recompose';

import reducer from './reducers';
import { logger } from './middlewares';

const composeEnhancers =
typeof window === 'object' &&
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  }) : compose;

// const composeEnhancers = compose;

const configureStoreEnhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    // logger,
  ),
);

const configureStore = (initialState) =>
  createStore(
    reducer,
    configureStoreEnhancer,
  );

export default configureStore;