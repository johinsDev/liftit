import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import reducer from './reducers';

const store = createStore(
  reducer,
  applyMiddleware(
    logger,
    thunk,
    promiseMiddleware()
  )
);

export default store;

  