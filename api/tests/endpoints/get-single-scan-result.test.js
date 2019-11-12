'use strict';

const assert = require('assert');
const express = require('express');
const request = require('supertest');

const initAPI = require('../../scan-results');
const makeDatabase = require('./mocks/database');

describe('GET /scan-results/:id', () => {
  let router;

  describe('unknown id', () => {
    before(() => {
      router = express();

      initAPI({
        router,
        database: makeDatabase(true),
        captureErrors: () => null,
        factory: null,
      });
    });

    it('should return HTTP 404 for unknown id', async () => {
      const response = await request(router).get('/scan-results/1');

      assert.equal(response.status, 404);
      assert.equal(response.body.message, 'Scan result with id 1 not found.');
    });
  });

  describe('known id', () => {
    before(() => {
      router = express();

      initAPI({
        router,
        database: makeDatabase(),
        captureErrors: () => null,
        factory: null,
      });
    });

    it('should return scan result for specified id - HTTP 200', async () => {
      const response = await request(router).get('/scan-results/1');

      assert.ok(response.body);
      assert.equal(response.status, 200);
    });
  });
});
