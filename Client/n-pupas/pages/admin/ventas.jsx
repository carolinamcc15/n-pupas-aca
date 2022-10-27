import { CustomModal } from 'components/layout/modal/custom-modal';
import SectionTitle from 'components/information/section-title';
import PageHeading from 'components/information/page-heading';
import { branchCookie, tokenCookie } from 'constants/data';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { adminPages, titles } from 'constants/strings';
import SaleTableRow from 'components/tables/saleRow';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import { confirmAlert } from 'react-confirm-alert';
import { calculateSaleTotal } from 'utils/utils';
import useAuthContext from 'context/AuthContext';
import SaleCard from 'components/cards/sale';
import { adminRoutes } from 'routes/routes';
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';
import Head from 'next/head';

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
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.sales}</title>
      </Head>
      <PageHeading title={adminPages.sales} route={adminRoutes.newSale} />
      <section>
        <SectionTitle title={titles.today} />
        {total > 0 ? (
          <div className='relative overflow-x-auto shadow-md sm:rounded-lg mb-6'>
            <p className='text-lg text-primary-500 font-bold'>
              Ingreso total: ${Number(total).toFixed(2)}
            </p>
            <table className='w-full text-sm text-left mt-6'>
              <thead>
                <tr>
                  <th className='pl-6'>Producto</th>
                  <th className='pl-5 '>Cantidad</th>
                  <th className='pl-6 '>Total</th>
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
      <section>
        <SectionTitle title={titles.history} />
        <div className='flex flex-col gap-5 md:grid md:grid-cols-2'>
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
