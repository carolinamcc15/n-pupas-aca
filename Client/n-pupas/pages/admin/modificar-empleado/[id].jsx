import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';

import BackButton from 'components/buttons/back-arrow';
import AddEmployeeForm from 'components/forms/add-employee';
import { branchCookie, tokenCookie } from 'constants/data';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';

const pupuseriaApi = new PupuseriaApi();

export default function editEmployeePage({ employee }) {
  const { branchID } = useBranchContext();
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    try {
      const updated = await pupuseriaApi.updateEmployee(token, branchID, employee.id, data);
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
    <main className="bg-[url('/waves-bg.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.editEmployee}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 py-6 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.employees} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-center md:my-3'>
              {adminPages.editEmployee}
            </h1>
          </div>
          <img src='/employee.svg' alt='Empleado' className='w-28 sm:w-96' />
        </div>
        <div className='p-6 sm:px-6 sm:pb-8 sm:pt-12 flex flex-col justify-between items-center'>
          <AddEmployeeForm onSubmitHandler={onSubmitForm} employee={employee} />
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
