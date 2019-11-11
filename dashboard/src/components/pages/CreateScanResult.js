import React from 'react';
import CreateScanResultForm from '../scan-results/form/CreateScanResultForm';

export default function CreateScanResult() {
  return (
    <div className="flex flex-wrap mb-4 justify-center">
      <div className="flex w-full items-center justify-between bg-teal-500 text-white align-middle p-3">
        <span className="font-semibold">Create Security Scan Result</span>
      </div>

      <CreateScanResultForm />
    </div>
  );
}
