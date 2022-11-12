import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React from 'react';

import AddPurchaseForm from 'components/forms/add-purchase';
import { branchCookie, tokenCookie } from 'constants/data';
import BackButton from 'components/buttons/back-arrow';
import useBranchContext from 'context/BranchContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';

const pupuseriaApi = new PupuseriaApi();

export default function editPurchasePage({ purchase }) {
  const { branchID } = useBranchContext();
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    try {
      const updated = await pupuseriaApi.updatePurchase(token, branchID, purchase.id, data);
      if (updated) {
        toast.success('Cambios guardados exitosamente');
        router.push(adminRoutes.purchases);
      } else {
        toast.error('No se pudieron guardar los cambios');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className="bg-[url('/waves-bg.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.editPurchase}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 py-6 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.purchases} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-center md:my-3'>
              {adminPages.editPurchase}
            </h1>
          </div>
          <img src='/purchases.svg' alt='Realizar compras' className='w-28 sm:w-96' />
        </div>
        <div className='p-6 sm:px-6 sm:pb-10 sm:pt-16 flex flex-col justify-between items-center'>
          <AddPurchaseForm onSubmitHandler={onSubmitForm} purchase={purchase} />
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const token = getCookie(tokenCookie, { req, res });
  const branchID = getCookie(branchCookie, { req, res });
  const purchaseID = query.id;

  try {
    const purchase = await pupuseriaApi.getOnePurchase(token, branchID, purchaseID);
    return {
      props: {
        purchase: purchase,
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: '/500',
      },
    };
  }
}
