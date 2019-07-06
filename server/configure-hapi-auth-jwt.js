'use strict';

/*
 * Configure JWT authentication
 */

const _ = require('lodash');
const logger = require('./logger');

const member = { // our "users database"
  14: {
		id: 14,
		name: 'Mahdi',
		user_type: 'user'
	}
};

const validate = (decoded, request) => {

	// check if the person is valid
	if (!decoded || !decoded.id || !member[decoded.id]) {
		logger.logWarn('User is not authenticated', request);
		throw new Error(`User is not authenticated ${decoded}`);
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

	return {isValid: true, credentials};
};

module.exports = (server) => {
	server.auth.strategy('jwt', 'jwt',
		{
			key: 'secret',
			validate: validate,
			verifyOptions: {algorithms: ['HS256']}
		});
};
