import { CustomModal } from 'components/layout/modal/custom-modal';
import ProfileCardAdmin from 'components/cards/profile-admin';
import SecondaryButton from 'components/buttons/secondary';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PupuseriaApi } from 'services/PupuseriaApi';
import { profilePageName } from 'constants/strings';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';
import { tokenCookie } from 'constants/data';
import { getCookie } from 'cookies-next';
import Head from 'next/head';

const pupuseriaApi = new PupuseriaApi();

const EmployeeProfilePage = ({ admin }) => {
  const { logout } = useAuthContext();

  const handleOnLogout = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomModal
            onClose={onClose}
            onConfirm={logout}
            text={`¿Segura/o que quieres cerrar sesión?`}
            confirmText='Confirmar'
          />
        );
      },
    });
  };

  return (
    <main className='p-6 flex flex-col gap-5'>
      <Head>
        <title>{profilePageName}</title>
      </Head>
      <div className='w-full md:max-w-[800px] mx-auto flex flex-col gap-4'>
        <h1 className='font-bold text-2xl sm:text-3xl md:text-center md:my-3'>{profilePageName}</h1>
        <ProfileCardAdmin admin={admin} />
      </div>
      <div className='flex justify-center mt-4'>
        <SecondaryButton text='Cerrar sesión' onClickHandler={handleOnLogout} isRed={true} />
      </div>
    </main>
  );
};

export default EmployeeProfilePage;

export async function getServerSideProps({ req, res }) {
  const token = getCookie(tokenCookie, { req, res });

  try {
    const adminInfo = await pupuseriaApi.getAdminInfo(token);
    return {
      props: {
        admin: adminInfo,
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
