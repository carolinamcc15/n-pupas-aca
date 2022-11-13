import AddSaleForm from 'components/forms/add-sale';

export const SaleProductModal = ({ onClose, onSave, product }) => {
  const handleOnFormSubmit = quantity => {
    onSave(product, quantity);
    onClose();
  };

  return (
    <div className='bg-white text-black rounded-md m-6'>
      <div className='flex justify-end transform -translate-y-3 translate-x-3'>
        <button
          className='text-white bg-red-500 hover:bg-red-600 focus:outline-none uppercase font-bold rounded-full text-sm px-3 py-2 text-center transition duration-300 ease-in-out'
          onClick={onClose}
        >
          X
        </button>
      </div>
      <div className='px-6 pb-7'>
        <p className='font-bold text-lg text-primary-500 mb-5'>{product.name}</p>
        <AddSaleForm onSubmitHandler={handleOnFormSubmit} product={product} />
      </div>
    </div>
  );
};
