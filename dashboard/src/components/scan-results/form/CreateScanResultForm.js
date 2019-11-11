import React from 'react';

const STATUSES = [
  'Queued',
  'In Progress',
  'Success',
  'Failure',
];

function renderStatusOption(status) {
  return <option key={status} value={status}>{status}</option>;
}

export default function CreateScanResultForm() {
  return (
    <form className="w-full max-w-lg mt-10">
      <div className="mb-6">
        <div className="mb-4 mx-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="repositoryName">
            Repository Name
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text" placeholder="Your repository name" id="repositoryName" />
        </div>

        <div className="mb-4 mx-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
            Status
          </label>
          <div className="relative">
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="status" defaultValue="">
              <option disabled value="">Select a status</option>
              {STATUSES.map(renderStatusOption)}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="mb-4 mx-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="queuedAt">
            Queued At
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="date" id="queuedAt" />
        </div>

        <div className="mb-4 mx-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="scanningAt">
            Scanning At
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="date" id="scanningAt" />
        </div>

        <div className="mb-4 mx-2">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="finishedAt">
            Finished At
          </label>
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="date" id="finishedAt" />
        </div>
      </div>
    </form>
  );
}
