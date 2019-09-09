import { createStore, compose, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootReducer, { rootSaga } from "modules";

const getInitialState = () => {
  let { isLoggedIn, profile } = localStorage.state
    ? JSON.parse(localStorage.state)
    : { isLoggedIn: false, profile: {} };

  if (profile === undefined) profile = {};
  if (isLoggedIn === undefined) isLoggedIn = false;

  return { isLoggedIn, profile };
};

const createAppStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    { auth: { ...getInitialState() } },
    compose(
      applyMiddleware(sagaMiddleware),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop
    )
  );

  sagaMiddleware.run(rootSaga);
  
  return store;
};

export default createAppStore;
