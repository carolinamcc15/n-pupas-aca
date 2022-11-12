import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const BackButton = ({ linkTo }) => {
  return (
    <Link href={linkTo} passHref>
      <ChevronLeftIcon className='w-7 cursor-pointer text-white' />
    </Link>
  );
};

export default BackButton;
