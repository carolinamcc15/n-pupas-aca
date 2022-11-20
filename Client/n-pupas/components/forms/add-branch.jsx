import { HomeIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

import { LocationIcon } from 'components/icons/LocationIcon';
import { SolidCalendarIcon } from 'components/icons/SolidCalendarIcon';
import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';

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
      <div className='flex flex-col gap-5 mb-5 px-0 sm:px-4'>
        <Input
          id='nameBranch'
          label='Nombre de sucursal'
          defaultValue={branch ? branch.name : ''}
          placeholder='Ej. Los Próceres'
          icon={<HomeIcon className='text-primary-500 w-5' />}
          error={errors?.nameBranch?.message}
          register={{
            ...register('nameBranch', {
              required: 'Nombre requerido',
              maxLength: {
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            }),
          }}
        />
        <Input
          type='date'
          id='openingDate'
          label='Fecha de apertura'
          placeholder='12/03/2021'
          defaultValue={branch ? branch.openingDate : ''}
          icon={<SolidCalendarIcon className='text-primary-500 w-5' />}
          error={errors?.openingDate?.message}
          register={{ ...register('openingDate', { required: 'Fecha de apertura requerida' }) }}
        />
        <Input
          id='address'
          label='Dirección'
          defaultValue={branch ? branch.address : ''}
          placeholder='Bulevar de Los Próceres San Salvador'
          icon={<LocationIcon />}
          error={errors?.address?.message}
          register={{
            ...register('address', {
              required: 'Dirección requerida',
              minLength: {
                value: 6,
                message: 'El mínimo de caracteres es 8',
              },
              maxLength: {
                value: 80,
                message: 'El máximo de caracteres es 80',
              },
            }),
          }}
        />
      </div>
      <div className='mt-6 sm:mt-8 m-auto'>
        <PrimaryButton text={branch ? 'Actualizar sucursal' : 'Agregar sucursal'} />
      </div>
    </form>
  );
};

export default AddBranchForm;
