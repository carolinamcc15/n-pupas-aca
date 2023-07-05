import { ClockIcon, HomeIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

import { SolidCalendarIcon } from 'components/icons/SolidCalendarIcon';
import PrimaryButton from 'components/buttons/primary';
import Input from './inputs/text-input';
import { formatDate } from 'utils/utils';

const AddBranchForm = ({ onSubmitHandler, branch = false }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    onSubmitHandler(data);
  };

  console.log(branch);
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
          defaultValue={branch ? formatDate(branch.openingDate) : ''}
          icon={<SolidCalendarIcon className='text-primary-500 w-5' />}
          error={errors?.openingDate?.message}
          register={{ ...register('openingDate', { required: 'Fecha de apertura requerida' }) }}
        />
        <div className='flex justify-between gap-5 md:gap-10'>
          <Input
            id='openingTime'
            label='Hora de apertura (24h)'
            defaultValue={branch ? branch.openingTime : ''}
            placeholder='HH:MM'
            icon={<ClockIcon className='text-primary-500 w-5' />}
            type='time'
            error={errors?.openingTime?.message}
            register={{ ...register('openingTime', { required: 'Campo requerido' }) }}
          />
          <Input
            id='closingTime'
            label='Hora de cierre (24h)'
            defaultValue={branch ? branch.closingTime : ''}
            placeholder='HH:MM'
            icon={<ClockIcon className='text-primary-500 w-5' />}
            type='time'
            error={errors?.openingTime?.message}
            register={{ ...register('closingTime', { required: 'Campo requerido' }) }}
          />
        </div>
      </div>
      <div className='mt-6 sm:mt-8 m-auto'>
        <PrimaryButton text={branch ? 'Actualizar sucursal' : 'Agregar sucursal'} />
      </div>
    </form>
  );
};

export default AddBranchForm;