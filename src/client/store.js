import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { compose } from 'recompose';

import reducer from './reducers';

const logger = createLogger({
  collapsed: true,
});

// const composeEnhancers =
// typeof window === 'object' &&
// window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//   }) : compose;

const composeEnhancers = compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk,
    // logger,
  ),
);

const configureStore = (initialState) =>
  createStore(
    reducer,
    initialState,
    enhancer,
  );

export default configureStore;