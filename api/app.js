'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const { scanResultsDB, factory } = require('./data-accessors');
const initModule = require('./scan-results');
const { makeCaptureErrors, logger } = require('./utils');
const swaggerConfig = require('./swagger.json');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 80;
const Sentry = require('@sentry/node');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(limiter);
app.use(cors())

initModule({
  router,
  factory,
  database: scanResultsDB,
  captureErrors: makeCaptureErrors({ logger, monitor: Sentry }).captureError,
});

router.use('/api-docs', swaggerUI.serve);
router.get('/api-docs', swaggerUI.setup(swaggerConfig));

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
