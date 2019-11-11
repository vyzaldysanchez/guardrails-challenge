import React from 'react';

import RequiredLabel from './RequiredLabel';

export default function Input({
  label,
  name,
  placeholder,
  required,
  type = 'text',
  register,
}) {
  return (
    <>
      <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
        {label}
      </label>

      {required && <RequiredLabel />}

      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type={type} placeholder={placeholder} id={name} name={name} ref={register({ required })} />
    </>
  );
}
