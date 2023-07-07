import React from 'react';

const DropdownInput = ({ id, label, defaultValue, options, error, register }) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='mb-5 text-xs text-primary-500 uppercase'>
        {label}
      </label>
      <div className='relative'>
        <select
          id={id}
          defaultValue={defaultValue}
          className='text-primary-500 mt-1 pl-3 pr-10 bg-primary-100 appearance-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-2 focus:border-primary-300'
          {...register}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <p className='text-sm text-red-700 mt-1'>{error}</p>}
    </div>
  );
};

export default DropdownInput;