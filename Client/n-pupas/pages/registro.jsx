import toast from 'react-hot-toast';
import Head from 'next/head';

import BackButton from 'components/buttons/back-arrow';
import { registerPageName } from 'constants/strings';
import RegisterForm from 'components/forms/register';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { loginRoute } from 'routes/routes';

const RegisterPage = () => {
  const pupuseriaApi = new PupuseriaApi();
  const { login } = useAuthContext();

  const onSubmitForm = async data => {
    delete data.password_repeat;

    try {
      const response = await pupuseriaApi.registerAdmin(data);

      if (!response.ok) {
        const errorObj = await response.json();
        toast.error(errorObj.message);
      } else {
        toast.success('Usuario registrado existosamente');
        await login({ username: data.username, password: data.Password });
      }
    } catch (e) {
      toast.error('Ocurrió un error');
    }
  };

  return (
    <div className="w-full bg-[url('/waves-bg.svg')] bg-no-repeat bg-cover h-full min-h-screen p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{registerPageName}</title>
      </Head>
      <main className='w-full flex flex-col max-w-[1000px]'>
        <div>
          <div className='flex gap-3 items-center mb-5'>
            <BackButton linkTo={loginRoute} />
            <h1 className='text-white font-bold text-lg sm:text-xl md:text-2xl text-center'>
              Regístrate en N Pupas
            </h1>
          </div>
          <RegisterForm onSubmitHandler={onSubmitForm} />
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;
