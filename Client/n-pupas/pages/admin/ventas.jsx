import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';

import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import { branchCookie, tokenCookie } from 'constants/data';
import { adminPages, titles } from 'constants/strings';
import SaleTableRow from 'components/tables/saleRow';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import { calculateSaleTotal } from 'utils/utils';
import useAuthContext from 'context/AuthContext';
import SaleCard from 'components/cards/sale';
import { adminRoutes } from 'routes/routes';

const pupuseriaApi = new PupuseriaApi();

const SalesPage = ({ products, allSales }) => {
  const [deleteToggle, setDeleteToggle] = useState(false);
  const [sales, setSales] = useState(allSales);
  const [salesByProduct, setSalesByProduct] = useState([]);
  const [total, setTotal] = useState([]);
  const { branchID } = useBranchContext();
  const { token } = useAuthContext();

  useEffect(() => {
    const getSales = async () => {
      const sales = await pupuseriaApi.getAllSales(token, branchID);
      setSales(sales);
    };

    const getTodaySales = async () => {
      try {
        const details = [];
        const salesByProduct = [];
        const total = 0;
        const todaySales = await pupuseriaApi.getTodaySales(token, branchID);

        products.forEach(product => {
          salesByProduct.push({ product: product, soldAmount: 0 });
        });

        todaySales.forEach(sale => {
          details.push(...sale.details);
        });

        details.forEach(detail => {
          salesByProduct.forEach(saleByProduct => {
            if (saleByProduct.product.id == detail.product.id) {
              saleByProduct.soldAmount += detail.amount;
              total += detail.total;
            }
          });
        });

        setSalesByProduct(salesByProduct);
        setTotal(total);
      } catch (e) {
        toast.error('Ocurrió un error');
      }
    };
    getSales();
    getTodaySales();
  }, [deleteToggle]);

  const deleteSale = async id => {
    try {
      const deleted = await pupuseriaApi.deleteSale(token, branchID, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Venta eliminada');
      } else {
        toast.error('No se pudo eliminar la venta');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  const onDeleteHandler = saleId => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={() => deleteSale(saleId)}
            text={`¿Segura/o que quieres eliminar la venta #${saleId}?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex gap-5 flex-col flex-1 h-full'>
      <Head>
        <title>{adminPages.sales}</title>
      </Head>
      <PageHeading title={adminPages.sales} route={adminRoutes.newSale} text='Agregar venta' />
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 flex-1'>
        <section className='bg-secondary-500 p-5 sm:p-7 bg-opacity-40 rounded-lg shadow-md mb-3'>
          <div className='flex justify-between mb-5'>
            <h2 className='text-xl font-bold text-primary-500'>{titles.today} </h2>
            <p className='text-xl text-green-600 font-bold mb-2'>${Number(total).toFixed(2)}</p>
          </div>
          {total > 0 ? (
            <div className='relative shadow-md mb-6 overflow-x-auto'>
              <table className='w-full text-sm text-center overflow-x-auto'>
                <thead className='bg-primary-500 text-white'>
                  <tr>
                    <th className='py-3'>Producto</th>
                    <th className='py-3'>Cantidad</th>
                    <th className='py-3'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salesByProduct.map(sale => {
                    return <SaleTableRow sale={sale} key={sale.product.id} />;
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No se han realizado ventas en este día</p>
          )}
        </section>
        <section className='bg-secondary-500 p-5 sm:p-7 bg-opacity-40 rounded-lg shadow-md mb-3'>
          <h2 className='text-xl font-bold text-primary-500 mb-7'>{titles.history} </h2>
          <div className='flex flex-col gap-5'>
            {sales.length > 0 ? (
              sales.map(sale => {
                return (
                  <SaleCard
                    sale={sale}
                    total={calculateSaleTotal(sale.details)}
                    key={sale.id}
                    onDeleteHandler={() => onDeleteHandler(sale.id)}
                  />
                );
              })
            ) : (
              <p>No se encontraron ventas</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default SalesPage;

export async function getServerSideProps({ req, res }) {
  const branchID = getCookie(branchCookie, { req, res });
  const token = getCookie(tokenCookie, { req, res });

  try {
    const products = await pupuseriaApi.getAllProducts(token);
    const allSales = await pupuseriaApi.getAllSales(token, branchID);

    return {
      props: {
        products: products,
        allSales: allSales,
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
