import React from 'react';
import FindingsListItem from './FindingsListItem';

function renderListItem(finding) {
  return <FindingsListItem key={`scan-result-finding-${finding.description}-${finding.location.path}`} finding={finding} />;
}

export default function FindingsList({ findings }) {
  return (
    <div className="w-full table-container mt-5">
      <table className="table-auto full-width w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">RuleId</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Severity</th>
            <th className="px-4 py-2">Path</th>
          </tr>
        </thead>

        <tbody>
          {findings.map(renderListItem)}
        </tbody>
      </table>
    </div>
  );
}

