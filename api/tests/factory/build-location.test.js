'use strict';

const assert = require('assert');
const moment = require('moment-timezone');

const makeFactory = require('./../../data-accessors/factory');

describe('buildLocation', () => {
  const factory = makeFactory({
    date: () => null,
    generateId: () => 'some-id',
    severities: [],
    statuses: [],
  });

  it('should throw an error on empty path', () => {
    const toRun = () => factory.buildLocation({ path: '' });

    assert.throws(toRun);
  });

  describe('with positions', () => {
    it('should throw an error on missing positions', () => {
      const toRun = () => factory.buildLocation({ path: 'test-path' });

      assert.throws(toRun);
    });

    it('should throw an error on missing position beginning', () => {
      const toRun = () => factory.buildLocation({ path: 'test-path', positions: {} });

      assert.throws(toRun);
    });

    it('should throw an error on missing position beginning line', () => {
      const toRun = () => factory.buildLocation({
        path: 'test-path',
        positions: { begin: {} },
      });

      assert.throws(toRun);
    });

    it('should return correct object', () => {
      const base = {
        path: 'test-path',
        positions: { begin: { line: 340 } },
      };

      const result = factory.buildLocation(base);

      assert.deepEqual(result, base);
    });
  });
});
