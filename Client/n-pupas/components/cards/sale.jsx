import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';

const SaleCard = ({ sale, total, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnUpdate = () => {
    router.push(`${adminRoutes.editSale}/${sale.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md p-4'>
      <div className='flex flex-col mb-2  '>
        <h1 className='text-gray-500 font-bold text-xl'>Venta #{sale.id}</h1>
        <p>{` ${sale.saleDate}`}</p>
        {sale.details.length > 0 &&
          sale.details.map(detail => {
            return (
              <div key={detail.id} className='font-medium flex flex-auto justify-between items-start mt-4 border-l-2 border-primary-500 border-opacity-50 pl-2'>
                <div>
                  <p>
                    {detail.product.name} x{detail.amount}
                  </p>
                  {(detail.massDetails && detail.massDetails.mass) && <p className='text-gray-500 text-sm'>{detail.massDetails.mass.mass}</p>}
                </div>

                <p>{`$${detail.total.toFixed(2)}`}</p>
              </div>
            );
          })}

        <div className='font-bold flex flex-auto justify-between items-center text-primary-500 mt-2'>
          <p>Total</p>
          <p>${total.toFixed(2)}</p>
        </div>
        <div>
          <CrudButton actionType={crudActionTypes.update} onClickHandler={handleOnUpdate} />
          <CrudButton actionType={crudActionTypes.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default SaleCard;
