module.exports = function makeCaptureErrors({ logger, monitor }) {
  return Object.freeze({
    captureError(error) {
      logger.error(error);
      monitor.captureException();
    },
  });
}
