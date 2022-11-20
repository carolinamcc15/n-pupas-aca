import { useRouter } from 'next/router';

import ActionButton from 'components/buttons/actionButton';
import ReportsButton from 'components/buttons/edit';
import { adminRoutes } from 'routes/routes';
import { actionButtons } from 'constants/data';
import moment from 'moment/moment';

const EmployeeCard = ({ employee, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editEmployee}/${employee.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  const handleOnCreateComment = () => {
    router.push(`${adminRoutes.newReport}/${employee.id}`);
  };

  const handleOnSeeReports = () => {
    router.push(`${adminRoutes.reportEmployee}/${employee.id}`);
  };

  moment.locale('es');
  const hiringDate = moment(employee.hiringDate).format('D [de] MMMM [de] yyyy');

  return (
    <article className='bg-white shadow-md w-[357px]'>
      <div className='flex mb-2 justify-between'>
        <div className='flex flex-col mb-2 w-[100%]'>
          <h2 className=' bg-primary-500 py-4 pl-4 text-white text-4xl' >{employee.user.name}</h2>
        </div>
      </div>
      <div className='grid grid-cols-5 mt-4 mb-8'>
          <p className='col-span-1 text-primary-300 pl-4'>Nombre</p>
          <p className='col-span-4 pl-8'>{employee.user.name}</p>
          <p className='col-span-1 text-primary-300 pl-4'>Salario</p>
          <p className='col-span-4 pl-8'>{`$${employee.salary}`}</p>
          <p className='col-span-1 text-primary-300 pl-4'>Usuario</p>
          <p className='col-span-4 pl-8'>{employee.user.username}</p>
          <p className='col-span-1 text-primary-300 pl-4'>Desde</p>
          <p className='col-span-4 pl-8'>{hiringDate}</p>
      </div>

      <div className='flex justify-end gap-2 mr-4 mb-2'>
        <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
        <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        <ActionButton
          actionElements={actionButtons.comment}
          onClickHandler={handleOnCreateComment}
        />
        <ActionButton actionElements={actionButtons.reports} onClickHandler={handleOnSeeReports} />
      </div>
    </article>
  );
};

export default EmployeeCard;
