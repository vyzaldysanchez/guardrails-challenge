'use strict';

const STATUSES = {
  QUEUED: 'Queued',
  IN_PROGRESS: 'In Progress',
  SUCCESS: 'Success',
  FAILURE: 'Failure',
};

const SEVERITIES = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
};

module.exports = function makeScanResultsTable(sequelize, DataTypes) {
  return sequelize.define('scan_results', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    Status: {
      type: DataTypes.ENUM(Object.values(STATUSES)),
      allowNull: false,
      defaultValue: 'Queued',
    },
    RepositoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Findings: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
    QueuedAt: {
      type: DataTypes.DATE,
    },
    ScanningAt: {
      type: DataTypes.DATE,
    },
    FinishedAt: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  }, { tableName: 'scan_results' });
};

module.exports.STATUSES = STATUSES;

module.exports.SEVERITIES = SEVERITIES;
