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
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{employeePages.report}</title>
      </Head> 

      <h1 className='font-bold text-3xl md:text-left text-primary-500 '>{employeePages.report}</h1>

      <div className='grid grid-cols-2 gap-6 flex-wrap relative overflow-x-auto'>
        <section className='bg-secondary-500 p-5 bg-opacity-40 rounded-lg shadow-md '>
          <div className='grid justify-items-start mb-5 md:w-fit'>
            <h2 className='text-2xl  font-bold text-primary-500 mb-5'>{titles.information} </h2>
            <div className='grid grid-rows-3 sm:grid-rows-3 grid-flow-col'>
              <div className='mb-5 border-l-4 border-primary-500 md:w-fit'>
                <p className='col-span-4 text-primary-400 pl-4'>NOMBRE</p>
                <p className='text-base col-span-4 pl-4'>{employee.user.name}</p>
              </div>
              <div className='mb-5 border-l-4 border-primary-500'>
                <p className='col-span-4 text-primary-400 pl-4 '>EMPLEADO DESDE</p>
                <p className='text-base col-span-4 pl-4'>{employee.hiringDate}</p>
              </div>
              <div className='mb-5 border-l-4 border-primary-500'>
                <p className='col-span-4 text-primary-400 pl-4'>TIEMPO LABORADO</p>
                <p className='text-base col-span-4 pl-4'>{getPeriodOfTime(employee.hiringDate)}</p>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-secondary-500 p-5 bg-opacity-40 rounded-lg shadow-md mb-3 w-fit'>
          <div className='flex grid justify-items-start mb-5 '>
            <h2 className='text-2xl font-bold text-primary-500 mb-5'>{titles.salary} </h2>
            <p className='text-xl text-primary-500 pl-2'>Salario mensual: 
                <span className='inline-flex items-baseline pl-5'>
                  <span className='text-xl font-bold text-primary-500'>
                    ${employee.salary}
                  </span>
                </span>
            </p> 
            <table className='w-full text-sm text-left border-separate border border-slate-500 mt-5'>
            <thead>
              <th className= 'bg-[#584076] text-base antialiased font-semibold tracking-wide text-center text-white'>Descuento</th>
              <th className= 'bg-[#584076] text-base antialiased font-semibold tracking-wide text-center text-white'>Mensual</th>
              <th className= 'bg-[#584076] text-base antialiased font-semibold tracking-wide text-center text-white'>Quincenal</th>
            </thead>
            <tbody className='mt-2'>
              <tr className='bg-white border-b'>
                <th
                  scope='row'
                  className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
                >
                  ISSS
                </th>
                <td className='px-6 py-4 font-bold'>${monthlyISSS}</td>
                <td className='px-6 py-4 font-bold'>${biweeklyISSS}</td> 
              </tr>
              <tr className='bg-white border-b '>
                <th
                  scope='row'
                  className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
                >
                  AFP
                </th>
                <td className='px-6 py-4 font-bold'>${monthlyAFP}</td>
                <td className='px-6 py-4 font-bold'>${biweeklyAFP}</td>
              </tr>
              <tr className='bg-white'>
                <th
                  scope='row'
                  className='px-6 py-4 font-bold whitespace-nowrap border-r-[1px] border-gray-250'
                >
                  ISR
                </th>
                <td className='px-6 py-4 font-bold'>${monthlyRent}</td>
                <td className='px-6 py-4 font-bold'>${biweeklyRent}</td>
              </tr>
            </tbody>
          </table>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between gap-1 md:mt-6'>
            <section className='bg-[#8E6FB6] sm:p-6 bg-opacity-50 rounded-full shadow-md '>
              <p className='text-lg text-primary-500'>Salario neto mensual: 
                  <span className='inline-flex items-baseline'>
                    <span className='text-xl font-bold text-primary-500 pl-1'>
                    ${employee.salary - monthlyISSS - monthlyAFP - monthlyRent}
                    </span>
                  </span>
              </p> 
            </section>
            <section className='bg-[#8E6FB6] sm:p-6 bg-opacity-50 rounded-full shadow-md'>
              <p className='text-lg text-primary-500'>Salario neto quincenal: 
                    <span className='inline-flex items-baseline'>
                      <span className='text-xl font-bold text-primary-500 pl-1'>
                      ${employee.salary / 2 - biweeklyISSS - biweeklyAFP - biweeklyRent}
                      </span>
                    </span>
                </p> 
            </section>
          </div>
        </section>
      </div>
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
