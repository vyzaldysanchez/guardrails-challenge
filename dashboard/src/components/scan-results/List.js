import React, { useState } from 'react';

export default function List() {
  const [scanResults, setScanResults] = useState([]);

  return (
    <div>List { scanResults.length }</div>
  );
}
