import { adminRole } from 'constants/data';

const ProfileCardAdmin = ({ admin }) => {
  return (
    <article className='bg-white shadow-md p-4'>
      <div className='flex flex-wrap gap-3 justify-between mb-2 items-start'>
        <div>
          <h2 className='font-bold text-primary-500'>{admin.user.name}</h2>
          <p>{admin.user.username}</p>
        </div>
        <p className='flex items-center px-4 py-0.5 bg-yellow-550 text-white rounded-md font-bold uppercase'>
          {adminRole}
        </p>
      </div>
      <div>
        <p className='font-bold mt-1'>{admin.pupuseria.name}</p>
      </div>
    </article>
  );
};

export default ProfileCardAdmin;
