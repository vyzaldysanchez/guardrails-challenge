import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import useScanResultsService from '../../services/scan-results';
import ScanResultsList from '../scan-results/ScanResultsList';

const { fetchScanResults } = useScanResultsService({
  http: axios,
  captureError: Sentry.captureException,
});

export default function ScanResults() {
  const [scanResults, setScanResults] = useState([]);

  useEffect(() => {
    (async function loadData() {
      const data = await fetchScanResults();

      setScanResults(data);
    })();
  }, []);

  return (
    <div className="flex flex-wrap mb-4">
      <div className="flex w-full items-center justify-between bg-teal-500 text-white align-middle p-3">
        <span className="font-semibold">Security Scan Results</span>

        <Link to="/create" className="bg-transparent text-white font-semibold py-2 px-4 border border-white rounded">
          Create
        </Link>
      </div>

      <ScanResultsList scanResults={scanResults} />
    </div>
  );
}
