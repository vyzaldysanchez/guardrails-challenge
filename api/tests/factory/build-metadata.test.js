'use strict';

const assert = require('assert');

const makeFactory = require('./../../data-accessors/factory');
const { SEVERITIES } = require('./../../db/models/scan-result');

describe('buildMetadata', () => {
  const factory = makeFactory({
    date: () => null,
    generateId: () => 'some-id',
    severities: Object.keys(SEVERITIES),
    statuses: [],
  });

  it('should throw an error on missing description', () => {
    const toRun = () => factory.buildMetadata({ description: '' });

    assert.throws(toRun);
  });

  it('should throw an error on invalid severity', () => {
    const toRun = () => factory.buildMetadata({ description: 'description' });
    const toRunWithValue = () => factory.buildMetadata({ description: 'description', severity: 'HI' });

    assert.throws(toRun);
    assert.throws(toRunWithValue);
  });

  it('should create the correct metadata object', () => {
    const base = { description: 'description', severity: 'HIGH' };

    const result = factory.buildMetadata(base);

    assert.deepEqual(result, base);
  });
});
