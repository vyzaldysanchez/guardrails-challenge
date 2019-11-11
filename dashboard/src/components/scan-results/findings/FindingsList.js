import React from 'react';
// import ListResultItem from './ListResultItem';

function renderListResultItem(result) {
  // return <ListResultItem key={`scan-result-${result.id}`} result={result} />;
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
          {findings.map(renderListResultItem)}
        </tbody>
      </table>
    </div>
  );
}

