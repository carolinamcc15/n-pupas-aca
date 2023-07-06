import { useRouter } from 'next/router';

import ActionButton from 'components/buttons/actionButton';
import { adminRoutes } from 'routes/routes';
import { actionButtons } from 'constants/data';
import { formatDate } from 'utils/utils';

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
        <div className='bg-primary-500 flex justify-between items-center'>
          <h2 className='font-bold text-xl  text-white py-3 pl-4'>{branch.name}</h2>
          {branch.open ? (
            <p className='bg-green-500 mr-4 uppercase font-bold text-xs p-1 rounded-md text-white'>
              Abierto
            </p>
          ) : (
            <p className='bg-red-500 mr-4 uppercase font-bold text-xs p-1 rounded-md text-white'>
              Cerrado
            </p>
          )}
        </div>
        <div className='grid grid-cols-5 gap-3 p-4'>
          <p className='ml-4 w-4 col-span-1 text-primary-300'> Dirección </p>
          <p className='ml-10 col-span-4'> {branch.address} </p>
          <p className='ml-4 col-span-1 text-primary-300'> Apertura </p>
          <p className='ml-10 col-span-4'> {formatDate(branch.openingDate, true)} </p>
          <p className='ml-4 col-span-1 text-primary-300'> Horario </p>
          <p className='ml-10 col-span-4'>
            {' '}
            {branch.openingTime} - {branch.closingTime}{' '}
          </p>
        </div>
        <div className='flex gap-2 justify-end mr-4 pb-4'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default BranchCard;
