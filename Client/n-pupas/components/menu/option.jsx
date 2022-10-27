import Link from 'next/link';

const MenuOption = ({ option }) => {
  return (
    <Link href={option.route} passHref>
      <div className='md:h-28 bg-gray-200 p-6 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-250 transition duration-300 ease-in-out'>
        <p className='font-bold text-center text-md'>{option.title}</p>
      </div>
    </Link>
  );
};

export default MenuOption;
