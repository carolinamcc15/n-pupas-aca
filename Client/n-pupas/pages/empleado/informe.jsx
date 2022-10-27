import SectionTitle from 'components/information/section-title';
import { employeePages, titles } from 'constants/strings';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { biweeklyDiscounts, getPeriodOfTime, montlyDiscounts } from 'utils/utils';
import { tokenCookie } from 'constants/data';
import { getCookie } from 'cookies-next';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const ReportPage = ({ employee }) => {
  const monthlyISSS = montlyDiscounts.isss(employee.salary).toFixed(2);
  const biweeklyISSS = biweeklyDiscounts.isss(employee.salary).toFixed(2);

  const monthlyAFP = montlyDiscounts.afp(employee.salary).toFixed(2);
  const biweeklyAFP = biweeklyDiscounts.afp(employee.salary).toFixed(2);

  const monthlyRent = montlyDiscounts.rent(employee.salary).toFixed(2);
  const biweeklyRent = biweeklyDiscounts.rent(employee.salary).toFixed(2);

  return (
    <main className='p-6 flex flex-col gap-5  w-full md:max-w-[900px] mx-auto'>
      <Head>
        <title>{employeePages.report}</title>
      </Head> 
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center'>{employeePages.report}</h1>
      <div>
        <p className='mb-1 md:text-center'> Empleado desde: {employee.hiringDate}</p>
        <p className='md:text-center'>Tiempo laborado: {getPeriodOfTime(employee.hiringDate)}</p>
      </div>
      <section>
        <SectionTitle title={titles.salary} />
        <p className='mb-7 font-bold mt-1'>Salario mensual: ${employee.salary}</p>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-6'>
          <table className='w-full text-sm text-left'>
            <thead>
              <th>Descuento</th>
              <th>Quincenal</th>
              <th>Mensual</th>
            </thead>
            <tbody className='mt-2'>
              <tr className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
                >
                  ISSS
                </th>
                <td className='px-6 py-4 font-bold'>${biweeklyISSS}</td>
                <td className='px-6 py-4 font-bold'>${monthlyISSS}</td>
              </tr>
              <tr className='bg-white border-b '>
                <th
                  scope='row'
                  className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
                >
                  AFP
                </th>
                <td className='px-6 py-4 font-bold'>${biweeklyAFP}</td>
                <td className='px-6 py-4 font-bold'>${monthlyAFP}</td>
              </tr>
              <tr className='bg-white'>
                <th
                  scope='row'
                  className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
                >
                  ISR
                </th>
                <td className='px-6 py-4 font-bold'>${biweeklyRent}</td>
                <td className='px-6 py-4 font-bold'>${monthlyRent}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between gap-1 md:mt-6'>
          <p className='text-lg text-primary-500 font-bold md:text-center'>
            Salario neto mensual: ${employee.salary - monthlyISSS - monthlyAFP - monthlyRent}
          </p>
          <p className='text-lg text-primary-500 font-bold md:text-center'>
            Salario neto quincenal: $
            {employee.salary / 2 - biweeklyISSS - biweeklyAFP - biweeklyRent}
          </p>
        </div>
      </section>
    </main>
  );
};

export default ReportPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const employeeInfo = await pupuseriaApi.getEmployeeInfo(token);
    return {
      props: {
        employee: employeeInfo,
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
