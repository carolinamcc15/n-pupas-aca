const ProfileCardEmployee = ({ employee }) => {
  return (
    <article className='bg-white shadow-md p-4'>
      <div className='flex flex-wrap gap-3 justify-between mb-2 items-start'>
        <div>
          <h2 className='font-bold text-primary-500'>{employee.user.name}</h2>
          <p>{employee.user.username}</p>
        </div>
        <p className='flex items-center px-4 py-0.5 bg-yellow-550 text-white rounded-md font-bold uppercase'>
          Empleado
        </p>
      </div>
      <div>
        <p>Empleado desde: {employee.hiringDate}</p>
      </div>
    </article>
  );
};

export default ProfileCardEmployee;
