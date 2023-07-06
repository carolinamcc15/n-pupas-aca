import Link from 'next/link';

const MenuOption = ({ option, horizontal = false }) => {
  return (
    <Link href={option.route} passHref>
      {horizontal ? (
        <div
          style={{ backgroundColor: option.color }}
          className='flex sm:flex-wrap lg:flex-nowrap gap-4 p-6 items-center justify-center rounded-md cursor-pointer hover:opacity-90 shadow-md transition duration-300 ease-in-out'
        >
          <img src={option.img} className='w-10 lg:w-12 items-center' />
          <p className='font-bold text-center text-white text-sm uppercase'>{option.title}</p>
        </div>
      ) : (
        <div
          style={{ backgroundColor: option.color }}
          className='flex flex-col gap-4 p-6 lg:p-8 items-center justify-center rounded-md cursor-pointer hover:opacity-90 shadow-md transition duration-300 ease-in-out'
        >
          <img src={option.img} className='px-4 w-20 lg:w-28 items-center' />
          <p className='font-bold text-center text-white text-sm uppercase'>{option.title}</p>
        </div>
      )}
    </Link>
  );
};

export default MenuOption;
