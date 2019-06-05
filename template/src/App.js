import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import ErrorBoundary from './pages/ErrorBoundary';
import routes from './routes';

import './app.css';

const __DEV__ = process.env.NODE_ENV === 'development';

const App = () => (
  <ErrorBoundary>
    <BrowserRouter>
      <Switch>
        {routes.map(({ id, componentToRender: RouteComponent, ...rest }) => (
          <Route
            key={id}
            {...rest}
            render={routeProps => <RouteComponent {...routeProps} />}
          />
        ))}
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

const HotApp = __DEV__
  ? (() => {
      // eslint-disable-next-line global-require
      const { hot } = require('react-hot-loader');
      return hot(module)(App);
    })()
  : App;

export default HotApp;
