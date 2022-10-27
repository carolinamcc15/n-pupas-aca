const SectionTitle = ({ title }) => {
    return (
      <div className="mt-2">
        <h2 className='text-lg sm:text-xl mb-2 font-semibold'>{title}</h2>
        <div className='h-[0.15rem] w-full bg-secondary-500 rounded-sm mb-4'></div>
      </div>
    );
  };
  
  export default SectionTitle;