'use strict';

const DEFAULT_LIST_ORDER = [
  ['CreatedAt', 'DESC'],
  ['UpdatedAt', 'DESC'],
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
      const cachedList = await cache.get('result-list');

      if (cachedList && cachedList.length === scanResults.length) {
        return cachedList;
      }

      const results = scanResults.map(factory.makeScanResult);

      cache.del('result-list');
      cache.set('result-list', results);
      cache.expireat('result-list', Number.parseInt(new Date().setMinutes(15)/1000));

      return results;
    },

    async getById(id) {
      const cachedResult = await cache.get(`result-${id}`);

      if (cachedResult) {
        return cachedResult;
      }

      const scanResult = await database.models.scan_results
        .findOne({
          where: { Id: id },
          raw: true,
        });
      const result = factory.makeScanResult(scanResult);

      cache.set(`result-${id}`, result);
      cache.expireat(`result-${id}`, Number.parseInt(new Date().setMinutes(15)/1000));

      return result;
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
      cache.set(`result-${result.id}`, scanResult);
      cache.expireat(`result-${result.id}`, Number.parseInt(new Date().setMinutes(15)/1000));

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
      cache.set(`result-${id}`, updated);
      cache.expireat(`result-${id}`, Number.parseInt(new Date().setMinutes(15)/1000));

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
