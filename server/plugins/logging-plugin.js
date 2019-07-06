'use strict';

const Good = require('@hapi/good');

const Config = require('./../config');
const events = Config.get('/logging/events');

const options = {
  ops: {
    interval: Config.get('/logging/opsInterval')
  },
  reporters: {
    reporter: [
      {
        module: '@hapi/good-squeeze',
        name: 'Squeeze',
        args: [events]
      },
      {
        module: '@hapi/good-console'
      },
      'stdout'
    ]
  }
};

module.exports = {
    plugin: Good,
    options
};
