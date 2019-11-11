let routing;

export default function useRoutingService({ history, recreate }) {
  if (recreate || !routing) {
    routing = Object.freeze({
      goToListFindings(scanResultId) {
        history.push(`/scan-results/${scanResultId}/findings`);
      },

      goHome() {
        history.push('/');
      },
    });
  }

  return routing;
}
