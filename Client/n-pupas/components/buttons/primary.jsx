const PrimaryButton = ({ text }) => {
  return (
    <button
      type='submit'
      className='w-full px-6 py-2 bg-primary-500 font-bold text-white uppercase rounded-md border-2 border-transparent cursor-pointer hover:bg-primary-700 transform transition duration-300 ease-in-out'
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
