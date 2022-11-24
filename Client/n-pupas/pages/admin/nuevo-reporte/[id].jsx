
import AddEmployeeReportForm from 'components/forms/add-report';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { adminPages } from 'constants/strings';
import { branchCookie } from 'constants/data';
import { tokenCookie } from 'constants/data';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { adminRoutes } from 'routes/routes';
import { getCurrentDate } from 'utils/utils';
import { useRouter } from 'next/router';
import useAuthContext from 'context/AuthContext';
import useBranchContext from 'context/BranchContext';
import BackButton from 'components/buttons/back-arrow';

const pupuseriaApi = new PupuseriaApi();

export default function NewEmployeeReportPage({ employee }) {
  const router = useRouter();
  const { token } = useAuthContext();
  const { branchID } = useBranchContext();

  const onSubmitForm = async data => {
    try {
      const sent = await pupuseriaApi.createEmployeeReport(token, branchID, employee.id, {
        comment: data.comment,
        reportDate: getCurrentDate(),
      });
      if (sent) {
        toast.success('Reporte enviado exitosamente');
        router.push(adminRoutes.employees);
      } else {
        toast.error('No se pudo enviar el reporte');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className="bg-[url('/waves-bg.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.newReport}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col  bg-primary-100 p-4 py-6 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.employees} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-left md:my-3'>
              {adminPages.newReport}
            </h1>
          </div> 
          <div className='w-full flex flex-col place-items-center'>
            <img src='/newComent.png' alt='Empleado' className='w-28 sm:w-96' />
          </div>
        </div> 
        <div className='font-bold p-6 sm:px-6 sm:pb-8 sm:pt-12 flex flex-col grid grid-cols-20 mt-4 mb-8 '>
          Para: {employee.user.name}
          <AddEmployeeReportForm onSubmitHandler={onSubmitForm} />
        </div>
      </section>
    </main>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const token = getCookie(tokenCookie, { req, res });
  const branchID = getCookie(branchCookie, { req, res });
  const employeeID = query.id;

  try {
    const employee = await pupuseriaApi.getOneEmployee(token, branchID, employeeID);
    return {
      props: {
        employee: employee,
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
