import React, { useEffect, useState } from 'react';
import axios from 'axios';

async function fetchScanResults() {
  const result = await axios.get(`${process.env.REACT_APP_API_URL}/scan-results`)
    .catch(console.error);

  return result.data;
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
    <div>List { scanResults.length }</div>
  );
}
