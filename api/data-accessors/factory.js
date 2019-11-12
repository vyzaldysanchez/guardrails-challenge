'use strict';

module.exports = function makeFactory({ severities, statuses, generateId, date } = {}) {
  return Object.freeze({
    buildMetadata({ description, severity } = {}) {
      if (!description) {
        throw new Error('Finding metadata must have a description.');
      }

      if (!severities.includes(severity.toUpperCase())) {
        throw new Error('Finding metadata must have a valid severity.');
      }

      return Object.freeze({ description, severity });
    },

    buildLocation({ path, positions } = {}) {
      if (!path) {
        throw new Error('Finding location must have a path.');
      }

      if (!positions) {
        throw new Error('Finding location must have a positions.');
      }

      if (!positions.begin || !positions.begin.line) {
        throw new Error('Finding location position must have a begin line.');
      }

      return Object.freeze({
        path,
        positions: Object.freeze(positions),
      });
    },

    buildFinding({
      type,
      ruleId,
      location,
      metadata,
    } = {}) {
      if (!type) {
        throw new Error('Finding must have a type.');
      }

      if (!ruleId) {
        throw new Error('Finding must have a rule ID.');
      }

      if (!location) {
        throw new Error('Finding must have a location.');
      }

      if (!metadata) {
        throw new Error('Finding must have a location.');
      }

      return Object.freeze({
        type,
        ruleId,
        location: this.buildLocation(location),
        metadata: this.buildMetadata(metadata),
      });
    },

    buildScanResult({
      id = generateId(),
      status = statuses.PENDING,
      repositoryName,
      findings = [],
      queuedAt,
      scanningAt,
      finishedAt,
    } = {}) {
      const allStatuses = Object.values(statuses);

      if (!allStatuses.includes(status)) {
        throw new Error('Scan Result status must be valid.');
      }

      if (!repositoryName) {
        throw new Error('Scan Result must have a repository name.');
      }

      if (!queuedAt) {
        throw new Error('Scan Result must have a queuedAt date.');
      }

      if (statuses.IN_PROGRESS === status && !scanningAt) {
        throw new Error('Scan Result must have a scanningAt date.');
      }

      if ([statuses.SUCCESS, statuses.FAILURE].includes(status) && !finishedAt) {
        throw new Error('Scan Result must have a finishedAt date.');
      }

      const scanResult = {
        Id: id,
        Status: status,
        RepositoryName: repositoryName,
        Findings: findings.map(finding => this.buildFinding(finding)),
      };

      if (queuedAt) {
        scanResult.QueuedAt = date(queuedAt);
      }

      if (scanningAt) {
        scanResult.ScanningAt = date(scanningAt);
      }

      if (finishedAt) {
        scanResult.FinishedAt = date(finishedAt);
      }

      return Object.freeze(scanResult);
    },

    makeScanResult(result) {
      return Object.freeze({
        get id() {
          return result.Id;
        },

        get status() {
          return result.Status;
        },

        get repositoryName() {
          return result.RepositoryName;
        },

        get findings() {
          return result.Findings;
        },

        get queuedAt() {
          return result.QueuedAt;
        },

        get scanningAt() {
          return result.ScanningAt;
        },

        get finishedAt() {
          return result.FinishedAt;
        },

        get createdAt() {
          return result.createdAt;
        }
      });
    },
  });
}
