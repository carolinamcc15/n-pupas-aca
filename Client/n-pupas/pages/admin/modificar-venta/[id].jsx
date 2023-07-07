import SaleDetailProductCard from 'components/cards/sale-detail-product';
import { SaleProductModal } from 'components/layout/modal/sale-modal';
import SaleProductsSection from 'components/sections/sale-products';
import { tokenCookie, branchCookie } from 'constants/data';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { confirmAlert } from 'react-confirm-alert';
import { adminPages } from 'constants/strings';
import { checkForProduct } from 'utils/utils';
import { createSaleObject } from 'utils/utils';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import React from 'react';
import useAuthContext from 'context/AuthContext';
import useBranchContext from 'context/BranchContext';
import { adminRoutes } from 'routes/routes';
import { useRouter } from 'next/router';

const pupuseriaApi = new PupuseriaApi();

export default function EditSalePage({ sale, products, productTypes }) {
  const [saleTotal, setSaleTotal] = useState(0);
  const [saleDetails, setSaleDetails] = useState([]);
  const { token } = useAuthContext();
  const { branchID } = useBranchContext();
  const router = useRouter();

  const addProduct = (product, formData) => {
    setSaleDetails(checkForProduct(saleDetails, product, formData));
    setSaleTotal((Number(saleTotal) + product.price * Number(formData.quantity)).toFixed(2));
  };

  useEffect(() => {
    const savedProducts = [];

    sale.details.forEach(detail => {
      savedProducts.push({
        idProducto: detail.product.id,
        product: detail.product,
        amount: Number(detail.amount),
        mass: detail.mass || null,
        total: Number(detail.product.price * detail.amount),
      });
    });

    setSaleDetails(savedProducts);
  }, []);

  useEffect(() => {
    let total = 0;

    saleDetails.forEach(added => {
      total += Number(added.product.price) * Number(added.amount);
    });

    setSaleTotal(total.toFixed(2));
  }, [saleDetails]);

  const deleteProductFromList = index => {
    const auxProducts = [...saleDetails];
    if (index > -1) {
      auxProducts.splice(index, 1);
    }
    setSaleDetails(auxProducts);
  };

  const editSale = async () => {
    const newSale = createSaleObject(saleDetails);

    try {
      const updated = await pupuseriaApi.updateSale(token, branchID, sale.id, newSale);

      if (updated) {
        toast.success('Cambios guardados');
        router.push(adminRoutes.sales);
      } else {
        toast.error('No se pudo modificar la venta');
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
        <title>{adminPages.editSale}</title>
      </Head>
      <div className='flex flex-col gap-5 lg:flex-row lg:grid lg:grid-cols-7'>
        <div className='col-span-5 p-6 flex flex-col gap-5'>
          <h1 className='font-bold text-2xl sm:text-3xl'>{adminPages.editSale}</h1>
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
        <div className='flex flex-col gap-5 col-span-2 p-6 lg:p-4 bg-primary-100'>
          <h2 className='text-xl font-bold mt-3 text-primary-500 text-center'>
            {`Detalle de venta #${sale.id}`}{' '}
          </h2>
          {saleTotal > 0 ? (
            <div className='flex justify-between items-center my-4 ' >
              <p className='text-primary-500 font-bold text-lg sm:text-xl text-right'>
                Total: ${saleTotal}
              </p>
              <button
                type='button'
                onClick={() => editSale()}
                className='px-4 py-2 bg-primary-500 font-bold text-white uppercase rounded-md border-2 border-transparent cursor-pointer hover:bg-primary-700 transform transition duration-300 ease-in-out'
              >
                Guardar cambios
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
                key={obj.product.id}
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

export async function getServerSideProps({ query, req, res }) {
  const branchId = getCookie(branchCookie, { req, res });
  const token = getCookie(tokenCookie, { req, res });
  const saleId = query.id;

  try {
    const sale = await pupuseriaApi.getOneSale(token, branchId, saleId);
    const products = await pupuseriaApi.getAllProducts(token);
    const productTypes = await pupuseriaApi.getProductTypes(token);

    console.log(sale)
    return {
      props: {
        sale: sale,
        products: products,
        productTypes: productTypes,
      },
    };
  } catch (e) {
    console.log(e)
    return {
      redirect: {
        destination: '/500',
      },
    };
  }
}
