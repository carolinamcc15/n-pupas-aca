import Link from 'next/link';

const AddButton = ({ route, text = '' }) => {
  return (
    <Link href={route} passHref>
      <button className='flex gap-2 items-center px-8 py-2 bg-primary-500 font-medium tracking-wider text-white uppercase rounded-md border-2 border-transparent cursor-pointer hover:bg-primary-700 transform transition duration-300 ease-in-out hover:opacity-80'>
        <span className='w-4 text-white font-bold text-xl'>+</span> {text}
      </button>
    </Link>
  );
};

export default AddButton;
