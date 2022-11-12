import { useRouter } from 'next/router';

import ActionButton from 'components/buttons/actionButton';
import ReportsButton from 'components/buttons/edit';
import { adminRoutes } from 'routes/routes';
import { actionButtons } from 'constants/data';

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

  return (
    <article className='bg-white shadow-md p-4'>
      <div className='flex mb-2 justify-between'>
        <div className='flex flex-col mb-2'>
          <h2 className='font-bold'>{employee.user.name}</h2>
          <p> {`Empleado desde: ${employee.hiringDate}`} </p>
          <p> {`Salario: $${employee.salary}`} </p>
        </div>
        <ReportsButton id={employee.id} />
      </div>

      <div className='flex gap-2'>
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
