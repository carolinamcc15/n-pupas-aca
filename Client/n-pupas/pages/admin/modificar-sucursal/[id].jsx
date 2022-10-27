import AddBranchForm from 'components/forms/add-branch';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React from 'react';

const pupuseriaApi = new PupuseriaApi();

export default function editBranchPage({ branch }) {
  const router = useRouter();
  const { token } = useAuthContext();

  const onSubmitForm = async data => {
    try {
      const updated = await pupuseriaApi.updateBranch(token, branch.id, data);
      if (updated) {
        toast.success('Cambios guardados exitosamente');
        router.push(adminRoutes.branches);
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
      <AddBranchForm onSubmitHandler={onSubmitForm} branch={branch} />
    </main>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const token = getCookie(tokenCookie, { req, res });
  const branchId = query.id;

  try {
    const branch = await pupuseriaApi.getOneBranch(token, branchId);
    return {
      props: {
        branch: branch,
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
