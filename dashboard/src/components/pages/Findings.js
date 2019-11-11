import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import useScanResultsService from '../../services/scan-results';
import FindingsList from '../scan-results/findings/FindingsList';

const { getScanResult } = useScanResultsService({
  http: axios,
  captureError: Sentry.captureException,
});

export default function Findings() {
  const { scanResultId } = useParams();
  const [scanResult, setScanResult] = useState(null);

  useEffect(() => {
    (async function loadData() {
      const data = await getScanResult(scanResultId);

      setScanResult(data);
    })();
  }, [scanResultId]);

  if (!scanResult) {
    return (
      <div className="flex flex-wrap mb-4 text-center">
        <h2>Loading findings...</h2>
      </div>
    );
  }

  if (!scanResult.findings.length) {
    return (
      <div className="flex flex-wrap mb-4 text-center">
        <h2>No findings found...</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap mb-4">
      <div className="flex w-full items-center justify-between bg-teal-500 text-white align-middle p-3">
        <span className="font-semibold">{scanResult.repositoryName} Findings</span>
      </div>

      <FindingsList findings={scanResult.findings} />
    </div>
  );
}
