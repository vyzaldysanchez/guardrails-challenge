import React from 'react';

import ScanResultListItem from './ScanResultListItem';

function renderScanResultListItem(result) {
  return <ScanResultListItem key={`scan-result-${result.id}`} result={result} />;
}

export default function ScanResultsList({ scanResults }) {
  return (
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
          {scanResults.map(renderScanResultListItem)}
        </tbody>
      </table>
    </div>
  );
}
