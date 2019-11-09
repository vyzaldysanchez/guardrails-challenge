'use strict';

const redis = require('redis');
const bluebird = require('bluebird');

const client = bluebird.promisifyAll(
  redis.createClient({ url: process.env.REDIS_URL }),
);

module.exports = client;
