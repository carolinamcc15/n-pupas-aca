import { homePageName } from 'constants/strings';
import HomeMenu from 'components/menu/menu';
import Head from 'next/head';
import { getCookie } from 'cookies-next';
import { tokenCookie } from 'constants/data';
import { PupuseriaApi } from 'services/PupuseriaApi';

const pupuseriaApi = new PupuseriaApi();

const EmployeeHomePage = ({ branch }) => {
  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{homePageName}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl'>{homePageName}</h1>
      <section>
        <h2 className='text-primary-500 font-bold text-lg'>{`Sucursal ${branch.name}`}</h2>
        <p>{branch.address}</p>
      </section>
      <HomeMenu />
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
