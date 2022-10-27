
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
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.newReport}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.newReport}
      </h1>
      <h2 className='font-bold w-full md:max-w-[900px] mx-auto'>Para: {employee.user.name}</h2>
      <AddEmployeeReportForm onSubmitHandler={onSubmitForm} />
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
