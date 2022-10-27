import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';

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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <div>
        <input
          type='text'
          placeholder='Usuario'
          className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
          {...register('username', {
            required: 'Usuario requerido',
            maxLength: {
              value: 80,
              message: 'El máximo de caracteres es 80',
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
          {...register('password', {
            required: 'Contraseña requerida',
          })}
        />
        {errors.password && <p className='mt-1 text-red-700'>{errors.password.message}</p>}
      </div>
      <PrimaryButton text='Ingresar' />
    </form>
  );
};

export default LoginForm;
