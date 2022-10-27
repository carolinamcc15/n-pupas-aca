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

export default function NewProductPage({ productTypes }) {
  const router = useRouter();
  const { token } = useAuthContext();

  const onSubmitForm = async data => {
    if (data.image[length]) {
      data.image = data.image[0];
    } else {
      delete data.image;
    }

    try {
      const created = await pupuseriaApi.createProduct(token, data);

      if (created) {
        toast.success('Producto agregado al menú');
        router.push(adminRoutes.menu);
      } else {
        toast.error('No se pudo crear el producto');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{adminPages.newProduct}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>
        {adminPages.newProduct}
      </h1>
      <AddProductForm onSubmitHandler={onSubmitForm} productTypes={productTypes} />
    </main>
  );
}

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const productTypes = await pupuseriaApi.getProductTypes(token);
    return {
      props: {
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
