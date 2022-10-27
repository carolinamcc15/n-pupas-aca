import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';

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
      {product && (
        <div className='mb-6'>
          <img
            src={product.image ? `data:image/jpeg;base64,${product.image}` : '/no-image.jpg'}
            alt={product.name}
            className='w-[100px] xs:w-[100px] object-cover m-auto'
          />
          <p className='text-center text-gray-600 mt-1'>Imagen actual</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
      >
        <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-5'>
          <div>
            <input
              type='text'
              placeholder='Nombre'
              defaultValue={product ? product.name : ''}
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
              {...register('nameProduct', {
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
            {errors.nameProduct && (
              <p className='mt-1 text-red-700'>{errors.nameProduct.message}</p>
            )}
          </div>
          <div>
            <input
              type='number'
              placeholder='Precio'
              step={0.01}
              defaultValue={product ? product.price : ''}
              className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
              {...register('price', {
                required: 'Precio requerido',
                min: { value: 0.01, message: 'La cantidad debe ser mayor a $0.01' },
              })}
            />
            {errors.price && <p className='mt-1 text-red-700'>{errors.price.message}</p>}
          </div>
          <div>
            <select
              defaultValue={product ? product.type.id : ''}
              className='shadow border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
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
          <div>
            <input
              type='file'
              id='files'
              placeholder='Imagen'
              accept='image/png, image/jpeg'
              className=' shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
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
            <p className='mt-1 text-gray-600'>
              {product
                ? '* La imagen actual se mantiene si no llenas este campo'
                : '* Imagen opcional'}
            </p>
            {errors.image && <p className=' text-red-700'>{errors.image.message}</p>}
          </div>
        </div>

        <PrimaryButton text={product ? 'Guardar' : 'Agregar'} />
      </form>
    </div>
  );
};

export default AddProductForm;
