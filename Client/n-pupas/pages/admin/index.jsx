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
    <main className="grid grid-cols-5 grid-rows-2 bg-[url('/waves-bg-1.svg')] bg-no-repeat bg-cover h-full min-h-5/6 gap-7 p-5 md:p-7 ">
      <Head>
        <title>{homePageName}</title>
      </Head>
      <div className='w-full h-48 col-span-2 rounded-md items-center justify-center mx-auto flex flex-col gap-4 bg-gray-100 shadow-sm shadow-black'>
        <section className='w-full'>
          <h1 className='text-primary-500 font-bold text-2xl sm:text-3xl mb-3 md:text-center'>{`Pupusería ${pupuseriaName}`}</h1>
          <p className='px-7 flow-root'>SUCURSAL</p>
          <div className='px-5 md:px-6 w-full md:max-w-[500px] m-auto'>
            <BranchSelect onChangeHandler={changeBranch} branches={branches} value={branchID} />
          </div>
        </section>
      </div>

      <HomeMenu isAdmin={true} />   

      <div className='col-span-2 items-center  justify-center mx-auto flex flex-col'>
          <img src='/menuEmpleado.png' className='w-26 sm:w-72 h-26 sm:h-56' />
      </div>

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
