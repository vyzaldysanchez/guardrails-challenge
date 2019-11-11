import React from 'react';

import ScanResultsListItem from './ScanResultsListItem';
import TableList from '../shared/TableList';

function renderScanResultsListItem(result) {
  return <ScanResultsListItem key={`scan-result-${result.id}`} result={result} />;
}

const FIELDS = [
  'Repository Name',
  'Status',
  'Created At',
  'Queued At',
  'Scanning At',
  'Finished At',
  'Findings',
];

export default function ScanResultsList({ scanResults }) {
  return (
    <TableList fields={FIELDS} items={scanResults} renderListItem={renderScanResultsListItem} />
  );
}
