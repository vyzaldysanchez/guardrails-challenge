let routing;

export default function useRoutingServiceuseRoutingService({ history, recreate }) {
  if (recreate || !routing) {
    routing = Object.freeze({
      sendToListFindings(scanResultId) {
        history.push(`/scan-results/${scanResultId}/findings`);
      }
    });
  }

  return routing;
}
