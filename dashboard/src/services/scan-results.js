const BASE_URL = process.env.REACT_APP_API_URL;
let service;

export default function useScanResultsService({ http, captureError = () => null, force }) {
  if (force || !service) {
    service = Object.freeze({
      async fetchScanResults() {
        try {
          const result = await http.get(`${BASE_URL}/scan-results`);

          return result.data;
        } catch(e) {
          captureError(e);

          return [];
        }
      },

      async getScanResult(id) {
        try {
          const result = await http.get(`${BASE_URL}/scan-results/${id}`);

          return result.data;
        } catch (e) {
          captureError(e);

          return [];
        }
      },

      async createScanResult(payload) {
        try {
          const result = await http.post(`${BASE_URL}/scan-results`, payload);

          return result.data;
        } catch (e) {
          return { error: e.response };
        }
      },
    });
  }

  return service;
}
