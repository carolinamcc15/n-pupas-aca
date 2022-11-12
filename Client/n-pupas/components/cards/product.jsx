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
    <article className='bg-white shadow-md flex'>
      <img
        src={product.image ? `data:image/jpeg;base64,${product.image}` : '/no-image.jpg'}
        alt={product.name}
        className='w-[80px] xs:w-[100px] object-cover'
      />
      <div className='p-3 xs:p-5 flex w-full flex-col'>
        <ProductInfo product={product} quantity={quantity} />
        <div className='flex gap-2'>
          <ActionButton actionElements={actionButtons.edit} onClickHandler={handleOnModify} />
          <ActionButton actionElements={actionButtons.delete} onClickHandler={handleOnDelete} />
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
