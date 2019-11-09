'use strict';

const DEFAULT_LIST_ORDER = [
  ['createdAt', 'DESC'],
  ['updatedAt', 'DESC'],
];

module.exports = function makeDataAccessor({
  cache,
  database,
  factory,
}) {
  return Object.freeze({
    async list() {
      const scanResults = await database.models.scan_results
        .findAll({
          order: DEFAULT_LIST_ORDER,
          raw: true,
        });
      const cachedList = await cache.getAsync('result-list');

      if (cachedList && cachedList.length === scanResults.length) {
        return cachedList;
      }

      const results = scanResults.map(factory.makeScanResult);

      cache.del('result-list');

      if (results.length) {
        cache.setAsync('result-list', results);
        cache.expireatAsync('result-list', Number.parseInt(new Date().setMinutes(15)/1000));
      }

      return results;
    },

    async getById(id) {
      const cachedResult = await cache.getAsync(`result-${id}`);

      if (cachedResult) {
        return cachedResult;
      }

      let scanResult = await database.models.scan_results
        .findOne({
          where: { Id: id },
          raw: true,
        });

      cache.del(`result-${id}`);

      if (scanResult) {
        scanResult = factory.makeScanResult(scanResult);

        cache.setAsync(`result-${id}`, result);
        cache.expireatAsync(`result-${id}`, Number.parseInt(new Date().setMinutes(15)/1000));
      }

      return scanResult;
    },

    async create(body) {
      let scanResult = factory.buildScanResult(body);
      const transaction = await database.transaction();
      const currentDate = new Date();
      const created = await database.models.scan_results.create(
        { ...scanResult, CreatedAt: currentDate, UpdatedAt: currentDate },
        { transaction },
      );
      const result = factory.makeScanResult(created);

      cache.del('result-list');

      if (scan) {
        cache.setAsync(`result-${result.id}`, result);
        cache.expireatAsync(`result-${result.id}`, Number.parseInt(new Date().setMinutes(15)/1000));
      }

      return result;
    },

    async update(id, update) {
      const transaction = await database.transaction();
      const scanResult = factory.buildScanResult({ id, ...update });

      await database.models.scan_results
        .update(
          { ...scanResult, UpdatedAt: new Date() },
          {
            transaction,
            where: { Id: id },
          },
        );

      const updated = await this.getById(id);

      cache.del('result-list');

      if (updated) {
        cache.setAsync(`result-${id}`, updated);
        cache.expireatAsync(`result-${id}`, Number.parseInt(new Date().setMinutes(15)/1000));
      }

      return true;
    },

    async delete(id) {
      const transaction = await database.transaction();

      await database.models.scan_results.destroy({ transaction, where: { Id: id } });

      cache.del('result-list');
      cache.del(`result-${id}`);
    },
  });
}
