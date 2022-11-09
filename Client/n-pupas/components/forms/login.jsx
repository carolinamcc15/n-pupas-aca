import { LockClosedIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';

const LoginForm = ({ onSubmitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    onSubmitHandler(data);
    //reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 items-center justify-center w-full sm:px-4'>
      <Input
        id='username'
        label='USUARIO'
        placeholder='Ej. janedoe'
        icon={<UserCircleIcon className='text-primary-500 w-5' />}
        error={errors?.username?.message}
        register={{
          ...register('username', {
            required: 'Nombre de usuario requerido',
          }),
        }}
      />
      <Input
        id='password'
        label='CONTRASEÑA'
        placeholder='Digite su contraseña'
        icon={<LockClosedIcon className='text-primary-500 w-5' />}
        error={errors?.password?.message}
        register={{
          ...register('password', {
            required: 'Contraseña requerida',
          }),
        }}
        type='password'
      />
      <div className='mt-6 sm:mt-8'>
        <PrimaryButton text='Ingresar' />
      </div>
    </form>
  );
};

export default LoginForm;
