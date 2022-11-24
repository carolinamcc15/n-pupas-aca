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

      <h1 className='font-bold text-3xl text-center md:text-left text-primary-500 '>{employeePages.report}</h1>

      <div className='flex flex-col md:flex-row p-5 gap-y-10 gap-x-8 '>
        <section className='bg-secondary-500 p-5 bg-opacity-40 rounded-lg shadow-md w-fit md:basis-2/4'>
          <div className='grid justify-items-start mb-5 '>
              <h2 className='text-xl md:text-2xl font-bold text-primary-500 mb-5'>{titles.information} </h2>
              <div className='grid grid-rows-3 grid-flow-col'>
                <div className='mb-5 px-3 border-l-4 border-violet-600 text-sm'>
                  <p className=' text-primary-500 pl-4 text-sm'>NOMBRE</p>
                  <p className='text-base pl-4 mt-1 font-semibold'>{employee.user.name}</p>
                </div>
                <div className='mb-5 px-3 border-l-4 border-violet-600 text-sm'>
                  <p className='text-primary-500 pl-4 text-sm'>EMPLEADO DESDE</p>
                  <p className='text-base pl-4 mt-1 font-semibold'>{employee.hiringDate}</p>
                </div>
                <div className='mb-5 px-3 border-l-4 border-violet-600 text-sm'>
                  <p className='text-primary-500 pl-4 text-sm'>TIEMPO LABORADO</p>
                  <p className='text-base pl-4 mt-1 font-semibold'>{getPeriodOfTime(employee.hiringDate)}</p>
                </div>
              </div>
          </div>
        </section>
        <section className='bg-secondary-500 p-5 bg-opacity-40 rounded-lg shadow-md w-fit md:w-full'>
        <div className='grid mb-5 justify-items-start'>
            <h2 className='text-xl md:text-2xl font-bold text-primary-500 mb-5'>{titles.salary} </h2>
            <p className='text-xl text-primary-500 pl-2'>Salario mensual: 
                <span className='pl-3 md:inline-flex md:items-baseline'>
                  <span className='text-xl font-bold text-primary-500'>
                    ${employee.salary}
                  </span>
                </span>
            </p> 
            <table className='md:w-full text-sm text-left mt-5 md:p-8 border-[1px] border-violet-400'>
              <thead className='bg-[#584076] bg-auto text-base  text-white text-center border-[1px] border-violet-400'>
                <th>Descuento</th>
                <th>Mensual</th>
                <th>Quincenal</th>
              </thead>
              <tbody className='bg-white '>
                <tr className=''>
                  <th
                    scope='row'
                    className='text-center font-medium whitespace-nowrap p-3 border-[1px] border-violet-300'
                  >
                    ISSS
                  </th>
                  <td className='text-center font-medium border-[1px] border-violet-300'>${monthlyISSS}</td>
                  <td className='text-center font-medium border-[1px] border-violet-300'>${biweeklyISSS}</td> 
                </tr>

                <tr className='bg-white '>
                  <th
                    scope='row'
                    className='text-center font-medium whitespace-nowrap  p-3 border-[1px] border-violet-300'
                  >
                    AFP
                  </th>
                  <td className='text-center font-medium border-[1px] border-violet-300'>${monthlyAFP}</td>
                  <td className='text-center font-medium border-[1px] border-violet-300'>${biweeklyAFP}</td>
                </tr>
                <tr className='bg-white '>
                  <th
                    scope='row'
                    className='text-center font-medium whitespace-nowrap  p-3 border-[1px] border-violet-300'
                  >
                    ISR
                  </th>
                  <td className='text-center font-medium border-[1px] border-violet-300'>${monthlyRent}</td>
                  <td className='text-center font-medium border-[1px] border-violet-300'>${biweeklyRent}</td>
                </tr>
              </tbody>
          </table>
          </div>
          <div className='flex flex-col md:flex-row md:justify-between gap-1 mt-6'>
            <div className='bg-[#8E6FB6] rounded-[30px] shadow-md px-4 py-3'>
              <p className=' text-white self-center'>Salario neto mensual: 
                  <span className=''>
                    <span className='font-bold text-white pl-1'>
                    ${employee.salary - monthlyISSS - monthlyAFP - monthlyRent}
                    </span>
                  </span>
              </p> 
            </div>
            <section className='bg-[#8E6FB6] rounded-[30px] shadow-md px-4 py-3'>
              <p className=' text-white'>Salario neto quincenal: 
                    <span className=''>
                      <span className='font-bold text-white pl-1'>
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
