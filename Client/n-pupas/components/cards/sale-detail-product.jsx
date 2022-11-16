import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';

const SaleDetailProductCard = ({ detailProduct, onDeleteHandler }) => {
  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md flex'>
      <img
        src={
          detailProduct.product.image
            ? `data:image/jpeg;base64,${detailProduct.product.image}`
            : '/no-image.jpg'
        }
        alt={detailProduct.product.name}
        className='w-20 hfull object-cover'
      />
      <div className='p-3 flex w-full flex-col'>
        <div className='flex flex-col xs:flex-row xs:justify-between font-bold mb-1'>
          <h2>{detailProduct.product.name}</h2>
          <button onClick={handleOnDelete} className='text-red-600 font-bold text-lg'>
            x
          </button>
        </div>
        <div className='flex gap-3'>
          <p className='text-sm bg-[#D8E5FC] px-2 pt-0.5 rounded-full'>
            {detailProduct.amount > 0 ? `$${detailProduct.total.toFixed(2)}` : ''}
          </p>
          {detailProduct.product.type.id === 1 && (
            <p className='text-sm'>{detailProduct.mass == 1 ? 'Arroz' : 'Maíz'}</p>
          )}
          <p className='text-sm'>{detailProduct.amount > 0 ? `x${detailProduct.amount}` : ''}</p>
        </div>
      </div>
    </article>
  );
};

export default SaleDetailProductCard;
