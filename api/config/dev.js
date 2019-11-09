'use strict';

const database = require('./database');

module.exports = {
  database : { ...database.development },
};
