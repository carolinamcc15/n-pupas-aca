import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';

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
      <p className='font-light text-gray-700 text-sm'>{comment.reportDate}</p>
      <p className='mb-1'>{comment.comment}</p>
      <div>
        <CrudButton actionType={crudActionTypes.update} onClickHandler={handleOnModify} />
        <CrudButton actionType={crudActionTypes.delete} onClickHandler={handleOnDelete} />
      </div>
    </article>
  );
};

export default ReportECard;
