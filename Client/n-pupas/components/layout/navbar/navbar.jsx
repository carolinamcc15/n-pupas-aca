import { adminRoutes, employeeRoutes } from 'routes/routes';
import { adminNav, employeeNav } from 'constants/data';
import LogoutButton from 'components/buttons/logout';
import useAuthContext from 'context/AuthContext';
import { registerRoute } from 'routes/routes';
import { useState, useEffect } from 'react';
import { adminRole } from 'constants/data';
import { useRouter } from 'next/router';
import { Navlink } from './navlink';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  const router = useRouter();
  const { role } = useAuthContext();
  const [navigation, setNavigation] = useState();

  useEffect(() => {
    setNavigation(role === adminRole ? adminNav : employeeNav);
  }, [role]);

  return (
    <nav className='bg-[#FAFAFA] sticky top-0 z-10 px-2 shadow-md'>
      {router.pathname !== registerRoute && (
        <div className='w-full relative flex items-center justify-between h-16 px-4 sm:px-6'>
          <div className='flex items-center cursor-pointer'>
            <Link href={`${role === adminRole ? adminRoutes.home : employeeRoutes.home}`} passHref>
              <Image src='/n-pupas.png' alt='N Pupas' width={67} height={14} className='md:w-12' />
            </Link>
          </div>
          <div className='w-full ml-4 sm:ml-6 flex justify-between items-center'>
            <div className='flex space-x-6'>
              {navigation?.map(item => (
                <Navlink key={item.route} name={item.name} route={item.route} />
              ))}
            </div>
            <LogoutButton />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
