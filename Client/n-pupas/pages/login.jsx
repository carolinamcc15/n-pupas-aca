import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { adminRoutes, registerRoute } from 'routes/routes';
import { roleCookie, tokenCookie } from 'constants/data';
import { loginPageName } from 'constants/strings';
import useAuthContext from 'context/AuthContext';
import LoginForm from 'components/forms/login';

const LoginPage = () => {
  const { login } = useAuthContext();
  const router = useRouter();

  const redirectToRegister = () => {
    router.push(registerRoute);
  };

  const onSubmitForm = async data => {
    login(data);
  };

  return (
    <main className="bg-[url('/waves-bg.svg')] bg-no-repeat bg-cover h-full min-h-screen p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{loginPageName}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <h1 className='text-lg sm:text-xl md:text-2xl font-bold mt-4 text-primary-500'>
            Ingresa a N Pupas
          </h1>
          <img src='/login.svg' alt='Iniciando sesión' className='w-28 sm:w-96' />
        </div>
        <div className='p-6 sm:px-6 sm:pb-10 sm:pt-16 flex flex-col justify-between items-center'>
          <LoginForm onSubmitHandler={onSubmitForm} />
          <div className='flex flex-wrap gap-4 mt-10 sm:mt-0'>
            <p>¿No tienes una cuenta?</p>
            <button className='underline font-bold text-primary-500' onClick={redirectToRegister}>
              Regístrate
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;

export async function getServerSideProps({ req, res }) {
  const role = getCookie(roleCookie, { req, res });
  const token = getCookie(tokenCookie, { req, res });

  if (token && role) {
    return {
      redirect: {
        permanent: false,
        destination: adminRoutes.home,
      },
    };
  }

  return {
    props: {},
  };
}
