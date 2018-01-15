'use strict';

const path = require('path');

module.exports = () => {

    const env = process.env.NODE_ENV || 'local';

    if (!env) {
        throw new Error('Please specify an environment.');
    }

    switch (env) {
        case 'local':
            require('dotenv').config({path: path.join(__dirname, '.local_env')});
            break;
        case 'development':
        case 'qa':
        case 'production':
            envCheck();
            break;
        default:
            throw new Error('Please specify a valid environment.');
    }

};

const envCheck = () => {
    const required = [
        'MONGODB_URL',
        'MONGODB_NAME',
        'AUTH0_DOMAIN',
        'LOG_DEBUG_ENABLED'
    ];

    required.forEach(key => {
        if (typeof process.env[key] === 'undefined') {
            throw new Error('missing ENV variable ' + '"' + key + '"');
        }
    });
};

