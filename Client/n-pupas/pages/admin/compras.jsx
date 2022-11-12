import { CustomModal } from 'components/layout/modal/custom-modal';
import SectionTitle from 'components/information/section-title';
import PageHeading from 'components/information/page-heading';
import PurchaseTableRow from 'components/tables/purchaseRow';
import { branchCookie, tokenCookie } from 'constants/data';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { adminPages, titles } from 'constants/strings';
import { calculateTodayExpenses } from 'utils/utils';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import PurchaseCard from 'components/cards/purchase';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';
import { useState, useEffect } from 'react';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';

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
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.purchases}</title>
      </Head>
      <PageHeading
        title={adminPages.purchases}
        route={adminRoutes.newPurchase}
        text='Agregar compra'
      />
      <section>
        <SectionTitle title={titles.today} />
        {today.length > 0 ? (
          <section>
            <p className='text-lg text-primary-500 font-bold mb-5'>
              Gasto total: ${calculateTodayExpenses(todayPurchases)}
            </p>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-6'>
              <table className='w-full text-sm text-left'>
                <thead>
                  <tr>
                    <th className='pl-6'>Concepto</th>
                    <th className='pl-6 '>Monto</th>
                  </tr>
                </thead>
                <tbody>
                  {today.map(purchase => {
                    return <PurchaseTableRow key={purchase.id} purchase={purchase} />;
                  })}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <p>No se han realizado compras este día</p>
        )}
      </section>
      <section>
        <SectionTitle title='Historial de compras' />
        {purchases.length > 0 ? (
          <section className='flex flex-col gap-5 md:grid md:grid-cols-2 lg:grid-cols-3'>
            {purchases.map(purchase => {
              return (
                <PurchaseCard
                  purchase={purchase}
                  onDeleteHandler={() => onDeleteHandler(purchase.id)}
                />
              );
            })}
          </section>
        ) : (
          <p>Aún no se han realizado compras</p>
        )}
      </section>
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
