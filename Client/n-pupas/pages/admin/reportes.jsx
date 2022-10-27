import GenerateReportForm from 'components/forms/generate-report';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import generatePDF from 'utils/pdf';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const ReportsPage = () => {
  const { token } = useAuthContext();
  const { branchID } = useBranchContext();
  const router = useRouter();

  const generateReport = async data => {
    try {
      const purchases = await pupuseriaApi.getReportPurchases(branchID, token, data);
      const sales = await pupuseriaApi.getReportSales(branchID, token, data);
      generatePDF(purchases, sales, data);

      router.push(adminRoutes.home);
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.reports}</title>
      </Head>

      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.reports}
      </h1>
      <div>
        <p className='w-full md:max-w-[900px] mx-auto font-bold text-lg mb-3'>
          Ingrese un rango de fechas
        </p>
        <GenerateReportForm onSubmitHandler={generateReport} />
      </div>

      <p className='w-full md:max-w-[900px] mx-auto'>
        * El reporte de ingresos y egresos será generados en un archivo de formato PDF
      </p>
    </main>
  );
};

export default ReportsPage;
