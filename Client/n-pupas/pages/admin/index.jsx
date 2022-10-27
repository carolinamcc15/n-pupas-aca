import BranchSelect from 'components/forms/branchSelect';
import useBranchContext from 'context/BranchContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { homePageName } from 'constants/strings';
import { branchCookie, tokenCookie } from 'constants/data';
import HomeMenu from 'components/menu/menu';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const AdminHomePage = ({ pupuseriaName, branches }) => {
  const { branchID, setBranchID } = useBranchContext();

  useEffect(() => {
    if (!getCookie(branchCookie)) {
      setBranchID(branches[0].id);
    }
  }, [branches, branchID, setBranchID]);

  const changeBranch = id => {
    setBranchID(id);
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{homePageName}</title>
      </Head>
      <div className='w-full md:max-w-[900px] mx-auto flex flex-col gap-4'>
        <h1 className='font-bold text-2xl sm:text-3xl md:text-center'>{homePageName}</h1>
        <section className='mb-4'>
          <h2 className='text-primary-500 font-bold text-lg mb-3 md:text-center'>{`Pupusería: ${pupuseriaName}`}</h2>
          <p className='mb-1 md:text-center'>Seleccione una sucursal</p>
          <div className='w-full md:max-w-[500px] m-auto'>
            <BranchSelect onChangeHandler={changeBranch} branches={branches} value={branchID} />
          </div>
        </section>
      </div>

      <HomeMenu isAdmin={true} />
    </main>
  );
};

export default AdminHomePage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const pupuseria = await pupuseriaApi.getMyPupuseria(token);
    return {
      props: {
        pupuseriaName: pupuseria.name,
        branches: pupuseria.branches,
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
