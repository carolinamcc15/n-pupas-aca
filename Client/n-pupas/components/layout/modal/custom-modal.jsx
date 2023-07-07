export const CustomModal = ({ onClose, onConfirm, text, confirmText = 'Eliminar' }) => {
  return (
    <div className='z-[1000] bg-white p-6 text-black rounded-sm m-6'>
      <h1 className='text-center font-bold text- mb-6'>{text}</h1>
      <div className='flex justify-center gap-6'>
        <button
          className='text-white bg-gray-400 hover:bg-gray-500 focus:outline-none uppercase font-bold rounded-lg text-sm px-4 py-2 text-center transition duration-300 ease-in-out'
          onClick={onClose}
        >
          Cancelar
        </button>
        <button
          className='text-white bg-red-600 hover:bg-red-700 focus:outline-none uppercase font-bold rounded-lg text-sm px-4 py-2 text-center transition duration-300 ease-in-out'
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};