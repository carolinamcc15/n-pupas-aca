import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';
import ActionButton from 'components/buttons/actionButton';
import { actionButtons } from 'constants/data';

const ReportECard = ({ comment, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editReport}/${comment.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md p-4'>
    
      <p className='mb-1'>{comment.comment}</p>
      <div className='flex flex-row gap-2 justify-end pr-2 '>
        <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
        <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        <span className='font-light text-gray-700 text-sm bg-gray-100 py-1 px-2 rounded-full'>{comment.reportDate}</span>
      </div>
    </article>
  );
};

export default ReportECard;
