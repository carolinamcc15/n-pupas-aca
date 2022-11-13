import { useRouter } from 'next/router';

import { adminRoutes } from 'routes/routes';
import ActionButton from 'components/buttons/actionButton';
import { actionButtons } from 'constants/data';
import useToggle from 'hooks/useToggle';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';

const SaleCard = ({ sale, total, onDeleteHandler }) => {
  const [isExpanded, toggleIsExpanded] = useToggle();
  const router = useRouter();

  const handleOnUpdate = () => {
    router.push(`${adminRoutes.editSale}/${sale.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md cursor-pointer'>
      <div
        onClick={() => toggleIsExpanded(!isExpanded)}
        className={`${
          isExpanded ? 'bg-primary-300 bg-opacity-10' : 'bg-white'
        } shadow-md p-4 flex flex-col gap-1.5`}
      >
        <div className='flex justify-between'>
          <h1 className='text-primary-500 font-semibold '>Venta #{sale.id}</h1>
          <p className='text-primary-500 font-semibold '>${total.toFixed(2)}</p>
          {isExpanded ? <ChevronUpIcon className='w-6' /> : <ChevronDownIcon className='w-6' />}
        </div>
        <p className='font-light text-sm'>{` ${sale.saleDate}`}</p>
      </div>
      {isExpanded && (
        <div className='p-4 pt-3'>
          {sale.details.length > 0 ? (
            sale.details.map(detail => {
              return (
                <div
                  key={detail.id}
                  className='font-medium flex flex-auto justify-between items-start mt-4 border-l-2 border-primary-500 border-opacity-50 pl-2'
                >
                  <div>
                    <p>
                      {detail.product.name} x{detail.amount}
                    </p>
                    {detail.massDetails && detail.massDetails.mass && (
                      <p className='text-gray-500 text-sm'>{detail.massDetails.mass.mass}</p>
                    )}
                  </div>

                  <p>{`$${detail.total.toFixed(2)}`}</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
          <div className='flex gap-5 mt-5 justify-center'>
            <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnUpdate} />
            <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
          </div>
        </div>
      )}
    </article>
  );
};

export default SaleCard;
