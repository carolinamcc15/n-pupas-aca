import ProductCard from 'components/cards/product';

const MenuProductsSection = ({ products, type, onDeleteHandler }) => {
  const categoryProducts = products.filter(product => product.type.id === type.id);

  return (
    <div className='rounded-xl p-6 sm:p-7 sm:pb-5 shadow-lg bg-secondary-500 bg-opacity-30 '>
      <section className='flex flex-col gap-5'>
        <h2 className='font-bold text-xl sm:text-2xl text-primary-500 mb-3'>{type.type}</h2>
        {categoryProducts.length > 0 ? (
          <div className='gap-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-10'>
            {categoryProducts.map(product => {
              return (
                <ProductCard
                  product={product}
                  key={product.id}
                  onDeleteHandler={() => onDeleteHandler(product.id, product.name)}
                />
              );
            })}
          </div>
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </section>
    </div>
  );
};

export default MenuProductsSection;
