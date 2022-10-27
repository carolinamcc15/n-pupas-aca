import SectionTitle from 'components/information/section-title';
import PrimaryButton from 'components/buttons/primary';
import { titles } from 'constants/strings';
import { useForm } from 'react-hook-form';
import { useRef} from 'react';

const AddEmployeeForm = ({ onSubmitHandler, employee = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();
  
  const password = useRef({});
  password.current = watch('Password', '');

  const onSubmit = data => {
    onSubmitHandler(data);
  };


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
    >
      <section className='flex flex-col gap-4'>
        <SectionTitle title={titles.personalData} />
        <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
          <div>
            <input
              type='text'
              placeholder='Nombre'
              defaultValue={employee ? employee.user.name : ''}
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
              {...register('name', {
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
            {errors.name && <p className='mt-1 text-red-700'>{errors.name.message}</p>}
          </div>
        
          <div>
            <input
              type='text'
              placeholder='Nombre de usuario'
              defaultValue={employee ? employee.user.username : ''}
              className= 'shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
              {...register('userName', {
                required: 'Nombre de usuario requerido',
                minLength: {
                  value: 10,
                  message: 'El mínimo de caracteres es 10',
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]{10,20}$/,
                  message: 'Algunos caracteres son inválidos',
                },
              })}
            />
            {errors.userName && <p className='mt-1 text-red-700'>{errors.userName.message}</p>}
          </div>
          <div>
            <input
              type='text'
              placeholder='Fecha de contratación'
              defaultValue={employee ? employee.hiringDate : ''}
              onFocus={e => (e.target.type = 'date')}
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
              {...register('hiringDate', { required: 'Fecha requerida' })}
            />
            {errors.hiringDate && <p className='mt-1 text-red-700'>{errors.hiringDate.message}</p>}
          </div>
          <div>
            <input
              type='number'
              placeholder='Salario'
              defaultValue={employee ? employee.salary : ''}
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
              {...register('salary', { required: 'Salario requerido',
                min: { value: 0.01, message: 'La cantidad debe ser mayor a $0.01' },
              })}
            />
            {errors.salary && <p className='mt-1 text-red-700'>{errors.salary.message}</p>}
          </div>
        </div>
      </section>
      <section className='flex flex-col gap-4'>
        <SectionTitle title={titles.accountData} />
        <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
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
              {errors.password && <p className='mt-1 text-red-700'>{errors.password.message}</p>}
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
      <PrimaryButton text={employee ? 'Guardar' : 'Agregar'} />
    </form>
  );


};
export default AddEmployeeForm;