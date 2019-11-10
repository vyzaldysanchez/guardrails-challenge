'use strict';

const uuid = require('uuid/v4');
const moment = require('moment-timezone');

const { cache } = require('../utils');
const database = require('../db');
const { SEVERITIES, STATUSES } = require('../db/models/scan-result');
const makeScanResultsDataAccess = require('./scan-results');
const makeScanResultsFactory = require('./factory');

const factory = makeScanResultsFactory({
  generateId: () => uuid(),
  date: moment,
  severities: Object.values(SEVERITIES),
  statuses: Object.values(STATUSES),
});

const scanResultsDB = makeScanResultsDataAccess({
  cache,
  database,
  factory,
});

module.exports = Object.freeze({
  scanResultsDB,
  factory,
});
