import { useRouter } from 'next/router';

import ActionButton from 'components/buttons/actionButton';
import { adminRoutes } from 'routes/routes';
import { actionButtons } from 'constants/data';

const TaskCard = ({ task, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editTask}/${task.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  const taskinitDate = new Date(task.initdate); // Suponiendo que task.date contiene la fecha en formato ISO 8601
  const taskfinishDate = new Date(task.finishdate);

  const formattedInitDate = `${taskinitDate.getFullYear()}-${(taskinitDate.getMonth() + 1)
  .toString()
  .padStart(2, '0')}-${taskinitDate.getDate().toString().padStart(2, '0')}`;

  const formattedFinishDate = `${taskfinishDate.getFullYear()}-${(taskfinishDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${taskfinishDate.getDate().toString().padStart(2, '0')}`;
  

  return (
    <article className='bg-white shadow-md min-w-96'>
      <div className='flex flex-col mb-2'>
        <h2 className='font-bold text-3xl bg-primary-500 text-white py-5 pl-4'>Tarea {task.id}</h2>
        <div className='grid grid-cols-5 gap-3'>
          <p className='ml-4 my-4 w-4 col-span-1 text-primary-300'> Descripción </p>
          <p className='ml-12 mt-4 col-span-4'> {task.taskdescription} </p>
          <p className='ml-4 my-2 col-span-1 text-primary-300'> Fecha Inicio </p>
          <p className='ml-12 my-2 col-span-4'> {formattedInitDate} </p>
          <p className='ml-4 my-2 col-span-1 text-primary-300'> Fecha Fin </p>
          <p className='ml-12 my-2 col-span-4'> {formattedFinishDate} </p>
          <p className='ml-4 my-2 col-span-1 text-primary-300'> Status </p>
          <p className='ml-12 my-2 col-span-4'> {task.status} </p>
        </div>
        <div className='flex gap-2 mt-12 justify-end mr-4 mb-1/2'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;