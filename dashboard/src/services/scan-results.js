export default function makeScanResultsService({ http, captureError }) {
  return Object.freeze({
    async fetchScanResults() {
      try {
        const result = await http.get(`${process.env.REACT_APP_API_URL}/scan-results`);

        return result.data;
      } catch(e) {
        captureError(e);

        return [];
      }
    }
  })
}
