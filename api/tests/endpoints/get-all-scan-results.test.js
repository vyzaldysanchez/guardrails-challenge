'use strict';

const assert = require('assert');
const express = require('express');
const request = require('supertest');

const initAPI = require('../../scan-results');
const makeDatabase = require('./mocks/database');

describe('GET /scan-results', () => {
  const router = express();

  initAPI({
    router,
    database: makeDatabase(),
    captureErrors: () => null,
    factory: null,
  });

  it('should retrieve a list of scan results - HTTP 200', async () => {
    const response = await request(router).get('/scan-results');

    assert.equal(response.status, 200);
    assert.equal(response.body.length, 1);
  });
});
