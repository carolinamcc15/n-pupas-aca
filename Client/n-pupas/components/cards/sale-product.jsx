import ProductInfo from 'components/information/product-info';

const SaleProductCard = ({ product, quantity = 0, onClickHandler }) => {
  const handleOnClick = () => {
    onClickHandler();
  };

  return (
    <article
      onClick={handleOnClick}
      className='rounded-lg bg-primary-100 shadow-md flex flex-col items-center cursor-pointer transform hover:scale-[1.02] transition duration-300 ease-in-out'
    >
      <img
        src={product.image ? `data:image/jpeg;base64,${product.image}` : '/no-image.jpg'}
        alt={product.name}
        className='w-full h-32 sm:h-40 object-cover rounded-t-lg'
      />
      <div className='p-3 xs:p-5 flex w-full flex-col'>
        <ProductInfo product={product} quantity={quantity} />
      </div>
    </article>
  );
};

export default SaleProductCard;
