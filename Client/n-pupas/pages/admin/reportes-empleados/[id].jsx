import { CustomModal } from 'components/layout/modal/custom-modal';
import { branchCookie, tokenCookie } from 'constants/data';
import 'react-confirm-alert/src/react-confirm-alert.css';
import ReportECard from 'components/cards/report-card';
import useBranchContext from 'context/BranchContext';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';
import { adminRoutes } from 'routes/routes';
import { useState, useEffect } from 'react';

const pupuseriaApi = new PupuseriaApi();

const ReportesPages = ({ employee }) => {
  const [reports, setReports] = useState(employee.reports);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();
  const { branchID } = useBranchContext();
  
  useEffect(() => {
    const getEmployee = async () => {
      const employee1 = await pupuseriaApi.getOneEmployee(token, branchID, employee.id);
      setReports(employee1.reports);
    };
    getEmployee();
  }, [deleteToggle]);

  const deleteReport = async id => {
    try {
      const deleted = await pupuseriaApi.deleteReport(token, branchID, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Reporte eliminado exitosamente');
      } else {
        toast.error('No se pudo eliminar el reporte');
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
            onConfirm={() => deleteReport(id)}
            text={`¿Segura/o que quieres eliminar el reporte?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex-grow flex flex-col gap-5'>
      <Head>
        <title>{adminPages.reportsEmployee}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl  md:my-3'>Reportes a {employee.user.name}</h1>
      <div className='flex-grow grid grid-cols-1 sm:grid-cols-2'>
        <section className='w-full max-w-[1300px] rounded-md shadow-lg flex flex-col gap-4 bg-light-blue p-4 py-6 sm:px-5 sm:py-10 '>
          {reports.length > 0 ? (
          reports.map(report => {
            return (
              <ReportECard
                comment={report}
                key={report.id}
                onDeleteHandler={() => onDeleteHandler(report.id)}
              />
            );
          })
          ) : (
            <p>Aún no se han registrado comentarios</p>
          )}
        </section>
        <img src='/onReports.png' alt='Empleado' className='w-28 sm:w-96 place-self-center object-center' />
      </div>
    </main>
  );
};

export default ReportesPages;

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
