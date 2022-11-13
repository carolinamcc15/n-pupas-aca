import { useRouter } from 'next/router';
import Link from 'next/link';
import React from 'react';

export const Navlink = ({ route, name }) => {
  const router = useRouter();

  const styleClass =
    router.pathname === route
      ? 'cursor-pointer underline text-primary-500 underline-offset-2 font-bold uppercase hover:tracking-wider'
      : 'cursor-pointer hover:text-primary-500 hover:tracking-wider uppercase';

  return (
    <Link href={route} passHref>
      <p className={styleClass}>{name}</p>
    </Link>
  );
};

export default Navlink;
