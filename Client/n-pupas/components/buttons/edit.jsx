import Link from 'next/link';
import { adminRoutes } from 'routes/routes';

const ReportsButton = ({ id }) => {
  return (
    <Link href={`${adminRoutes.reportEmployee}/${id}`} passHref>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-8 w-8 font-bold  uppercase rounded-md cursor-pointer text-white text-4xl bg-orange-400  transition  transform hover:scale-[1.02] duration-300'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        stroke-width='2'
      >
        <path
          stroke-linecap='round'
          stroke-linejoin='round'
          d='M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
    </Link>
  );
};

export default ReportsButton;
