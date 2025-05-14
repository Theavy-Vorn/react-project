// import { legacy_createStore, applyMiddleware, compose } from 'redux';
// import { rootReducer } from '../reducers/rootReducer';
import { thunk } from "redux-thunk";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// export const centralStore = legacy_createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
// store.js or centralStore.js
import { legacy_createStore, applyMiddleware, compose } from 'redux';

import { rootReducer } from '../reducers/rootReducer';

const middleware = [thunk];

export const centralStore = legacy_createStore(
  rootReducer,
  compose(applyMiddleware(...middleware))
);
