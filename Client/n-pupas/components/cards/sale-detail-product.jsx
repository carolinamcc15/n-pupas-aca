import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';

const SaleDetailProductCard = ({ detailProduct, onDeleteHandler }) => {
  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md flex'>
      <div className='p-3 flex w-full flex-col'>
        <div className='flex flex-col xs:flex-row xs:justify-between font-bold '>
          <h2>{detailProduct.product.name}</h2>
          <p>{detailProduct.amount > 0 ? `$${detailProduct.total.toFixed(2)}` : ''}</p>
        </div>
        <div className='flex gap-3'>
          {detailProduct.product.type.id === 1 && (
            <p className='text-sm'>{detailProduct.mass == 1 ? 'Arroz' : 'Maíz'}</p>
          )}
          <p className='text-sm'>
            {detailProduct.amount > 0 ? `x${detailProduct.amount}` : ''}
          </p>
        </div>

        <div>
          <CrudButton actionType={crudActionTypes.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default SaleDetailProductCard;
