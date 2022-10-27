import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';

const AddPurchaseForm = ({ onSubmitHandler, purchase = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        <div className='md:col-span-2'>
          <input
            type='text'
            placeholder='Concepto'
            defaultValue={purchase ? purchase.concept : ''}
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('concept', {
              required: 'Concepto requerido',
              maxLength: {
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            })}
          />
          {errors.concept && <p className='mt-1 text-red-700'>{errors.concept.message}</p>}
        </div>
        <div>
          <input
            type='text'
            placeholder='Fecha'
            defaultValue={purchase ? purchase.purchaseDate : ''}
            onFocus={e => (e.target.type = 'date')}
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('purchaseDate', { required: 'Fecha y hora requeridas' })}
          />
          {errors.purchaseDate && (
            <p className='mt-1 text-red-700'>{errors.purchaseDate.message}</p>
          )}
        </div>
        <div>
          <input
            type='number'
            step={0.01}
            placeholder='Monto'
            defaultValue={purchase ? purchase.amount : ''}
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('amount', {
              required: 'Monto requerido',
              min: { value: 0.01, message: 'La cantidad debe ser mayor a $0.01' },
            })}
          />
          {errors.amount && <p className='mt-1 text-red-700'>{errors.amount.message}</p>}
        </div>
      </div>

      <PrimaryButton text='Agregar' />
    </form>
  );
};

export default AddPurchaseForm;
