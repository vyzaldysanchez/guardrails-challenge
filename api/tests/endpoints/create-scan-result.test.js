'use strict';

const assert = require('assert');
const express = require('express');
const request = require('supertest');
const bodyParser = require('body-parser');

const initAPI = require('../../scan-results');
const makeDatabase = require('./mocks/database');
const makeFactory = require('../../data-accessors/factory');
const { SEVERITIES, STATUSES } = require('./../../db/models/scan-result');

const { BASE_RESULT } = makeDatabase;

describe('POST /scan-results', () => {
  const factory = makeFactory({
    severities: Object.values(SEVERITIES),
    statuses: STATUSES,
    generateId: () => 'some-id',
    date: dateString => dateString,
  });
  let router;

  beforeEach(() => {
    router = express();

    router.use(bodyParser.json());

    initAPI({
      router,
      factory,
      database: makeDatabase(true),
      captureErrors: () => null,
    });
  });

  it('should return error on invalid payload - HTTP 400', async () => {
    const response = await request(router)
      .post('/scan-results')
      .send({ repositoryName: 'Some dumb name.' });

    assert.equal(response.status, 400);
  });

  it('should return created scan result - HTTP 201', async () => {
    const response = await request(router)
      .post('/scan-results')
      .send(BASE_RESULT);

    const { id, status, repositoryName, queuedAt, findings } = BASE_RESULT;
    const expect = { id, status, repositoryName, queuedAt, findings };

    assert.deepEqual(response.body, expect);
    assert.equal(response.status, 201);
  });
});
