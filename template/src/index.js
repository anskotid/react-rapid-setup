import React from 'react';
import { render } from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';

import App from './App';

import store from './redux';

const __DEV__ = process.env.NODE_ENV === 'development';
const root = document.getElementById('root');

if (!root) {
  throw new Error('"root" not found!');
}

const renderApp = AppComp => {
  render(
    <ReduxProvider store={store}>
      <AppComp />
    </ReduxProvider>,
    root,
  );
};

renderApp(App);

if (__DEV__ && module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./App').default;
    renderApp(NextApp);
  });
}
