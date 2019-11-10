'use strict';

const uuid = require('uuid/v4')

const { cache } = require('../utils');
const database = require('../db');
const { SEVERITIES, STATUSES } = require('../db/models/scan-result');
const makeScanResultsDataAccess = require('./scan-results');
const makeScanResultsFactory = require('./factory');

const factory = makeScanResultsFactory({
  generateId: () => uuid(),
  severities: SEVERITIES,
  statuses: STATUSES,
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
