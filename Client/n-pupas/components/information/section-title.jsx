const SectionTitle = ({ title }) => {
  return (
    <div className='mt-2 flex items-center gap-4'>
      <h2 className='font-bold text-lg sm:text-xl text-center text-primary-500'>{title}</h2>
      <div className='w-full h-0.5 self-center bg-primary-500'></div>
    </div>
  );
};

export default SectionTitle;
