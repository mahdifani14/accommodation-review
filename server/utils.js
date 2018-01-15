'use strict';

const logger = require('./logger');
const assert = require('assert');
const Boom = require('boom');
const _ = require('lodash');

exports.logAndThrows = message => {
    logger.logError(message);
    throw new Error(message);
};

module.exports.isNullOrUndefined = function(value) {
    return value === undefined || value === null;
};

/**
 * Assert that a value is neither null nor undefined.
 * @param {*} value
 * @param {String} name name of the missing value
 * @returns {boolean}
 */
module.exports.assertExists = function(value, name) {
    assert(!module.exports.isNullOrUndefined(value), `Missing value: ${name}`);
};

/**
 * Handle errors at route level.
 *
 * @param {Error|*} err
 * @param {Object} request Hapi `request` object
 * @param {Function} reply Hapi `reply()` function
 */
module.exports.handleRouteError = function(err, request, reply) {
    if (err) {
        if (err.isBoom) {
            return reply(err);
        } else if (err.isOperational && err.statusCode) {
            return reply(Boom.create(Number(err.statusCode), err.message));
        } else if (_.get(err, 'request.constructor.name') === 'ClientRequest') {
            // Axios -specific error
            const message = `Error calling external service: [${err.data.statusCode}] ${err.data.message}`;
            return reply(Boom.badImplementation(message, err));
        } else {
            const message = `Unexpected Error: ${err.message}`;
            logger.logError(message, request);
            return reply(Boom.badImplementation(message, err));
        }
    } else {
        const message = 'Unexpected Error';
        logger.logError(message, request);
        return reply(Boom.badImplementation(message));
    }
};
