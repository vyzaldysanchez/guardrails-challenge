import React, { forwardRef } from 'react';

import RequiredLabel from './RequiredLabel';

const Select = forwardRef(({
  label,
  name,
  defaultValue,
  renderOptions,
  required,
}, ref) => (
  <>
    <label className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={name}>
      {label}
    </label>

    {required && <RequiredLabel />}

    <div className="relative">
      <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        id={name} name={name} defaultValue={defaultValue} ref={ref}>
        {renderOptions()}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </>
));

export default Select;
