import { CustomModal } from 'components/layout/modal/custom-modal';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { confirmAlert } from 'react-confirm-alert';
import useAuthContext from 'context/AuthContext';

const LogoutButton = () => {
  const { logout } = useAuthContext();

  const handleOnClick = () => {
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
    <button type='button' onClick={handleOnClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-6 w-6 hover:text-red-700 hover:transform hover:scale-110'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'
        strokeWidth='2'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
        />
      </svg>
    </button>
  );
};

export default LogoutButton;
