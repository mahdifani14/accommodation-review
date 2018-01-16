import Express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import path from 'path';

import build from '../client/api/build';

// Webpack Requirements
import webpack from 'webpack';
import config from '../webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

// Initialize the Express App
const app = new Express();

// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
  app.use(webpackHotMiddleware(compiler));
  app.use(require('morgan')('dev'));
}

// React And Redux Setup
import {configureStore} from '../client/store';
import {Provider} from 'react-redux';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import Helmet from 'react-helmet';

// Import required modules
import routes from '../client/routes';
import {fetchComponentData} from './util/fetchData';
import serverConfig from './config';

// Material-ui theme injector
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import muiTheme from '../client/muiTheme.js';

// Apply body Parser and server public assets and routes
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({limit: '20mb', extended: false}));
app.use(Express.static(path.resolve(__dirname, '../dist')));

// Render Initial HTML
const renderFullPage = (html, initialState) => {
  const head = Helmet.rewind();

  const env = JSON.stringify({
    API_BASE_URL: process.env.API_BASE_URL,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
  });

  return `
    <!doctype html>
    <html>
      <head>
        <title>Accommodation Reviews</title>
      </head>
      <body>
        <div id="root" class="">${html}</div>
        <script>
            window.__ENV__ = ${env}
        </script>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
        </script>
        <script src='/vendor.js'></script>
        <script src='/app.js'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  const softTab = '&#32;&#32;&#32;&#32;';
  const errTrace = `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>`;
  return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  match({routes, location: req.url}, (err, redirectLocation, renderProps) => {
    if (err) {
      return res.status(500).end(renderError(err));
    }

    if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    if (!renderProps) {
      return next();
    }

    const enhancedMuiTheme = getMuiTheme(
      muiTheme, {
        userAgent: req.headers['user-agent'],
      }
    );

    const api = build();
    const store = configureStore(api);

    return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        const initialView = renderToString(
          <Provider store={store}>
            <MuiThemeProvider muiTheme={enhancedMuiTheme}>
              <RouterContext {...renderProps} />
            </MuiThemeProvider>
          </Provider>
        );
        const finalState = store.getState();

        res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Frontend is running on port: ${serverConfig.port}`); // eslint-disable-line
  }
});

export default app;
