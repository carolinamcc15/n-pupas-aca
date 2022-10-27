import SectionTitle from 'components/information/section-title';
import PrimaryButton from 'components/buttons/primary';
import { titles } from 'constants/strings';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';

const RegisterForm = ({ onSubmitHandler }) => {
  const [sectionIndex, setSectionIndex] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('Password', '');

  const showPreviousSection = () => {
    setSectionIndex(sectionIndex - 1);
  };

  const showNextSection = () => {
    setSectionIndex(sectionIndex + 1);
  };

  const setDotStyle = index => {
    return sectionIndex === index ? 'text-primary-500 text-2xl' : 'text-gray-300 text-xl';
  };

  const onSubmit = data => {
    onSubmitHandler(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
    >
      {sectionIndex === 0 && (
        <section className='flex flex-col gap-4'>
          <SectionTitle title={titles.personalData} />
          <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
            <div>
              <input
                type='text'
                placeholder='Nombre completo'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('name', {
                  required: 'Nombre requerido',
                  minLength: {
                    value: 8,
                    message: 'El mínimo de caracteres es 8',
                  },
                  maxLength: {
                    value: 50,
                    message: 'El máximo de caracteres es 80',
                  },
                })}
              />
              {errors.name && <p className='mt-1 text-red-700'>{errors.name.message}</p>}
            </div>
            <div>
              <input
                type='text'
                placeholder='DUI (incluyendo guión)'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('DUI', {
                  required: 'DUI requerido',
                  pattern: {
                    value: /^\d{8}-\d{1}$/,
                    message: 'Formato de DUI inválido',
                  },
                })}
              />
              {errors.DUI && <p className='mt-1 text-red-700'>{errors.DUI.message}</p>}
            </div>
            <div>
              <input
                type='text'
                placeholder='NIT (incluyendo guión)'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('NIT', {
                  required: 'NIT requerido',
                  pattern: {
                    value: /^\d{4}-\d{6}-\d{3}-\d{1}$/,
                    message: 'Formato de NIT inválido',
                  },
                })}
              />
              {errors.NIT && <p className='mt-1 text-red-700'>{errors.NIT.message}</p>}
            </div>
            <div>
              <input
                type='tel'
                pattern='[0-9]{4}-[0-9]{4}'
                placeholder='Número de teléfono'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('phoneNumber', {
                  required: 'Número de teléfono requerido',
                  pattern: {
                    value: /^\d{8}$/,
                    message: 'Número de teléfono inválido',
                  },
                })}
              />
              {errors.phoneNumber && <p className='mt-1 text-red-700'>{errors.phoneNumber.message}</p>}
            </div>
          </div>
        </section>
      )}
      {sectionIndex === 1 && (
        <section className='flex flex-col gap-4'>
          <SectionTitle title={titles.accountData} />
          <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
            <div className='col-span-2'>
              <input
                type='text'
                placeholder='Nombre de usuario'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('username', {
                  required: 'Nombre de usuario requerido',
                  minLength: {
                    value: 8,
                    message: 'El mínimo de caracteres es 10',
                  },
                  maxLength: {
                    value: 20,
                    message: 'El máximo de caracteres es 20',
                  },
                  pattern: {
                    value: /^[A-Za-z0-9_-]{8,20}$/,
                    message: 'Algunos caracteres son inválidos',
                  },
                })}
              />
              {errors.username && <p className='mt-1 text-red-700'>{errors.username.message}</p>}
            </div>
            <div>
              <input
                type='password'
                placeholder='Contraseña'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('Password', {
                  required: 'Contraseña requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener un mínimo de 6 caracteres',
                  },
                })}
              />
              {errors.Password && <p className='mt-1 text-red-700'>{errors.Password.message}</p>}
            </div>
            <div>
              <input
                type='password'
                placeholder='Repetir contraseña'
                className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                {...register('password_repeat', {
                  validate: value => value === password.current || 'Las contraseñas no coinciden',
                })}
              />
              {errors.password_repeat && (
                <p className='mt-1 text-red-700'>{errors.password_repeat.message}</p>
              )}
            </div>
          </div>
        </section>
      )}
      {sectionIndex === 2 && (
        <div>
          <section className='flex flex-col gap-4'>
            <SectionTitle title={titles.pupuseriaData} />
            <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
              <div>
                <input
                  type='text'
                  placeholder='Nombre'
                  className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                  {...register('namePupuseria', {
                    required: 'Nombre requerido',
                    minLength: {
                      value: 8,
                      message: 'El mínimo de caracteres es 8',
                    },
                    maxLength: {
                      value: 80,
                      message: 'El máximo de caracteres es 80',
                    },
                  })}
                />
                {errors.namePupuseria && (
                  <p className='mt-1 text-red-700'>{errors.namePupuseria.message}</p>
                )}
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Nombre de sucursal principal'
                  className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                  {...register('nameBranch', {
                    required: 'Nombre requerido',
                    minLength: {
                      value: 8,
                      message: 'El mínimo de caracteres es 8',
                    },
                    maxLength: {
                      value: 80,
                      message: 'El máximo de caracteres es 80',
                    },
                  })}
                />
                {errors.nameBranch && (
                  <p className='mt-1 text-red-700'>{errors.nameBranch.message}</p>
                )}
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Dirección'
                  className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                  {...register('address', {
                    required: 'Dirección requerida',
                    minLength: {
                      value: 6,
                      message: 'El mínimo de caracteres es 8',
                    },
                    maxLength: {
                      value: 80,
                      message: 'El máximo de caracteres es 80',
                    },
                  })}
                />
                {errors.address && <p className='mt-1 text-red-700'>{errors.address.message}</p>}
              </div>
              <div>
                <input
                  type='text'
                  placeholder='Fecha de apertura'
                  onFocus={e => (e.target.type = 'date')}
                  className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
                  {...register('openingDate', { required: 'Fecha de apertura requerida' })}
                />
                {errors.openingDate && <p className='mt-1 text-red-700'>{errors.openingDate.message}</p>}
              </div>
            </div>
          </section>
          <PrimaryButton text='Registrarme' />
        </div>
      )}
      <div className='flex justify-center items-center gap-8 mt-5'>
        <button
          type='button'
          onClick={showPreviousSection}
          disabled={sectionIndex === 0}
          className='font-bold text-xl bg-primary-500 px-3 rounded-md text-white disabled:bg-gray-400 disabled:opacity-60'
        >
          &lt;
        </button>
        <div className='flex gap-2 items-center justify-center'>
          <p className={setDotStyle(0)}>●</p>
          <p className={setDotStyle(1)}>●</p>
          <p className={setDotStyle(2)}>●</p>
        </div>
        <button
          type='button'
          onClick={handleSubmit(showNextSection)}
          disabled={sectionIndex === 2}
          className='font-bold text-xl bg-primary-500 px-3 rounded-md text-white disabled:bg-gray-400 disabled:opacity-60'
        >
          &gt;
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
