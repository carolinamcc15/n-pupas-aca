import useAuthContext from 'context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { adminRole } from 'constants/data';
import { employeeRoutes, adminRoutes } from 'routes/routes';

export default function Home() {
  const { role } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (role === adminRole) {
      router.push(adminRoutes.home);
    } else {
      router.push(employeeRoutes.home);
    }
  }, [router.pathname]);
}
