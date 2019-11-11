import React from 'react';
import FindingsListItem from './FindingsListItem';
import TableList from '../../shared/TableList';

function renderListItem(finding) {
  return <FindingsListItem key={`scan-result-finding-${finding.description}-${finding.location.path}`} finding={finding} />;
}

const FIELDS = [
  'RuleId',
  'Description',
  'Severity',
  'Path',
];

export default function FindingsList({ findings }) {
  return <TableList fields={FIELDS} items={findings} renderListItem={renderListItem} />;
}

