import SaleDetailProductCard from 'components/cards/sale-detail-product';
import { SaleProductModal } from 'components/layout/modal/sale-modal';
import SaleProductsSection from 'components/sections/sale-products';
import { checkForProduct, createSaleObject } from 'utils/utils';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useBranchContext from 'context/BranchContext';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import React from 'react';
import { getCookie } from 'cookies-next';
import { tokenCookie } from 'constants/data';

const pupuseriaApi = new PupuseriaApi();

export default function NewSalePage({ products, productTypes }) {
  const [saleDetails, setSaleDetails] = useState([]);
  const [saleTotal, setSaleTotal] = useState(0);
  const pupuseriaApi = new PupuseriaApi();
  const { branchID } = useBranchContext();
  const { token } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    let total = 0;
    saleDetails.forEach(added => {
      total += Number(added.total);
    });
    setSaleTotal(total.toFixed(2));
  }, [saleDetails]);

  const addProduct = (product, formData) => {
    setSaleDetails(checkForProduct(saleDetails, product, formData));
    setSaleTotal((Number(saleTotal) + product.price * Number(formData.quantity)).toFixed(2));
  };

  const deleteProductFromList = index => {
    const auxProducts = [...saleDetails];
    if (index > -1) {
      auxProducts.splice(index, 1);
    }
    setSaleDetails(auxProducts);
  };

  const addSale = async () => {
    const sale = createSaleObject(saleDetails);
    console.log(sale);

    try {
      const created = await pupuseriaApi.createSale(token, branchID, sale);

      if (created) {
        toast.success('Venta agregada exitosamente');
        router.push(adminRoutes.sales);
      } else {
        toast.error('No se pudo crear la venta');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  const openProductModal = product => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return <SaleProductModal onClose={onClose} onSave={addProduct} product={product} />;
      },
    });
  };

  return (
    <main className='flex flex-col gap-5'>
      <Head>
        <title>{adminPages.newSale}</title>
      </Head>
      <div className='flex flex-col gap-5 lg:flex-row lg:grid lg:grid-cols-7'>
        <div className='col-span-5 p-6 flex flex-col gap-5'>
          <h1 className='font-bold text-2xl sm:text-3xl'>{adminPages.newSale}</h1>
          {productTypes.map(type => {
            return (
              <SaleProductsSection
                key={type.id}
                products={products}
                type={type}
                onClickHandler={openProductModal}
              />
            );
          })}
        </div>
        <div className='flex flex-col gap-5 col-span-2 bg-primary-100 p-6 lg:p-4'>
          <h2 className='text-xl font-bold mt-3 text-primary-500 text-center'>Detalle de venta</h2>
          {saleTotal > 0 ? (
            <div className='flex justify-between items-center my-4'>
              <p className='text-primary-500 font-bold text-lg text-right'>Total: ${saleTotal}</p>
              <button
                type='button'
                onClick={() => addSale()}
                className='px-4 py-2 bg-primary-500 font-bold text-white uppercase rounded-md border-2 border-transparent cursor-pointer hover:bg-primary-700 transform transition duration-300 ease-in-out hover:opacity-80'
              >
                Agregar
              </button>
            </div>
          ) : (
            <div className='mt-6'>
              <img src='/ice-cream-seller.svg' alt='Realizar compras' className='w-60 sm:w-72' />
              <p className='px-6 text-center leading-7 font-bold text-primary-500'>
                Selecciona los productos que deseas incluir
              </p>
            </div>
          )}
          {saleDetails.map((obj, index) => {
            return (
              <SaleDetailProductCard
                key={obj.idProducto}
                detailProduct={obj}
                onDeleteHandler={() => deleteProductFromList(index)}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const products = await pupuseriaApi.getAllProducts(token);
    const productTypes = await pupuseriaApi.getProductTypes(token);
    return {
      props: {
        products: products,
        productTypes: productTypes,
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
