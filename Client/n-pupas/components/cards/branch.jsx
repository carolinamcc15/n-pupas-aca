import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';

const BranchCard = ({ branch, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editBranch}/${branch.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md p-4'>
      <div className='flex flex-col mb-2'>
        <h2 className='font-bold'>{branch.name}</h2>
        <p> {branch.address} </p>
        <p> {`Desde: ${branch.openingDate}`} </p>
        <div>
          <CrudButton actionType={crudActionTypes.update} onClickHandler={handleOnModify} />
          <CrudButton actionType={crudActionTypes.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
