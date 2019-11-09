'use strict';

const redis = require('redis');
const bluebird = require('bluebird');

const client = bluebird.promisifyAll(
  redis.createClient(),
);

module.exports = client;
