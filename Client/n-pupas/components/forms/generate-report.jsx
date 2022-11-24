import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';
import Input from './inputs/text-input';
import { LockClosedIcon, CalendarDaysIcon } from '@heroicons/react/24/solid';

const GenerateReportForm = ({ onSubmitHandler }) => {
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
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-5 items-center justify-center w-full sm:px-4'>
      <div className='flex flex-col gap-5 md:flex-col mb-10'>
        <div>
          <p className='text-center gap-5 mb-10'>
           El reporte de ingresos y egresos será generados en un archivo de formato PDF
          </p>
          <Input
            id='initialDate'
            label="FECHA DE INICIO"
            placeholder='12/07/2022'
            icon={<CalendarDaysIcon className='text-primary-500 w-5' />}
            error={errors?.initialDate?.message}
            type='date'
            register={{
              ...register('initialDate', { 
                required: 'Fecha inicial requerida',
            }),
            }}
          />
          <Input
            id='finalDate'
            label="FECHA DE FIN"
            placeholder='24/07/2022'
            icon={<CalendarDaysIcon className='text-primary-500 w-5' />}
            error={errors?.finalDate?.message}
            type='date'
            register={{
              ...register('finalDate', { 
                required: 'Fecha final requerida',
            }),
            }}
          />
          {errors.finalDate && <p className='mt-1 text-red-700'>{errors.finalDate.message}</p>}
        </div>
      </div>

      <PrimaryButton text='Generar reportes' />


    </form>

    /*
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
    >
      <div className='flex flex-col gap-5 md:grid md:grid-cols-2 mb-2'>
        <div>
          <input
            type='date'
            placeholder='Desde'
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('initialDate', { required: 'Fecha de inicio requerida' })}
          />
          {errors.initialDate && (
            <p className='mt-1 text-red-700'>{errors.initialDate.message}</p>
          )}
        </div>
        <div>
          <input
            type='date'
            placeholder='Hasta'
            className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
            {...register('finalDate', { required: 'Fecha final requerida' })}
          />
          {errors.finalDate && <p className='mt-1 text-red-700'>{errors.finalDate.message}</p>}
        </div>
      </div>

      <PrimaryButton text='Generar reportes' />
    </form>*/
  );
};

export default GenerateReportForm;
