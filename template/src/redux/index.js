import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';

const __DEV__ = process.env.NODE_ENV === 'development';
const __ALLOW_DEVTOOLS__ = process.env.ENABLE_REDUX_DEVTOOLS;
const __DEVTOOL__ =
  window.__REDUX_DEVTOOLS_EXTENSION__ && (__ALLOW_DEVTOOLS__ || __DEV__);

const store = __DEVTOOL__
  ? createStore(
      reducers,
      compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__(),
      ),
    )
  : createStore(reducers, compose(applyMiddleware(thunkMiddleware)));

if (__DEV__ && module.hot) {
  module.hot.accept('./reducers', () => {
    // eslint-disable-next-line global-require
    const newRootReducer = require('./reducers').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
