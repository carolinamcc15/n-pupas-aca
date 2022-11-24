
import PrimaryButton from 'components/buttons/primary';
import { useForm } from 'react-hook-form';

const AddEmployeeReportForm = ({ onSubmitHandler, report = false }) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full mx-auto flex flex-col gap-4 place-items-center'
    >
      <div className="w-full">
        <textarea
          type='text'
          placeholder='Escribe tu comentario o reporte...'
          defaultValue={report ? report.comment : ''}
          rows='8'
          className='shadow appearance-none border border-gray-400 bg-primary-100 rounded-lg w-full py-4 px-5 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
          {...register('comment', {
            required: 'Comentario o reporte requerido',
          })}
        />
        {errors.comment && <p className='mt-1 text-red-700'>{errors.comment.message}</p>}
      </div>
      <div className=' screen-ful padding px-6 '>
        <PrimaryButton text={report ? 'Guardar cambios' : 'Generar reporte'} />
      </div>
    </form>
  );
};

export default AddEmployeeReportForm;
