import React from 'react';
import { useHistory } from 'react-router-dom';

import { toDateString } from '../../services/date';
import useRoutingService from '../../services/routing';

export default function ScanResultsListItem({ result }) {
  const routing = useRoutingService({ history: useHistory() });

  return (
    <tr className="hover:bg-gray-200 cursor-pointer" onClick={() => routing.goToListFindings(result.id)}>
      <td className="border px-4 py-2">{result.repositoryName}</td>
      <td className="border px-4 py-2">{result.status}</td>
      <td className="border px-4 py-2">{toDateString(result.createdAt)}</td>
      <td className="border px-4 py-2">{toDateString(result.queuedAt)}</td>
      <td className="border px-4 py-2">{toDateString(result.scanningAt)}</td>
      <td className="border px-4 py-2">{toDateString(result.finishedAt)}</td>
      <td className="border px-4 py-2 text-center">
        <span className="inline-block bg-teal-500 text-white px-2 rounded-full font-semibold">
          {result.findings.length}
        </span>
      </td>
    </tr>
  );
}
