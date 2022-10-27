import AddPurchaseForm from 'components/forms/add-purchase';
import { branchCookie, tokenCookie } from 'constants/data';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React from 'react';
import useBranchContext from 'context/BranchContext';

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
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.editBranch}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.editBranch}
      </h1>
      <AddPurchaseForm onSubmitHandler={onSubmitForm} purchase={purchase} />
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
