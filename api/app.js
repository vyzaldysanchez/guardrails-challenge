'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const db = require('./db');
const { assignRoutes } = require('./routes');

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

assignRoutes(app, router);

(async () => {
  try {
    // Let's wait for all models and DB resources to load properly
    await db.sync();
  } catch (e) {
    console.error('Unable to sync the database:', e);
  }

  app.listen(PORT, () => console.log(`API server started on port ${PORT}`));
})();
