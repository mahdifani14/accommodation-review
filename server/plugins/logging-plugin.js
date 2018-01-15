'use strict';

const Config = require('./../config');
const Good = require('good');

const options = {
    opsInterval: Config.get('/logging/opsInterval'),
    reporters: []
};

const events = Config.get('/logging/events');

const GoodConsole = require('good-console');
options.reporters.push({
    reporter: GoodConsole,
    events: events
});

module.exports = {
    register: Good,
    options: options
};
