/**
 * Main store function
 */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from './modules/App/components/DevTools';
import rootReducer from './reducers';
import { Map } from 'immutable';

export function configureStore(api, initialState = Map()) { // eslint-disable-line
  // Middleware and store enhancers
  const enhancers = [
    applyMiddleware(thunk.withExtraArgument(api)),
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    // Enable DevTools only when rendering on client and during development.
    enhancers.push(window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument());
  }

  return createStore(rootReducer, initialState, compose(...enhancers));
}
