const ProductInfo = ({ product, quantity = 0 }) => {
    return (
      <div className='flex flex-col justify-center items-center gap-1.5 text-primary-500 text-center'>
        <h3 className='font-bold '>
          {product.name} {quantity > 0 ? `x${quantity}` : ''}
        </h3>
        <p className='font-light'>
          {' '}
          {quantity > 0
            ? `$${(product.price * quantity).toFixed(2)}`
            : `$${product.price.toFixed(2)}`}{' '}
        </p>
      </div>
    );
  };
  
  export default ProductInfo;