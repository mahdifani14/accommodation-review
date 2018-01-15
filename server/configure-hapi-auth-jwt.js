'use strict';

/*
 * Configure JWT authentication
 */

const _ = require('lodash');
const logger = require('./logger');

const member = { // our "users database"
    14: {
        id: 14,
        name: 'Mahdi Fani-Disfani',
        user_type: 'admin'
    }
};

const validate = (decoded, request, callback) => {

    // check if the person is valid
    if (!decoded || !decoded.id || !member[decoded.id]) {
        logger.logWarn('User is not authenticated', request);
        return callback(null, false, decoded);
    }

    // copy all properties from token
    const credentials = _.cloneDeep(decoded);

    if (credentials.user_type) {
        _.defaults(credentials, {
            scope: credentials.user_type
        });
    } else {
        logger.logWarn('User has no valid scope, credentials = ' + JSON.stringify(credentials), request);
    }

    return callback(null, true, credentials);
};

module.exports = (server) => {

    server.auth.strategy('jwt', 'jwt',
        { key: 'secret',
            validateFunc: validate,
            verifyOptions: { algorithms: ['HS256'] }
        });
};
