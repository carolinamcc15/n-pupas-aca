import Link from 'next/link';

const MenuOption = ({ option, horizontal = false }) => {
  return (
    <Link href={option.route} passHref>
      {horizontal ? (
        <div
          style={{ backgroundColor: option.color }}
          className='flex gap-4 p-6 sm:p-8 items-center justify-center rounded-md cursor-pointer hover:opacity-90 shadow-md transition duration-300 ease-in-out'
        >
          <img src={option.img} className='px-4 w-26 sm:w-32 h-26 items-center min-w-[80px]' />
          <p className='font-bold text-center text-white text-sm uppercase'>{option.title}</p>
        </div>
      ) : (
        <div
          style={{ backgroundColor: option.color }}
          className='flex flex-col gap-4 p-6 sm:p-8 items-center justify-center rounded-md cursor-pointer hover:opacity-90 shadow-md transition duration-300 ease-in-out'
        >
          <img src={option.img} className='px-4 w-26 sm:w-32 h-26 items-center min-w-[80px]' />
          <p className='font-bold text-center text-white text-sm uppercase'>{option.title}</p>
        </div>
      )}
    </Link>
  );
};

export default MenuOption;
