import React from 'react';

export default function FindingsListItem({
  finding: {
    ruleId,
    metadata: { severity, description },
    location: { path, positions: { begin } },
  },
}) {
  return (
    <tr className="hover:bg-gray-200">
      <td className="border px-4 py-2">{ruleId}</td>
      <td className="border px-4 py-2">{description}</td>
      <td className="border px-4 py-2">{severity}</td>
      <td className="border px-4 py-2">{path} beginning on line {begin.line}</td>
    </tr>
  );
}
