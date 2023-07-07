import MenuProductsSection from 'components/sections/menu-products';
import { CustomModal } from 'components/layout/modal/custom-modal';
import PageHeading from 'components/information/page-heading';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { confirmAlert } from 'react-confirm-alert';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import useAuthContext from 'context/AuthContext';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const MenuPage = ({ productTypes, allProducts }) => {
  const [products, setProducts] = useState(allProducts);
  const [deleteToggle, setDeleteToggle] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await pupuseriaApi.getAllProducts(token);
      setProducts(products);
    };
    getAllProducts();
  }, [deleteToggle]);

  const deleteProduct = async id => {
    try {
      const deleted = await pupuseriaApi.deleteProduct(token, id);
      if (deleted) {
        setDeleteToggle(!deleteToggle);
        toast.success('Producto eliminado');
      } else {
        toast.error('No se pudo eliminar el producto');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  const onDeleteHandler = (id, productName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={() => deleteProduct(id)}
            text={`¿Segura/o que quieres eliminar "${productName}" del menú?`}
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex flex-col gap-12'>
      <Head>
        <title>{adminPages.menu}</title>
      </Head>
      <PageHeading title={adminPages.menu} route={adminRoutes.newProduct} text='Agregar producto' />
      {productTypes.length > 0 && productTypes?.map(type => {
        return (
          <MenuProductsSection
            key={type.id}
            products={products}
            type={type}
            onDeleteHandler={onDeleteHandler}
          />
        );
      })}
    </main>
  );
};

export default MenuPage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const productTypes = await pupuseriaApi.getProductTypes(token);
    const allProducts = await pupuseriaApi.getAllProducts(token);
    return {
      props: {
        productTypes: productTypes,
        allProducts: allProducts,
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
