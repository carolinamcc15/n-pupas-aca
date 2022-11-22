import { homePageName } from 'constants/strings';
import HomeMenu from 'components/menu/menu';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { tokenCookie } from 'constants/data';
import { PupuseriaApi } from 'services/PupuseriaApi';

const pupuseriaApi = new PupuseriaApi();

const EmployeeHomePage = ({ branch }) => {
  return (
    <main className="bg-[url('/waves-bg-1.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-10 flex">
      <section className='grid sm:grid-cols-5 sm:grid-rows-2 w-full gap-7 p-5 md:p-7'>
        <Head>
          <title>{homePageName}</title>
        </Head>
        <div className='w-full h-48 col-span-2 rounded-md items-center justify-center flex flex-col gap-4 bg-gray-100 shadow-sm shadow-black'>
          <section className='w-full px-5'>
            <h2 className='mb-5 text-primary-500 font-bold text-xl sm:text-2xl'>{`Sucursal ${branch.name}`}</h2>
            <p>{branch.address}</p>
          </section>
        </div>
        <div className='bg-gray-100 row-span-2 col-span-3 p-3 rounded-md shadow-sm shadow-black'>
          <HomeMenu />
        </div>

        <div className='sm:visible invisible sm:col-span-2 sm:items-center sm:justify-center sm:mx-auto sm:flex flex-col'>
          <img src='/menuEmpleado.png' className='w-26 sm:w-72 h-26 sm:h-56' />
        </div>
      </section>
    </main>
  );
};

export default EmployeeHomePage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const employeeBranch = await pupuseriaApi.getEmployeeBranch(token);

    return {
      props: {
        branch: employeeBranch,
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
