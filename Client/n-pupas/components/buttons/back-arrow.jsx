import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

const BackButton = ({ linkTo, colorClass = 'text-white' }) => {
  return (
    <Link href={linkTo} passHref>
      <ChevronLeftIcon className={`w-7 cursor-pointer ${colorClass}`} />
    </Link>
  );
};

export default BackButton;
