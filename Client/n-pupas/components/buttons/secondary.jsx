const SecondaryButton = ({ text, onClickHandler, isRed = false }) => {
  const handleOnClick = () => {
    onClickHandler();
  };

  const style = isRed
    ? 'px-6 py-2 font-bold uppercase border-2 rounded-md cursor-pointer transform hover:scale-[1.02] transition duration-300 ease-in-out border-red-500 text-red-500 hover:bg-red-50'
    : 'px-6 py-2 font-bold uppercase border-2 rounded-md cursor-pointer transform hover:scale-[1.02] transition duration-300 ease-in-out border-primary-500 text-primary-500 hover:bg-primary-100 w-full ';

  return (
    <button type='button' className={style} onClick={handleOnClick}>
      {text}
    </button>
  );
};

export default SecondaryButton;
