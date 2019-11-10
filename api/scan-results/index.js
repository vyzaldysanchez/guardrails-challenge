'use strict';


function init({ database, router, captureErrors, factory }) {
  router.get(
    '/scan-results',
    async function handleResultsList(_req, res) {
      try {
        const list = await database.list();

        return res.status(200).json(list);
      } catch (e) {
        captureErrors(e);
        return res.status(500).json({ message: 'Something went wrong when fetching list.' });
      }
    },
  );

  router.get(
    '/scan-results/:id',
    async (req, res) => {
      try {
        const { id } = req.params;
        const scanResult = await database.getById(id);

        if (scanResult) {
          return res.status(200).json(scanResult);
        }

        return res.status(404).json({ message: `Scan result with id ${id} not found.` });
      } catch (e) {
        captureErrors(e);
        return res.status(500).json({ message: 'Something went wrong...' });
      }
    },
  );

  router.post(
    '/scan-results',
    async (req, res) => {
      let payload;

      console.log(req.body)

      try {
        payload = factory.buildScanResult(req.body);
      } catch (e) {
        return res.status(400).json({ message: e.message });
      }

      try {
        const result = await database.create(payload);

        return res.status(201).json(result);
      } catch (e) {
        captureErrors(e);
        return res.status(500).json({ message: 'Something went wrong when creating result...' });
      }
    },
  );
}

module.exports = init;
