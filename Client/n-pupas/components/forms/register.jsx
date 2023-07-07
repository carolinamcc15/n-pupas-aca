import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import {
  HashtagIcon,
  HomeIcon,
  IdentificationIcon,
  LockClosedIcon,
  PhoneIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid';

import { SolidCalendarIcon } from 'components/icons/SolidCalendarIcon';
import SectionTitle from 'components/information/section-title';
import PrimaryButton from 'components/buttons/primary';
import { titles } from 'constants/strings';
import { LocationIcon } from 'components/icons/LocationIcon';
import Input from './inputs/text-input';

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
      className='px-6 sm:px-16 md:px-20 py-10 sm:py-16 w-full max-w-[1000px] bg-white rounded-md shadow-lg flex flex-col gap-4'
    >
      {sectionIndex === 0 && (
        <section className='flex flex-col w-full gap-10'>
          <SectionTitle title={titles.personalData} />
          <div className='grid gap-5 md:grid md:grid-cols-2 mb-5 w-full mt-2'>
            <Input
              id='name'
              label='Nombre completo'
              placeholder='Ej. Luis Mario Gonzáles Castro'
              icon={<UserCircleIcon className='text-primary-500 w-5' />}
              error={errors?.name?.message}
              register={{
                ...register('name', {
                  required: 'Nombre requerido',
                  minLength: {
                    value: 8,
                    message: 'El mínimo de caracteres es 8',
                  },
                  maxLength: {
                    value: 50,
                    message: 'El máximo de caracteres es 80',
                  },
                }),
              }}
            />
            <Input
              id='DUI'
              label='DUI'
              placeholder='06210545-9'
              icon={<IdentificationIcon className='text-primary-500 w-5' />}
              error={errors?.DUI?.message}
              register={{
                ...register('DUI', {
                  required: 'DUI requerido',
                  pattern: {
                    value: /^\d{8}-\d{1}$/,
                    message: 'Formato de DUI inválido',
                  },
                }),
              }}
            />
            <Input
              id='NIT'
              label='NIT'
              placeholder='0079-911277-301-5'
              icon={<HashtagIcon className='text-primary-500 w-5' />}
              error={errors?.NIT?.message}
              register={{
                ...register('NIT', {
                  required: 'NIT requerido',
                  pattern: {
                    value: /^\d{4}-\d{6}-\d{3}-\d{1}$/,
                    message: 'Formato de NIT inválido',
                  },
                }),
              }}
            />
            <Input
              type='tel'
              id='phoneNumber'
              label='Número de teléfono'
              placeholder='78828090'
              icon={<PhoneIcon className='text-primary-500 w-5' />}
              error={errors?.phoneNumber?.message}
              register={{
                ...register('phoneNumber', {
                  required: 'Número de teléfono requerido',
                  pattern: {
                    value: /^\d{8}$/,
                    message: 'Número de teléfono inválido',
                  },
                }),
              }}
            />
          </div>
        </section>
      )}
      {sectionIndex === 1 && (
        <section className='flex flex-col w-full gap-10'>
          <SectionTitle title={titles.accountData} />
          <div className='grid gap-5 md:grid md:grid-cols-2 mb-5 w-full'>
            <div className='col-span-2'>
              <Input
                id='username'
                label='Correo Electrónico'
                placeholder='Ej. jmartinez@example.com'
                icon={<UserCircleIcon className='text-primary-500 w-5' />}
                error={errors?.username?.message}
                register={{
                  ...register('username', {
                    required: 'Correo electrónico requerido',
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                      message: 'Correo electrónico inválido',
                    },
                  }),
                }}
              />
            </div>
            <Input
              type='password'
              id='Password'
              label='Contraseña'
              placeholder='*************'
              icon={<LockClosedIcon className='text-primary-500 w-5' />}
              error={errors?.Password?.message}
              register={{
                ...register('Password', {
                  required: 'Contraseña requerida',
                  minLength: {
                    value: 6,
                    message: 'La contraseña debe tener un mínimo de 6 caracteres',
                  },
                }),
              }}
            />
            <Input
              type='password'
              id='password_repeat'
              label='Confirmar contraseña'
              placeholder='*************'
              icon={<LockClosedIcon className='text-primary-500 w-5' />}
              error={errors?.password_repeat?.message}
              register={{
                ...register('password_repeat', {
                  validate: value => value === password.current || 'Las contraseñas no coinciden',
                }),
              }}
            />
          </div>
        </section>
      )}
      {sectionIndex === 2 && (
        <div className='flex flex-col items-center gap-4'>
          <section className='flex flex-col w-full gap-10'>
            <SectionTitle title={titles.pupuseriaData} />
            <div className='grid gap-5 md:grid md:grid-cols-2 mb-5 w-full'>
              <Input
                id='namePupuseria'
                label='Nombre de pupusería'
                placeholder='La Bendición'
                icon={<StarIcon className='text-primary-500 w-5' />}
                error={errors?.namePupuseria?.message}
                register={{
                  ...register('namePupuseria', {
                    required: 'Nombre requerido',
                    minLength: {
                      value: 8,
                      message: 'El mínimo de caracteres es 8',
                    },
                    maxLength: {
                      value: 80,
                      message: 'El máximo de caracteres es 80',
                    },
                  }),
                }}
              />
              <Input
                id='nameBranch'
                label='Sucursal principal'
                placeholder='Los Próceres'
                icon={<HomeIcon className='text-primary-500 w-5' />}
                error={errors?.nameBranch?.message}
                register={{
                  ...register('nameBranch', {
                    required: 'Nombre requerido',
                    minLength: {
                      value: 8,
                      message: 'El mínimo de caracteres es 8',
                    },
                    maxLength: {
                      value: 80,
                      message: 'El máximo de caracteres es 80',
                    },
                  }),
                }}
              />
              <Input
                id='address'
                label='Dirección'
                placeholder='Bulevar de Los Próceres San Salvador'
                icon={<LocationIcon />}
                error={errors?.address?.message}
                register={{
                  ...register('address', {
                    required: 'Dirección requerida',
                    minLength: {
                      value: 6,
                      message: 'El mínimo de caracteres es 8',
                    },
                    maxLength: {
                      value: 80,
                      message: 'El máximo de caracteres es 80',
                    },
                  }),
                }}
              />
              
              <Input
                type='date'
                id='openingDate'
                label='Fecha de apertura'
                placeholder='12/10/2020'
                icon={<SolidCalendarIcon />}
                error={errors?.openingDate?.message}
                register={{
                  ...register('openingDate', { required: 'Fecha de apertura requerida' }),
                }}
              />
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
          className='font-bold text-xl bg-primary-500 px-2 rounded-md text-white disabled:bg-gray-400 disabled:opacity-60'
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
          className='font-bold text-xl bg-primary-500 px-2 rounded-md text-white disabled:bg-gray-400 disabled:opacity-60'
        >
          &gt;
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
