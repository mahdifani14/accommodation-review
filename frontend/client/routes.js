/* eslint-disable global-require */
import React from 'react';
import { Route } from 'react-router';
import App from './modules/App/App';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

export default (
  <Route path="/" component={App}>
    <Route
      path="reviews"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(
            null,
            require('./modules/Reviews/ReviewsListPage').default
          );
        });
      }}
    />
  </Route>
);
