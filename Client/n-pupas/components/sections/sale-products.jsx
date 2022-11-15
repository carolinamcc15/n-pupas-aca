import SectionTitle from 'components/information/section-title';
import SaleProductCard from 'components/cards/sale-product';

const SaleProductsSection = ({ products, type, onClickHandler }) => {
  const categoryProducts = products.filter(product => product.type.id === type.id);

  return (
    <div>
      <section className='flex flex-col gap-5'>
        <SectionTitle title={type.type} />
        {categoryProducts.length > 0 ? (
          <div className='gap-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 mb-10'>
            {categoryProducts.map(product => {
              return (
                <SaleProductCard
                  product={product}
                  key={product.id}
                  onClickHandler={() => onClickHandler(product)}
                />
              );
            })}
          </div>
        ) : (
          <p>No se encontraron productos</p>
        )}
      </section>
    </div>
  );
};

export default SaleProductsSection;
