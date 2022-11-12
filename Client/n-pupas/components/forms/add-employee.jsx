import { useForm } from 'react-hook-form';
import { useRef } from 'react';

import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';
import { CurrencyDollarIcon, LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { SolidCalendarIcon } from 'components/icons/SolidCalendarIcon';

const AddEmployeeForm = ({ onSubmitHandler, employee = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('Password', '');

  const onSubmit = data => {
    onSubmitHandler(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full md:max-w-[900px] mx-auto flex flex-col gap-2'
    >
      <section className='flex flex-col gap-5 mb-5 px-0 sm:px-3'>
        <Input
          id='name'
          label='Nombre completo'
          defaultValue={employee ? employee.user.name : ''}
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
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            }),
          }}
        />
        <div className='flex flex-col gap-5 md:grid md:grid-cols-2'>
          <Input
            type='date'
            id='hiringDate'
            defaultValue={employee ? employee.hiringDate : ''}
            label='Contratación'
            placeholder='12/10/2020'
            icon={<SolidCalendarIcon />}
            error={errors?.hiringDate?.message}
            register={{ ...register('hiringDate', { required: 'Fecha requerida' }) }}
          />
          <Input
            id='salary'
            label='Salario'
            defaultValue={employee ? employee.salary : ''}
            placeholder='500'
            icon={<CurrencyDollarIcon className='text-primary-500 w-5' />}
            error={errors?.salary?.message}
            register={{
              ...register('salary', {
                required: 'Salario requerido',
                min: { value: 0.01, message: 'La cantidad debe ser mayor a $0.01' },
              }),
            }}
          />
        </div>
      </section>
      <div className='w-full h-[1px] bg-primary-300 mb-2'></div>
      <section className='flex flex-col gap-5 mb-5 px-0 sm:px-3'>
        <Input
          id='username'
          label='Nombre de usuario'
          defaultValue={employee ? employee.user.username : ''}
          placeholder='Ej. jmartinez'
          icon={<UserCircleIcon className='text-primary-500 w-5' />}
          error={errors?.username?.message}
          register={{
            ...register('username', {
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
            }),
          }}
        />
        <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
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
      <div className='m-auto'>
        <PrimaryButton text={employee ? 'Actualizar empleado' : 'Agregar empleado'} />
      </div>
    </form>
  );
};
export default AddEmployeeForm;
