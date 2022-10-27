import { crudActionTypes } from 'constants/strings';
import ReportsButton from 'components/buttons/edit';
import CrudButton from 'components/buttons/crud';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';

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
      <div>
        <CrudButton actionType={crudActionTypes.create} onClickHandler={handleOnCreateComment} />
        <CrudButton actionType={crudActionTypes.update} onClickHandler={handleOnModify} />
        <CrudButton actionType={crudActionTypes.delete} onClickHandler={handleOnDelete} />
      </div>
    </article>
  );
};

export default EmployeeCard;
