import React from 'react';

function renderHeader(field) {
  return <th className="px-4 py-2" key={field}>{field}</th>;
}

export default function TableList({ items, fields, renderListItem }) {
  return (
    <div className="w-full table-container mt-5">
      <table className="table-auto full-width w-full">
        <thead>
          <tr>
            {fields.map(renderHeader)}
          </tr>
        </thead>

        <tbody>
          {items.map(renderListItem)}
        </tbody>
      </table>
    </div>
  );
}
