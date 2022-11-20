import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import { branchCookie, tokenCookie } from 'constants/data';
import 'react-confirm-alert/src/react-confirm-alert.css';
import EmployeeCard from 'components/cards/employee';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const EmployeesPage = ({ allEmployees }) => {
  const [employees, setEmployees] = useState(allEmployees);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();
  const { branchID } = useBranchContext();

  useEffect(() => {
    const getEmployees = async () => {
      const employees = await pupuseriaApi.getAllEmployees(token, branchID);
      setEmployees(employees);
    };
    getEmployees();
  }, [deleteToggle]);

  const deleteEmployee = async id => {
    try {
      const deleted = await pupuseriaApi.deleteEmployee(token, branchID, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Empleado eliminado exitosamente');
      } else {
        toast.error('No se pudo eliminar el empleado');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  const onDeleteHandler = id => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={() => deleteEmployee(id)}
            text={`¿Segura/o que quieres eliminar al empleado "? `}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.employees}</title>
      </Head>
      <PageHeading
        title={adminPages.employees}
        route={adminRoutes.newEmployee}
        text='Agregar empleado'
      />
      <div className='grid grid-cols-4'>
        {allEmployees.length > 0 ? (
          employees.map(employee => {
            return (
              <EmployeeCard
                employee={employee}
                key={employee.id}
                onDeleteHandler={() => onDeleteHandler(employee.id, employee.name)}
              />
            );
          })
        ) : (
          <p>Aún no se han registrado empleados</p>
        )}
      </div>
    </main>
  );
};

export default EmployeesPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });
  const branchID = getCookie(branchCookie, { req, res });

  try {
    const allEmployees = await pupuseriaApi.getAllEmployees(token, branchID);
    return {
      props: {
        allEmployees: allEmployees,
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
