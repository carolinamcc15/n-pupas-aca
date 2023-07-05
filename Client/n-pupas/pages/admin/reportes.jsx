import GenerateReportForm from 'components/forms/generate-report';
import GeneratePredictionForm from 'components/forms/generate-prediction';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import generatePDF from 'utils/pdf';
import generatePDFpred from 'utils/pdf-proyeccion';
import Head from 'next/head';
import BackButton from 'components/buttons/back-arrow';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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

  const generatePrediction = async data => {
    try {
      //const projections = await pupuseriaApi.getPredictionSales(PupuseriaID, token, data);
      const projections = {
        "id": 1,
        "sucursal": "Sucursal 1",
        "mes": "Julio",
        "monto": 600
      };
      generatePDFpred(projections); //crear un pdf diferente

      router.push(adminRoutes.home);

    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className="bg-[url('/waves-bg.svg')] bg-no-repeat bg-cover h-full min-h-screen p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.reports}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 py-6 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.employees} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-center md:my-3'>
              {adminPages.reports}
            </h1>
          </div>
          <img src='/stats.svg' alt='Empleado' className='w-28 sm:w-96' />
        </div>
        <div className='p-6 sm:px-6 sm:pb-10 sm:pt-16 flex flex-col justify-between items-center'>
          
          <Tabs>
            <TabList>
              <Tab>Ingresos</Tab>
              <Tab>Proyección</Tab>
            </TabList>

            <TabPanel>
              <GenerateReportForm onSubmitHandler={generateReport} />
            </TabPanel>
            <TabPanel>
              <GeneratePredictionForm onSubmitHandler={generatePrediction} />
            </TabPanel>
          </Tabs>
        </div>
      </section>


    </main>
  );
};

export default ReportsPage;
