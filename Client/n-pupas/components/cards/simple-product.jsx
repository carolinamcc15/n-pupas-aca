import ProductInfo from 'components/information/product-info';
import { crudActionTypes } from 'constants/strings';
import CrudButton from 'components/buttons/crud';

const SimpleProductCard = ({ product, quantity = 0, onDeleteHandler }) => {
  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='bg-white shadow-md flex'>
      <img src={'/sample.jpg'} alt='N Pupas' className='w-[80px] xs:w-[100px] object-cover' />
      <div className='p-3 xs:p-5 flex w-full flex-col'>
        <ProductInfo product={product} quantity={quantity} />
        <div>
          <CrudButton actionType={crudActionTypes.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default SimpleProductCard;
