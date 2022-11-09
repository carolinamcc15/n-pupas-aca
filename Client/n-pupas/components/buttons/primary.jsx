const PrimaryButton = ({ text }) => {
  return (
    <button
      type='submit'
      className='px-10 py-3 bg-primary-500 font-medium tracking-wider text-white uppercase rounded-md border-2 border-transparent cursor-pointer hover:bg-primary-700 transform transition duration-300 ease-in-out hover:opacity-80'
    >
      {text}
    </button>
  );
};

export default PrimaryButton;
