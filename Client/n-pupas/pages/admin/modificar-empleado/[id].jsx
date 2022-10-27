import AddEmployeeForm from 'components/forms/add-employee';
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
  }

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.editEmployee}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>{adminPages.editEmployee}</h1>
      <AddEmployeeForm onSubmitHandler={onSubmitForm}  employee={employee}/>
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