import { registerPageName } from 'constants/strings';
import RegisterForm from 'components/forms/register';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import toast from 'react-hot-toast';
import Head from 'next/head';

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
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{registerPageName}</title>
      </Head>
      <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>{registerPageName}</h1>
      <RegisterForm onSubmitHandler={onSubmitForm} />
    </main>
  );
};

export default RegisterPage;
