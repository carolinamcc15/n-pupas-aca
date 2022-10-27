import AddProductForm from 'components/forms/add-product';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

export default function editProductPage({ productTypes, product }) {
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    if (data.image[length]) {
      data.image = data.image[0];
    } else {
      delete data.image;
    }

    try {
      const updated = await pupuseriaApi.updateProduct(token, product.id, data);
      if (updated) {
        toast.success('Cambios guardados exitosamente');
        router.push(adminRoutes.menu);
      } else {
        toast.error('No se pudieron guardar los cambios');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.editProduct}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.editProduct}
      </h1>
      <AddProductForm
        onSubmitHandler={onSubmitForm}
        productTypes={productTypes}
        product={product}
      />
    </main>
  );
}

export async function getServerSideProps({ query, req, res }) {
  const token = getCookie(tokenCookie, { req, res });
  const productID = query.id;

  try {
    const productTypes = await pupuseriaApi.getProductTypes(token);
    const product = await pupuseriaApi.getOneProduct(token, productID);
    return {
      props: {
        productTypes: productTypes,
        product: product,
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