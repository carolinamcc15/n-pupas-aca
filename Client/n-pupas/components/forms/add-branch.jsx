import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';

const AddBranchForm = ({ onSubmitHandler, branch = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    onSubmitHandler(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
    >
      <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
        <div>
          <input
            type='text'
            placeholder='Nombre'
            defaultValue={branch ? branch.name : ''}
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('nameBranch', {
              required: 'Nombre requerido',
              maxLength: {
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            })}
          />
          {errors.nameBranch && <p className='mt-1 text-red-700'>{errors.nameBranch.message}</p>}
        </div>
        <div>
          <input
            type='text'
            placeholder='Fecha de apertura'
            defaultValue={branch ? branch.openingDate : ''}
            onFocus={e => (e.target.type = 'date')}
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('openingDate', { required: 'Fecha de apertura requerida' })}
          />
          {errors.openingDate && <p className='mt-1 text-red-700'>{errors.openingDate.message}</p>}
        </div>
        <div className='md:col-span-2'>
          <input
            type='text'
            placeholder='Dirección'
            defaultValue={branch ? branch.address : ''}
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('address', {
              required: 'Dirección requerida',
              maxLength: {
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            })}
          />
          {errors.address && <p className='mt-1 text-red-700'>{errors.address.message}</p>}
        </div>
      </div>

      <PrimaryButton text={branch ? 'Guardar' : 'Agregar'} />
    </form>
  );
};

export default AddBranchForm;
