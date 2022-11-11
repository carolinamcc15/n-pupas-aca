const SectionTitle = ({ title }) => {
  return (
    <div className='mt-2 flex flex-col items-center'>
      <h2 className='font-bold text-lg sm:text-xl text-center'>{title}</h2>
      <div className='w-2/3 h-0.5 mt-2 self-center bg-primary-400 mx-16'></div>
    </div>
  );
};

export default SectionTitle;
