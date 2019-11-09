'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const db = require('./db');
const scanResultsDB = require('./data-accessors')
const initModule = require('./scan-results');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;
const Sentry = require('@sentry/node');

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

initModule({ router, database: scanResultsDB, monitor: Sentry });

router.use(
  '*',
  (_req, res) => res.status(404).json({ message: 'Not Found' }),
);

app.use('/', router);

(async () => {
  try {
    // Let's wait for all models and DB resources to load properly
    await db.sync();
  } catch (e) {
    Sentry.captureException(e);
    console.error('Unable to sync the database:', e);
  }

  app.listen(PORT, () => console.log(`API server started on port ${PORT}`));
})();
