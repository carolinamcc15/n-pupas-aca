
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
      className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'
    >
      <div>
        <textarea
          type='text'
          placeholder='Escribe tu comentario o reporte...'
          defaultValue={report ? report.comment : ''}
          rows='8'
          className='shadow appearance-none border border-gray-400 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-2 focus:border-secondary-500'
          {...register('comment', {
            required: 'Comentario o reporte requerido',
          })}
        />
        {errors.comment && <p className='mt-1 text-red-700'>{errors.comment.message}</p>}
      </div>
      <PrimaryButton text={report ? 'Guardar cambios' : 'Enviar'} />
    </form>
  );
};

export default AddEmployeeReportForm;
