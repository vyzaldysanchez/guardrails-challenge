import React, { useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

import Input from '../../shared/Input';
import Select from '../../shared/Select';

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

function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}

export default function CreateScanResultForm({ createScanResult, onCreate = () => null }) {
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
          <Input label="Repository Name" placeholder="Your repository name" name="repositoryName" register={register} required/>
        </div>

        <div className="mb-4 mx-2">
          <Select label="Status" name="status" defaultValue={STATUSES[0]} ref={register({ required: true })}
            renderOptions={() => STATUSES.map(renderStatusOption)} required />
        </div>

        <div className="mb-4 mx-2">
          <Input label="Queued At" name="queuedAt" type="datetime-local" register={register} required/>
        </div>

        <div className="mb-4 mx-2">
          <Input label="Scanning At" name="scanningAt" type="datetime-local" register={register} required={statusIsRequired[status] && statusIsRequired['In Progress'](status)}/>
        </div>

        <div className="mb-4 mx-2">
          <Input label="Finished At" name="finishedAt" type="datetime-local" register={register} required={statusIsRequired.Finished(status)} />
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
