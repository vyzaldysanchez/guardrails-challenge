'use strict';

const assert = require('assert');
const express = require('express');
const request = require('supertest');

const initAPI = require('../../scan-results');
const makeDatabase = require('./mocks/database');

describe('GET /scan-results/:id', () => {
  let router;

  function initAPIWithDB(empty) {
    initAPI({
      router,
      database: makeDatabase(empty),
      captureErrors: () => null,
      factory: null,
    });
  }

  describe('unknown id', () => {
    before(() => {
      router = express();

      initAPIWithDB(true);
    });

    it('should return error for unknown id - HTTP 404', async () => {
      const response = await request(router).get('/scan-results/1');

      assert.equal(response.status, 404);
      assert.equal(response.body.message, 'Scan result with id 1 not found.');
    });
  });

  describe('known id', () => {
    before(() => {
      router = express();

      initAPIWithDB();
    });

    it('should return scan result for specified id - HTTP 200', async () => {
      const response = await request(router).get('/scan-results/1');

      assert.ok(response.body);
      assert.equal(response.status, 200);
    });
  });
});
