import { CurrencyDollarIcon, LightBulbIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

import { SolidCalendarIcon } from 'components/icons/SolidCalendarIcon';
import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';

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
      <div className='flex flex-col gap-5 mb-5 px-0 sm:px-4'>
        <Input
          id='concept'
          label='Concepto'
          defaultValue={purchase ? purchase.concept : ''}
          placeholder='Ej. Libra de frijoles'
          icon={<LightBulbIcon className='text-primary-500 w-5' />}
          error={errors?.concept?.message}
          register={{
            ...register('concept', {
              required: 'Concepto requerido',
              maxLength: {
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            }),
          }}
        />

        <div>
          <Input
            type='date'
            id='purchaseDate'
            defaultValue={purchase ? purchase.purchaseDate : ''}
            label='Fecha de compra'
            placeholder='12/10/2020'
            icon={<SolidCalendarIcon />}
            error={errors?.purchaseDate?.message}
            register={{ ...register('purchaseDate', { required: 'Fecha y hora requeridas' }) }}
          />
        </div>
        <div>
          <Input
            id='amount'
            label='Monto ($)'
            defaultValue={purchase ? purchase.amount : ''}
            placeholder='55'
            icon={<CurrencyDollarIcon className='text-primary-500 w-5' />}
            error={errors?.amount?.message}
            register={{
              ...register('amount', {
                required: 'Monto requerido',
                min: { value: 0.01, message: 'La cantidad debe ser mayor a $0.01' },
              }),
            }}
          />
        </div>
      </div>
      <div className='mt-6 sm:mt-8 m-auto'>
        <PrimaryButton text={purchase ? 'Actualizar compra' : 'Agregar compra'} />
      </div>
    </form>
  );
};

export default AddPurchaseForm;
