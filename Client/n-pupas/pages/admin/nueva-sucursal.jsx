import AddBranchForm from 'components/forms/add-branch';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React from 'react';

export default function NewBranchPage() {
  const pupuseriaApi = new PupuseriaApi();
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    try {
      const created = await pupuseriaApi.createBranch(token, data);

      if (created) {
        toast.success('Sucursal creada exitosamente');
        router.push(adminRoutes.branches);
      } else {
        toast.error('No se pudo crear la sucursal');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.newBranch}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.newBranch}
      </h1>
      <AddBranchForm onSubmitHandler={onSubmitForm} />
    </main>
  );
}
