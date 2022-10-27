const ProductInfo = ({ product, quantity = 0 }) => {
    return (
      <div className='flex flex-col xs:flex-row xs:justify-between font-bold '>
        <h2>
          {product.name} {quantity > 0 ? `x${quantity}` : ''}
        </h2>
        <p>
          {' '}
          {quantity > 0
            ? `$${(product.price * quantity).toFixed(2)}`
            : `$${product.price.toFixed(2)}`}{' '}
        </p>
      </div>
    );
  };
  
  export default ProductInfo;