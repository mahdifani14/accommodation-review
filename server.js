'use strict';

require('./environment-check')();

// inert and vision required by hapi-swagger
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const _ = require('lodash');
const glob = require('glob');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const utils = require('./server/utils');
const Config = require('./server/config');
const logger = require('./server/logger');
const configureLogging = require('./server/plugins/logging-plugin');
const swaggerPluginConf = Config.get('/swagger');

// Create Server
const server = Hapi.server({
  host: Config.get('/host'),
  port: Config.get('/port/api')
});


server.register([configureLogging, Inert, Vision, swaggerPluginConf, HapiAuthJwt2])
  .then(() => {
    logger.server = server;

    logger.logInfo('Environment: ' + Config.get('/env'));

    require('./server/configure-hapi-auth-jwt')(server);
    require('./server/initialize-database')();

    // register routes
    logger.logDebug('Registering routes');

    _.each(glob.sync('./server/**/*-route.js'), (file) => {
      const route = require(file);
      logger.logDebug('Adding route: ' + route.method + '\t' + route.path);
      server.route(route);
    });

    server.start((err) => {
      if (err) {
        logger.logError(err);
      }
      logger.logInfo('Server running at: ' + server.info.uri);
    });
  })
  .catch((err) => {
    utils.logAndThrows(err, `Error: ${err}`)
  });