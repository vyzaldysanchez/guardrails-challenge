import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import CreateScanResultForm from '../scan-results/form/CreateScanResultForm';
import useScanResultsService from '../../services/scan-results';
import useRoutingService from '../../services/routing';

const { createScanResult } = useScanResultsService({
  http: axios,
});

export default function CreateScanResult() {
  const routing = useRoutingService({ history: useHistory() });

  return (
    <div className="flex flex-wrap mb-4 justify-center">
      <div className="flex w-full items-center justify-between bg-teal-500 text-white align-middle p-3">
        <span className="font-semibold">Create Security Scan Result</span>
      </div>

      <CreateScanResultForm createScanResult={createScanResult} />
    </div>
  );
}
