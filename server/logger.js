'use strict';

/**
 * @module logger
 */

/**
 * @enum {string}
 */
const LOG_LEVEL = module.exports.LOG_LEVEL = {
    DEBUG: 'debug',
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error'
};

const fallbackLogger = {
    log: (tags, msg) => {
        if (tags.indexOf('error') > -1) {
            console.error(msg);
        }
        else {
            console.log(msg);
        }
    }
};

// will be initialized at Hapi server startup!
module.exports.server = fallbackLogger;

function doLog(type, message, request, fallback) {
    let requestOrServer = null;
    
    if (request) {
        requestOrServer = request;
    }
    else if (module.exports.server) {
        requestOrServer = module.exports.server;
    }
    
    if (requestOrServer) {
        requestOrServer.log([type], message);
    }
    else {
        fallback(`[${type}] ${message}`);
    }
}

/**
 * Log a message using 'debug' tag, optionally logging the request.
 * @param message
 * @param [request]
 */
module.exports.logDebug = function(message, request) {
    doLog(LOG_LEVEL.DEBUG, message, request, console.log);
};

/**
 * Log a message using 'info' tag, optionally logging the request.
 * @param message
 * @param [request]
 */
module.exports.logInfo = function(message, request) {
    doLog(LOG_LEVEL.INFO, message, request, console.info);
};

/**
 * Log a message using 'warn' tag, optionally logging the request.
 * @param message
 * @param [request]
 */
module.exports.logWarn = function(message, request) {
    doLog(LOG_LEVEL.WARN, message, request, console.warn);
};

/**
 * Log a message using 'error' tag, optionally logging the request.
 * @param message
 * @param [request]
 */
module.exports.logError = function(message, request) {
    doLog(LOG_LEVEL.ERROR, message, request, console.error);
};
