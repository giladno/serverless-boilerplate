'use strict';

module.exports.app = require('serverless-http')(require('./app'), {callbackWaitsForEmptyEventLoop: false});
