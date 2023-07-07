import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';

import { TransactionsGraph } from 'components/stats/transactions/transactionsGraph';
<<<<<<< Updated upstream
import ComparativeChart from 'components/charts/ComparativeChart';
import useBranchContext from 'context/BranchContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import RingChart from 'components/charts/RingChart';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
=======
import ComparativeChart from 'components/Charts/ComparativeChart';
import { EnvelopeIcon } from '@heroicons/react/24/solid';
import useBranchContext from 'context/BranchContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import RingChart from 'components/Charts/RingChart';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import useAuthContext from 'context/AuthContext';
>>>>>>> Stashed changes

const api = new PupuseriaApi();

const StatsPage = () => {
  const { branchID } = useBranchContext();
<<<<<<< Updated upstream
=======
  const { token } = useAuthContext();
  const [pupuseriaId, setPupuseriaId] = useState();
>>>>>>> Stashed changes
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [salesByBranch, setSalesByBranch] = useState([]);
  const [comparative, setComparative] = useState([]);

  const fetchStats = async () => {
    const token = getCookie(tokenCookie);

    try {
      const byCategory = await api.getMonthlySalesByCategories(token);
      const byBranch = await api.getMonthlySalesByBranch(token);
      const comparative = await api.getComparativeDataByBranch(branchID, token);

      setSalesByCategory(byCategory);
      setSalesByBranch(byBranch);
      setComparative(comparative);
    } catch (e) {
      toast.error('Ocurrió un error al obtener algunos datos');
    }
  };

<<<<<<< Updated upstream
  useEffect(() => {
    fetchStats();
=======
  const sendEmail = async () => {
    try {
      const response = await api.sendStatsEmail(pupuseriaId, token);
      console.log(response);
    } catch (e) {
      toast.error('Error. No se pudo enviar el email.');
      console.log(e);
    }
  };

  const setPupuseria = async () => {
    const response = await api.getMyPupuseria(token);
    setPupuseriaId(response.id);
  };

  useEffect(() => {
    fetchStats();
    setPupuseria();
>>>>>>> Stashed changes
  }, []);

  return (
    <main className='bg-[#614C72] flex-1 bg-no-repeat bg-cover px-6 py-4 flex flex-col items-center gap-3'>
      <Head>
        <title>{adminPages.stats}</title>
      </Head>
      <button
        className='px-2 py-1.5 flex justify-center items-center self-end gap-2 drop-shadow-lg bg-gradient-to-r text-white from-blue-400 via-blue-500 to-blue-400 rounded-md opacity-95 hover:opacity-100'
        onClick={sendEmail}
      >
        <EnvelopeIcon className='w-5' /> <p className='font-bold text-xs'>Enviar por email</p>
      </button>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
        <div className='w-full bg-white lg:row-span-2 sm:col-span-2 rounded-md p-3 '>
          <TransactionsGraph />
        </div>
        <div className='w-full flex flex-col gap-3 bg-white rounded-md p-3'>
          <h2 className='uppercase text-center font-semibold'>Ventas por sucursal</h2>
          <RingChart data={salesByBranch || []} />
        </div>
        <div className='w-full flex flex-col gap-3 bg-white rounded-md p-3'>
          <h2 className='uppercase text-center font-semibold'>Ventas por categorías</h2>
          <RingChart data={salesByCategory || []} />
        </div>
        <div className='w-full flex flex-col gap-3 bg-white rounded-md p-3 text-center font-semibold'>
          <h2 className='uppercase text-center font-semibold'>Costos</h2>
          <ComparativeChart data={comparative.purchases} label='Compras' />
        </div>
        <div className='w-full flex flex-col gap-3 bg-white rounded-md p-3 text-center font-semibold'>
          <h2 className='uppercase text-center font-semibold'>Ventas</h2>
          <ComparativeChart data={comparative.sales} label='Ventas' color='#9E84B2' />
        </div>
        <div className='w-full flex flex-col gap-3 bg-white rounded-md p-3 text-center font-semibold '>
          <h2 className='uppercase text-center font-semibold'>Ganancias</h2>
          <ComparativeChart data={comparative.revenue} color='#8F6FA8' />
        </div>
      </div>
    </main>
  );
};

export default StatsPage;
