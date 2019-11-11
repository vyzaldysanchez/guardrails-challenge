let service;

export default function useScanResultsService({ http, captureError, force }) {
  if (force || !service) {
    service = Object.freeze({
      async fetchScanResults() {
        try {
          const result = await http.get(`${process.env.REACT_APP_API_URL}/scan-results`);

          return result.data;
        } catch(e) {
          captureError(e);

          return [];
        }
      }
    });
  }

  return service;
}
