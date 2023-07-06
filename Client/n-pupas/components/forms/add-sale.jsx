import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';

const AddSaleForm = ({ onSubmitHandler, product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = data => {
    onSubmitHandler(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5'>
      {product.type.id === 1 && (
        <div>
          <p className='mb-1 text-sm'>Tipo de masa</p>
          <div className='flex gap-6'>
            <label htmlFor='rice'>
              <input
                {...register('dough', { required: true })}
                type='radio'
                name='dough'
                value={1}
                className='mr-1'
                id='rice'
              />
              Arroz
            </label>
            <label htmlFor='corn'>
              <input
                {...register('dough', { required: 'Selecciona el tipo de masa' })}
                type='radio'
                name='dough'
                value={0}
                className='mr-1'
                id='corn'
              />
              Maíz
            </label>
          </div>
          {errors.dough && <p className='mt-1 text-red-700'>{errors.dough.message}</p>}
        </div>
      )}

      <div>
        <p className='mb-1 text-sm'>Cantidad</p>
        <input
          type='number'
          placeholder='Cantidad'
          defaultValue={1}
          min={1}
          className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
          {...register('quantity', {
            required: 'Cantidad requerida',
            min: { value: 1, message: 'La cantidad debe ser mayor a 1' },
          })}
        />
        {errors.quantity && <p className='mt-1 text-red-700'>{errors.quantity.message}</p>}
      </div>
      <PrimaryButton text='Agregar producto' />
    </form>
  );
};

export default AddSaleForm;
