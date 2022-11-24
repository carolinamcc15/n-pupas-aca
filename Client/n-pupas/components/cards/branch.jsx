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
    <article className='bg-white shadow-md min-w-96'>
      <div className='flex flex-col mb-2'>
        <h2 className='font-bold text-3xl bg-primary-500 text-white py-5 pl-4'>{branch.name}</h2>
        <div className='grid grid-cols-5 gap-3'>
          <p className='ml-4 my-4 w-4 col-span-1 text-primary-300'> Dirección </p>
          <p className='ml-12 mt-4 col-span-4'> {branch.address} </p>
          <p className='ml-4 my-2 col-span-1 text-primary-300'> Apertura </p>
          <p className='ml-12 my-2 col-span-4'> {branch.openingDate} </p>
        </div>
        <div className='flex gap-2 mt-12 justify-end mr-4 mb-1/2'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
