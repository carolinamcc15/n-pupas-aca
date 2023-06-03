import BranchSelect from 'components/forms/branchSelect';
import useBranchContext from 'context/BranchContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { homePageName } from 'constants/strings';
import { branchCookie, tokenCookie } from 'constants/data';
import HomeMenu from 'components/menu/menu';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const AdminHomePage = () => {
  const { branchID, setBranchID } = useBranchContext();
  const [pupuseriaName, setPupuseriaName] = useState("");
  const [branches, setBranches] = useState([]);

  const fetchPupuseriaData = async () => {
  try {
    const token = getCookie(tokenCookie);
    const pupuseria = await pupuseriaApi.getMyPupuseria(token);
    setPupuseriaName(pupuseria.name);
    setBranches(pupuseria.branches);
    ;
  } catch (e) {
    console.log("Error: ", e);
  }
  }

  useEffect(() => {
    fetchPupuseriaData();
  }, [])
  
  useEffect(() => {
    if(!!pupuseriaName){
      if (!getCookie(branchCookie)) {
        setBranchID(branches[0].id);
      }
    }
  }, [branches, branchID, setBranchID]);

  const changeBranch = id => {
    setBranchID(id);
  };

  return (
    <main className="bg-[url('/waves-bg-1.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-10 flex">
      <section className='grid sm:grid-cols-5 sm:grid-rows-2 w-full gap-7'>
        <Head>
          <title>{homePageName}</title>
        </Head>
        <div className='w-full h-48 col-span-2 rounded-md items-center px-6 justify-center mx-auto flex flex-col gap-4 bg-gray-100 shadow-sm shadow-black'>
          <section className='w-full'>
            <h1 className='text-primary-500 font-bold text-xl sm:text-2xl mb-6'>{`Pupusería ${pupuseriaName}`}</h1>
            <p className='flow-root text-sm mb-1.5'>SUCURSAL</p>
            <div className='w-full md:max-w-[500px] m-auto'>
              <BranchSelect onChangeHandler={changeBranch} branches={branches} value={branchID} />
            </div>
          </section>
        </div>
        <div className='bg-gray-100 row-span-2 col-span-3 p-3 rounded-md shadow-sm shadow-black'>
          <HomeMenu isAdmin={true} />
        </div>

        <div className='sm:visible invisible sm:col-span-2 sm:items-center sm:justify-center sm:mx-auto sm:flex flex-col'>
          <img src='/menuEmpleado.png' className='w-26 sm:w-72 h-26 sm:h-56' />
        </div>
      </section>
    </main>
  );
};

export default AdminHomePage;
