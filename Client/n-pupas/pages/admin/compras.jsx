import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';

import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import PurchaseTableRow from 'components/tables/purchaseRow';
import { branchCookie, tokenCookie } from 'constants/data';
import { adminPages, titles } from 'constants/strings';
import { calculateTodayExpenses } from 'utils/utils';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import useAuthContext from 'context/AuthContext';
import { adminRoutes } from 'routes/routes';

const pupuseriaApi = new PupuseriaApi();

const PurchasesPage = ({ todayPurchases, allPurchases }) => {
  const [purchases, setPurchases] = useState(allPurchases);
  const [today, setToday] = useState(todayPurchases);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();
  const { branchID } = useBranchContext();

  useEffect(() => {
    const getPurchases = async () => {
      const purchases = await pupuseriaApi.getAllPurchases(token, branchID);
      const today = await pupuseriaApi.getTodayPurchases(token, branchID);
      setPurchases(purchases);
      setToday(today);
    };
    getPurchases();
  }, [deleteToggle]);

  const deletePurchase = async id => {
    try {
      const deleted = await pupuseriaApi.deletePurchase(token, branchID, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Compra eliminada');
      } else {
        toast.error('No se pudo eliminar la compra');
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
            onConfirm={() => deletePurchase(id)}
            text={`¿Segura/o que quieres eliminar la compra?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex gap-5 flex-col flex-1 h-full'>
      <Head>
        <title>{adminPages.purchases}</title>
      </Head>
      <PageHeading
        title={adminPages.purchases}
        route={adminRoutes.newPurchase}
        text='Agregar compra'
      />
      <div className='grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-10 flex-1'>
        <section className='sm:col-span-2 bg-secondary-500 p-5 sm:p-7 bg-opacity-40 rounded-lg shadow-md mb-3'>
          <div className='flex justify-between mb-5'>
            <h2 className='text-xl font-bold text-primary-500'>{titles.today} </h2>
            <p className='text-xl text-red-700 font-bold mb-2'>
              ${calculateTodayExpenses(todayPurchases)}
            </p>
          </div>
          {today.length > 0 ? (
            <div className='relative  shadow-md mb-6'>
              <table className='w-full text-sm text-center overflow-x-auto'>
                <thead className='bg-primary-500 text-white'>
                  <tr>
                    <th className='py-3'>Concepto</th>
                    <th className='py-3'>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {today.map(purchase => {
                    return <PurchaseTableRow key={purchase.id} purchase={purchase} />;
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No se han realizado compras este día</p>
          )}
        </section>
        <section className='sm:col-span-3 bg-secondary-500 p-5 sm:p-7 bg-opacity-40 rounded-lg shadow-md mb-3'>
          <h2 className='text-xl font-bold text-primary-500 mb-7'>Historial de compras</h2>
          {purchases.length > 0 ? (
            <section className='overflow-x-auto'>
              <table className='w-full text-sm text-center mb-8'>
                <thead className='bg-primary-500 text-white'>
                  <tr>
                    <th className='py-3'>Concepto</th>
                    <th className='py-3'>Monto</th>
                    <th className='py-3'>Fecha</th>
                    <th className='py-3'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {purchases.map(purchase => {
                    return (
                      <PurchaseTableRow
                        key={purchase.id}
                        purchase={purchase}
                        extended={true}
                        onDeleteHandler={onDeleteHandler}
                      />
                    );
                  })}
                </tbody>
              </table>
            </section>
          ) : (
            <p>Aún no se han realizado compras</p>
          )}
        </section>
      </div>
    </main>
  );
};

export default PurchasesPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });
  const branchID = getCookie(branchCookie, { req, res });

  try {
    const todayPurchases = await pupuseriaApi.getTodayPurchases(token, branchID);
    const allPurchases = await pupuseriaApi.getAllPurchases(token, branchID);
    return {
      props: {
        todayPurchases: todayPurchases,
        allPurchases: allPurchases,
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
