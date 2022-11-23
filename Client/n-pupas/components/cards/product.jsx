import { useRouter } from 'next/router';

import ProductInfo from 'components/information/product-info';
import ActionButton from 'components/buttons/actionButton';
import { actionButtons } from 'constants/data';
import { adminRoutes } from 'routes/routes';

const ProductCard = ({ product, quantity = 0, onDeleteHandler }) => {
  const router = useRouter();

  const handleOnModify = () => {
    router.push(`${adminRoutes.editProduct}/${product.id}`);
  };

  const handleOnDelete = () => {
    onDeleteHandler();
  };

  return (
    <article className='gap-2 grid-cols-1 bg-white shadow-md rounded-xl pb-4'>
      <div className='xs:p-0 flex w-full flex-col rounded-md'>
        <img
        src={product.image ? `data:image/jpeg;base64,${product.image}` : '/no-image.jpg'}
        alt={product.name}
        className='w-26 h-48 items-center rounded-md object-cover'/>
          <div className=' flex self-end pr-2 gap-2'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>

      <div className= "p-1">
        <ProductInfo product={product} quantity={quantity} />
      </div>
      
    </article>
  );
};

export default ProductCard;
