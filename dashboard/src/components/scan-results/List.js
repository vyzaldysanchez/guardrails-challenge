import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as Sentry from '@sentry/browser';

import useScanResultsService from '../../services/scan-results';
import ListResultItem from './ListResultItem';

const { fetchScanResults } = useScanResultsService({
  http: axios,
  captureError: Sentry.captureException,
});

function renderListResultItem(result) {
  return <ListResultItem key={`scan-result-${result.id}`} result={result} />;
}

export default function List() {
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

      <div className="w-full table-container mt-5">
        <table className="table-auto full-width w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">Repository Name</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Queued At</th>
              <th className="px-4 py-2">Scanning At</th>
              <th className="px-4 py-2">Finished At</th>
              <th className="px-4 py-2">Findings</th>
            </tr>
          </thead>

          <tbody>
            {scanResults.map(renderListResultItem)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
