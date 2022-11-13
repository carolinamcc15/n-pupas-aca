import { useRouter } from 'next/router';

import { adminRoutes } from 'routes/routes';
import ActionButton from 'components/buttons/actionButton';
import { actionButtons } from 'constants/data';

const PurchaseTableRow = ({ purchase, extended = false, onDeleteHandler = null }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editPurchase}/${purchase.id}`);
  };

  const handleOnDelete = () => {
    if (onDeleteHandler) {
      onDeleteHandler(purchase.id);
    }
  };

  return (
    <tr className='bg-white border-[1px] border-primary-300'>
      <td className='text-center px-3 py-2 font-bold whitespace-nowrap border-r-[1px] border-primary-300 truncate'>
        {purchase.concept}
      </td>
      <td className='px-3 py-2  font-bold border-primary-300 border-r-[1px] whitespace-nowrap'>
        ${purchase.amount.toFixed(2)}
      </td>
      {extended && (
        <>
          <td className='text-center px-3 py-2 font-bold whitespace-nowrap border-r-[1px] border-primary-300 truncate'>
            {purchase.purchaseDate}
          </td>
          <td className='flex justify-center items-center px-3 py-2 gap-2 whitespace-nowrap'>
            <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
            <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
          </td>
        </>
      )}
    </tr>
  );
};

export default PurchaseTableRow;
