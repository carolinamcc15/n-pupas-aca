import { useRouter } from 'next/router';

import ActionButton from 'components/buttons/actionButton';
import { adminRoutes } from 'routes/routes';
import { actionButtons } from 'constants/data';

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
        <div className='flex gap-2'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
