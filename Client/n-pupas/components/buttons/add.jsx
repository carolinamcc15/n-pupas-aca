import Link from 'next/link';

const AddButton = ({ route }) => {
  return (
    <Link href={route} passHref>
      <div className='px-2 bg-primary-500 font-bold text-white text-4xl uppercase rounded-md cursor-pointer hover:bg-primary-700 transform hover:scale-[1.02] transition duration-300 ease-in-out'>
        +
      </div>
    </Link>
  );
};

export default AddButton;
