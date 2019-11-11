import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';


const STATUSES = [
  'Queued',
  'In Progress',
  'Success',
  'Failure',
];

const statusIsRequired = {
  Queued: () => true,
  Finished: status => ['Success', 'Failure'].includes(status),
  'In Progress': status => status === 'In Progress',
};

function renderStatusOption(status) {
  return <option key={status} value={status}>{status}</option>;
}

function renderRequiredLabel() {
  return <label className="uppercase tracking-wide text-red-700 text-xs font-bold ml-1">(Required)</label>;
}

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

export default function CreateScanResultForm({ createScanResult, onCreate }) {
  const [findings, setFindings] = useState([]);
  const [error, setError] = useState('');
  const {
    register,
    handleSubmit,
    errors,
    triggerValidation,
    watch,
    reset,
  } = useForm();
  const {
    repositoryName,
    status,
    queuedAt,
    scanningAt,
    finishedAt,
  } = watch(['repositoryName', 'status', 'queuedAt', 'scanningAt', 'finishedAt']);

  async function onSubmit(payload) {
    const { error: e } = await createScanResult(payload);

    if (e) {
      setError(e.data.message);
    } else {
      reset();
      onCreate();
    }
  }

  useEffect(() => {
    triggerValidation();
  }, [triggerValidation, repositoryName, status, queuedAt, scanningAt, finishedAt]);

  return (
    <form className="w-full max-w-lg mt-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <div className="mb-4 mx-2">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="repositoryName">
            Repository Name
          </label>
          {renderRequiredLabel()}
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text" placeholder="Your repository name" id="repositoryName" name="repositoryName" ref={register({ required: true })} />
        </div>

        <div className="mb-4 mx-2">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="status">
            Status
          </label>
          {renderRequiredLabel()}
          <div className="relative">
            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="status" name="status" defaultValue={STATUSES[0]} ref={register({ required: true })}>
              {STATUSES.map(renderStatusOption)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="mb-4 mx-2">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="queuedAt">
            Queued At
          </label>
          {renderRequiredLabel()}
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="datetime-local" id="queuedAt" name="queuedAt" ref={register({ required: true })} />
        </div>

        <div className="mb-4 mx-2">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="scanningAt">
            Scanning At
          </label>
          {statusIsRequired[status] && statusIsRequired['In Progress'](status) && renderRequiredLabel()}
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="datetime-local" id="scanningAt" name="scanningAt" ref={register({ required: STATUSES[1] === status })} />
        </div>

        <div className="mb-4 mx-2">
          <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="finishedAt">
            Finished At
          </label>
          {statusIsRequired.Finished(status) && renderRequiredLabel()}
          <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="datetime-local" id="finishedAt" name="finishedAt" ref={register({ required: STATUSES.slice(2).includes(status) })} />
        </div>

        <div className="mb-4 mx-2">
          <label className="block uppercase tracking-tide text-gray-700 text-xs font-bold mb-2">
            Findings
          </label>

          <Editor mode="code" value={findings} onChange={setFindings} />
        </div>

        {hasErrors(errors) && <div className="flex justify-center">
          <button className="bg-teal-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
            type="submit" disabled>
            Create
          </button>
        </div>}

        {!hasErrors(errors) && <div className="flex justify-center">
          <button className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit">
            Create
          </button>
        </div>}

        {error && <div className="flex justify-center">
          <label className="block uppercase tracking-tide text-red-700 text-xs font-bold my-2">{error}</label>
        </div>}
      </div>
    </form>
  );
}
