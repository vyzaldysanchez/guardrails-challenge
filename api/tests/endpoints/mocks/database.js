const BASE_RESULT = {
  id: '36a90cef-8dc4-4520-8a06-e058e14d42c4',
  status: 'Queued',
  repositoryName: 'MyRepository',
  findings: [
    {
      type: 'string',
      ruleId: 'string',
      location: {
        path: 'string',
        positions: {
          begin: {
            line: 'string'
          }
        }
      },
      metadata: {
        severity: 'HIGH',
        description: 'string'
      }
    }
  ],
  queuedAt: '2019-10-10T04:20:56.324Z',
  scanningAt: null,
  finishedAt: null,
  createdAt: '2019-11-11T05:47:45.773Z',
};

module.exports = function makeDatabase(empty) {
  return Object.freeze({
    async list() {
      if (empty) {
        return [];
      }

      return [BASE_RESULT];
    },

    async getById() {
      if (empty) {
        return null;
      }

      return BASE_RESULT;
    },
  });
}
