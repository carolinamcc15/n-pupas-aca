import React from 'react';

const Input = ({
  id,
  label,
  placeholder,
  icon,
  register,
  error,
  type = 'text',
  defaultValue = '',
}) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='mb-5 text-xs text-primary-500 uppercase'>
        {label}
      </label>
      <div className='relative'>
        <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
          {icon}
        </div>
        <input
          type={type}
          defaultValue={defaultValue}
          id={id}
          placeholder={placeholder}
          className='text-primary-500 mt-1 pl-10 bg-primary-100 appearance-none rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-2 focus:border-primary-300 placeholder:font-light placeholder:text-primary-400'
          {...register}
        />
      </div>
      {error && <p className='text-sm text-red-700 mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
