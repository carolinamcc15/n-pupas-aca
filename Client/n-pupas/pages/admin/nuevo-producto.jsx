import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';

import AddProductForm from 'components/forms/add-product';
import BackButton from 'components/buttons/back-arrow';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { tokenCookie } from 'constants/data';
import { adminRoutes } from 'routes/routes';

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
    <main className="bg-[url('/waves-bg.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.newProduct}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 py-6 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.menu} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-center md:my-3'>
              {adminPages.newProduct}
            </h1>
          </div>
          <img src='/menu-product.svg' alt='Realizar compras' className='w-28 sm:w-96' />
        </div>
        <div className='p-6 sm:px-6 sm:pb-8 sm:pt-12 flex flex-col justify-between items-center'>
          <AddProductForm onSubmitHandler={onSubmitForm} productTypes={productTypes} />
        </div>
      </section>
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
