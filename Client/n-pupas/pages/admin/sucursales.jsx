import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { confirmAlert } from 'react-confirm-alert';
import BranchCard from 'components/cards/branch';
import { adminPages } from 'constants/strings';
import { useState, useEffect } from 'react';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';
import useAuthContext from 'context/AuthContext';

const pupuseriaApi = new PupuseriaApi();

const BranchesPage = ({ allBranches }) => {
  const [branches, setBranches] = useState(allBranches);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    const getAllBranches = async () => {
      const branches = await pupuseriaApi.getAllBranches(token);
      setBranches(branches);
    };
    getAllBranches();
  }, [deleteToggle]);

  const deleteBranch = async id => {
    try {
      const deleted = await pupuseriaApi.deleteBranch(token, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Sucursal eliminada');
      } else {
        toast.error('No se pudo eliminar la sucursal');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  const onDeleteHandler = (id, branchName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={() => deleteBranch(id)}
            text={`¿Segura/o que quieres eliminar la sucursal "${branchName}"?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.branches}</title>
      </Head>
      <PageHeading title={adminPages.branches} route={adminRoutes.newBranch} />
      <div className='flex flex-col gap-5 md:grid md:grid-cols-2'>
        {branches.map(branch => {
          return (
            <BranchCard
              branch={branch}
              key={branch.id}
              onDeleteHandler={() => onDeleteHandler(branch.id, branch.name)}
            />
          );
        })}
      </div>
    </main>
  );
};

export default BranchesPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const allBranches = await pupuseriaApi.getAllBranches(token);
    return {
      props: {
        allBranches: allBranches,
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
