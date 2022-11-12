import { useRouter } from 'next/router';

import { adminRoutes } from 'routes/routes';
import ActionButton from 'components/buttons/actionButton';
import { actionButtons } from 'constants/data';

const PurchaseCard = ({ purchase, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editPurchase}/${purchase.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md p-4'>
      <div className='flex flex-col mb-2'>
        <div className='flex justify-between gap-4'>
          <h2 className='font-bold'>{purchase.concept}</h2>
          <p className='font-bold'> ${purchase.amount.toFixed(2)} </p>
        </div>
        <p className='text-sm mt-1'>{purchase.purchaseDate}</p>
        <div className='flex gap-2'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default PurchaseCard;
