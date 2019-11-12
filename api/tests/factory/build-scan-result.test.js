'use strict';

const assert = require('assert');

const makeFactory = require('./../../data-accessors/factory');
const { SEVERITIES, STATUSES } = require('./../../db/models/scan-result');

describe('buildScanResult', () => {
  const factory = makeFactory({
    severities: Object.values(SEVERITIES),
    statuses: STATUSES,
    date: dateString => dateString,
    generateId: () => 'some-id',
  });

  it('should fail with empty status', () => {
    const toRun = () => factory.buildScanResult({ status: '' });

    assert.throws(toRun);
  });

  it('should fail with incorrect status', () => {
    const toRun = () => factory.buildScanResult({ status: 'WRONG-STATUS' });

    assert.throws(toRun);
  });

  it('should fail with missing repository name', () => {
    const toRun = () => factory.buildScanResult({
      status: STATUSES.QUEUED,
      repositoryName: '',
    });

    assert.throws(toRun);
  });

  it('should fail with missing queuedAt date', () => {
    const toRun = () => factory.buildScanResult({
      status: STATUSES.QUEUED,
      repositoryName: 'Some repo',
    });

    assert.throws(toRun);
  });

  it('should create the correct object for queued scan results', () => {
    const scanResult = {
      status: STATUSES.QUEUED,
      repositoryName: 'Some repo',
      queuedAt: 'queued-today',
    };
    const expected = {
      Id: 'some-id',
      Status: scanResult.status,
      RepositoryName: scanResult.repositoryName,
      QueuedAt: scanResult.queuedAt,
      Findings: [],
    };

    const result = factory.buildScanResult(scanResult);

    assert.deepEqual(result, expected);
  });

  describe('for IN_PROGRESS scan results', () => {
    it('should fail with missing scanningAt date', () => {
      const toRun = () => factory.buildScanResult({
        status: STATUSES.IN_PROGRESS,
        repositoryName: 'Some repo',
        queuedAt: 'queued-at-today',
      });

      assert.throws(toRun);
    });

    it('should create the correct object', () => {
      const scanResult = {
        status: STATUSES.IN_PROGRESS,
        repositoryName: 'Some repo',
        queuedAt: 'queued-today',
        scanningAt: 'scanning-now',
      };
      const expected = {
        Id: 'some-id',
        Status: scanResult.status,
        RepositoryName: scanResult.repositoryName,
        QueuedAt: scanResult.queuedAt,
        ScanningAt: scanResult.scanningAt,
        Findings: [],
      };

      const result = factory.buildScanResult(scanResult);

      assert.deepEqual(result, expected);
    });
  });

  describe('for SUCCESS/FAILURE scan results', () => {
    it('should fail with missing finishedAt date', () => {
      const toRunForStatus = status => () => factory.buildScanResult({
        status: status,
        repositoryName: 'Some repo',
        queuedAt: 'queued-at-yesterday',
        scanningAt: 'scanning-at-today',
      })
      const toRunForSuccessStatus = toRunForStatus(STATUSES.SUCCESS);
      const toRunForFailureStatus = toRunForStatus(STATUSES.FAILURE);

      assert.throws(toRunForSuccessStatus);
      assert.throws(toRunForFailureStatus);
    });

    it('should create the correct object for SUCCESS', () => {
      const scanResult = {
        status: STATUSES.SUCCESS,
        repositoryName: 'Some repo',
        queuedAt: 'queued-today',
        finishedAt: 'finished-now',
      };
      const expected = {
        Id: 'some-id',
        Status: scanResult.status,
        RepositoryName: scanResult.repositoryName,
        QueuedAt: scanResult.queuedAt,
        FinishedAt: scanResult.finishedAt,
        Findings: [],
      };

      const result = factory.buildScanResult(scanResult);

      assert.deepEqual(result, expected);
    });

    it('should create the correct object for FAILURE', () => {
      const scanResult = {
        status: STATUSES.FAILURE,
        repositoryName: 'Some repo',
        queuedAt: 'queued-today',
        finishedAt: 'finished-now',
      };
      const expected = {
        Id: 'some-id',
        Status: scanResult.status,
        RepositoryName: scanResult.repositoryName,
        QueuedAt: scanResult.queuedAt,
        FinishedAt: scanResult.finishedAt,
        Findings: [],
      };

      const result = factory.buildScanResult(scanResult);

      assert.deepEqual(result, expected);
    });
  });
});
