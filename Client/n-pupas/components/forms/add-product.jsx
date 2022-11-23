import { useForm } from 'react-hook-form';

import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';
import { CurrencyDollarIcon, LightBulbIcon } from '@heroicons/react/24/solid';

const AddProductForm = ({ onSubmitHandler, productTypes, product = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    onSubmitHandler(data);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
      >
        <div className='flex flex-col gap-5 mb-5 px-0 sm:px-4'>
          <Input
            id='nameProduct'
            label='Nombre'
            defaultValue={product ? product.name : ''}
            placeholder='Ej. Pupusa revuelta'
            icon={<LightBulbIcon className='text-primary-500 w-5' />}
            error={errors?.nameProduct?.message}
            register={{
              ...register('nameProduct', {
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
            id='price'
            label='Precio ($)'
            defaultValue={product ? product.price : ''}
            placeholder='0.85'
            icon={<CurrencyDollarIcon className='text-primary-500 w-5' />}
            error={errors?.price?.message}
            register={{
              ...register('price', {
                required: 'Precio requerido',
                min: { value: 0.01, message: 'La cantidad debe ser mayor a $0.01' },
              }),
            }}
          />
          <div>
            <label htmlFor='category' className='mb-5 text-xs text-primary-500 uppercase'>
              Tipo de alimento
            </label>
            <select
              id='category'
              defaultValue={product ? product.type.id : ''}
              className='text-primary-500 mt-1 bg-primary-100 rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-2 focus:border-primary-300 placeholder:font-light placeholder:text-primary-400'
              {...register('typeID', { required: 'Categoría requerida' })}
            >
              {productTypes.map(type => {
                return (
                  <option key={type.id} value={type.id}>
                    {type.type}
                  </option>
                );
              })}
            </select>
            {errors.typeID && <p className='mt-1 text-red-700'>{errors.typeID.message}</p>}
          </div>
          <div className='flex gap-3 items-center'>
            {product && (
              <img
                src={product.image ? `data:image/jpeg;base64,${product.image}` : '/no-image.jpg'}
                alt={product.name}
                className='w-[60px] xs:w-[70px] object-cover m-auto'
              />
            )}
            <div>
              <label htmlFor='files' className='mb-5 text-xs text-primary-500 uppercase'>
                {product ? 'Nueva imagen (opcional)' : 'Imagen (opcional)'}
              </label>
              <input
                type='file'
                id='files'
                placeholder='Imagen'
                accept='image/png, image/jpeg'
                className='text-primary-500 mt-1 bg-primary-100 rounded w-full py-3 px-3 leading-tight focus:outline-none focus:border-2 focus:border-primary-300 placeholder:font-light placeholder:text-primary-400'
                {...register('image', {
                  required: false,
                  validate: {
                    lessThan10MB: files =>
                      !files[0]?.size || files[0]?.size < 5000000 || 'El máximo es de 5MB',
                    acceptedFormats: files =>
                      !files[0]?.size ||
                      ['image/jpeg', 'image/png'].includes(files[0]?.type) ||
                      'La imagen debe ser PNG o JPEG',
                  },
                })}
              />
              {errors.image && <p className=' text-red-700'>{errors.image.message}</p>}
            </div>
          </div>
        </div>

        <div className='mt-3 sm:mt-5 m-auto'>
          <PrimaryButton text={product ? 'Actualizar producto' : 'Agregar producto'} />
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
