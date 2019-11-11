'use strict';

const assert = require('assert');

const makeFactory = require('./../../data-accessors/factory');
const { SEVERITIES } = require('./../../db/models/scan-result');

describe('buildFinding', () => {
  const factory = makeFactory({
    date: () => null,
    generateId: () => 'some-id',
    severities: Object.keys(SEVERITIES),
    statuses: [],
  });

  it('should fail with missing type', () => {
    const toRun = () => factory.buildFinding({ type: '' });

    assert.throws(toRun);
  });

  it('should fail with missing ruleId', () => {
    const toRun = () => factory.buildFinding({ type: 'test', ruleId: '' });

    assert.throws(toRun);
  });

  it('should fail with missing location', () => {
    const toRun = () => factory.buildFinding({ type: 'test', ruleId: '121', location: null });

    assert.throws(toRun);
  });

  it('should fail with missing metadata', () => {
    const location = {
      path: 'test-path',
      positions: { begin: { line: 340 } },
    };
    const toRun = () => factory.buildFinding({ location, type: 'test', ruleId: '121', metadata: null  });

    assert.throws(toRun);
  });

  it('should create the correct finding object', () => {
    const location = {
      path: 'test-path',
      positions: { begin: { line: 340 } },
    };
    const metadata = { severity: SEVERITIES.HIGH, description: 'test' };
    const finding = { location, metadata, type: 'test', ruleId: 12 };

    const result = factory.buildFinding(finding);

    assert.deepEqual(result, finding);
  });
});
