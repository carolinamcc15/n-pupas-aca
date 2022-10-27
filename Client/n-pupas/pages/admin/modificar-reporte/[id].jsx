import AddEmployeeReportForm from 'components/forms/add-report';
import { branchCookie, tokenCookie } from 'constants/data';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

export default function editReport({ report }) {
  const { branchID } = useBranchContext();
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    const updatedReport = {
      reportDate: report.reportDate,
      comment: data.comment,
    };

    try {
      const updated = await pupuseriaApi.updateReport(branchID, token, updatedReport, report.id);
      if (updated) {
        toast.success('Cambios guardados exitosamente');
        router.push(adminRoutes.employees);
      } else {
        toast.error('No se pudieron guardar los cambios');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.editReport}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.editReport}
      </h1>
      <AddEmployeeReportForm onSubmitHandler={onSubmitForm} report={report} />
    </main>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const reportId = query.id;
  const token = getCookie(tokenCookie, { req, res });
  const branchID = getCookie(branchCookie, { req, res });

  try {
    const report = await pupuseriaApi.getOneReport(branchID, token, reportId);
    return {
      props: {
        report: report,
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
