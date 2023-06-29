import Head from 'next/head';

import { adminPages } from 'constants/strings';

const StatsPage = () => {
  return (
    <main className='bg-[#614C72] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-10 flex'>
      <Head>
        <title>{adminPages.stats}</title>
      </Head>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
        <div className='w-full h-full bg-white lg:row-span-2 sm:col-span-2 rounded-md p-3 '>
          <h2 className='uppercase text-center font-semibold'>Compras y ventas por fecha</h2>
        </div>
        <div className='w-full h-full flex flex-col bg-white rounded-md p-3'>
          <h2 className='uppercase text-center font-semibold'>Ventas por sucursal</h2>
        </div>
        <div className='w-full h-full flex flex-col bg-white rounded-md p-3 uppercase text-center font-semibold'>
          <h2 className='uppercase text-center font-semibold'>Ventas por categorías</h2>
        </div>
        <div className='w-full h-full flex flex-col bg-white rounded-md p-3 uppercase text-center font-semibold'>
          <h2 className='uppercase text-center font-semibold'>Costos</h2>
        </div>
        <div className='w-full h-full flex flex-col bg-white rounded-md p-3 uppercase text-center font-semibold'>
          <h2 className='uppercase text-center font-semibold'>Ventas</h2>
        </div>
        <div className='w-full h-full flex flex-col bg-white rounded-md p-3 uppercase text-center font-semibold'>
          <h2 className='uppercase text-center font-semibold'>Ganancias</h2>
        </div>
      </div>
    </main>
  );
};

export default StatsPage;
