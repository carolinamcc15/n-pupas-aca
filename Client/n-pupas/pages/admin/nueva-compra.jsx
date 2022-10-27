import AddPurchaseForm from 'components/forms/add-purchase';
import { adminPages } from 'constants/strings';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React from 'react';
import { adminRoutes } from 'routes/routes';
import useAuthContext from 'context/AuthContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { getCookie } from 'cookies-next';
import { branchCookie } from 'constants/data';
import { useRouter } from 'next/router';

export default function NewPurchasePage() {
  const pupuseriaApi = new PupuseriaApi();
  const branchID = getCookie(branchCookie);
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    try {
      const created = await pupuseriaApi.createPurchase(token, branchID, data);

      if (created) {
        toast.success('Compra creada exitosamente');
        router.push(adminRoutes.purchases);
      } else {
        toast.error('No se pudo crear la compra');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.newPurchase}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.newPurchase}
      </h1>
      <AddPurchaseForm onSubmitHandler={onSubmitForm} />
    </main>
  );
}
