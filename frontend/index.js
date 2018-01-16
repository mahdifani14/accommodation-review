const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: path.join(__dirname, '.development_env')});
}

checkEnvVariables();

// Ignore css and image files in babel
const noop = () => {
};

require.extensions['.css'] = noop();
require.extensions['.scss'] = noop();

// Babel polyfill to convert ES6 code in runtime
require('babel-register');
require('babel-polyfill');

// CSS modules hook to inject css-modules classes in the final html.
const sass = require('node-sass')
require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]__[hash:base64:5]',
  devMode: true,
  extensions: ['.scss', '.css']
});

require('./server/server');

function checkEnvVariables() {
  const required = [
    'API_BASE_URL',
    'AUTH0_DOMAIN'
  ];

  required.forEach(function (key) {
    if (typeof process.env[key] === 'undefined') {
      throw new Error('missing ENV variable ' + '"' + key + '"')
    }
  });
}
