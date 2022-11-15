import Link from 'next/link';

const MenuOption = ({ option }) => {
  return (
    <Link href={option.route} passHref>
      <div style={{ backgroundColor: option.color }} className='grid grid-rows-2 p-3 items-center justify-center rounded-md cursor-pointer hover:bg-orange-150 transition duration-300 ease-in-out' >
        <img src={option.img} className='px-4 w-26 h-26'/>
        <p className='font-bold text-center text-white text-xs sm:text-sm'>{option.title}</p>
      </div>
    </Link>
  );
};

export default MenuOption;
