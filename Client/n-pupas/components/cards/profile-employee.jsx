const ProfileCardEmployee = ({ employee, logout }) => {
  return (
    <article className='bg-white shadow-md border-primary-300 mt-4'>
      <div className='flex flex-col'>
        <div className='bg-primary-500 flex flex-col items-center py-2'>
          <h2 className='text-white text-3xl p-2'>{employee.user.name}</h2>
          <p className='text-primary-300 uppercase p-2'>Empleado</p>
        </div>
        <div className='w-11/12 m-auto mt-4 mb-4 flex flex-col'>
          <p className='text-primary-500 text-xl'>Información relevante</p>
          <hr className='border-t-2 border-black'/>
          <div className='grid grid-cols-5 gap-3'>
          <p className='mt-4 w-4 col-span-1 text-primary-300'> Email </p>
          <p className='ml-12 mt-4 col-span-4'> {employee.user.username} </p>
          <p className='col-span-1 text-primary-300'> Desde </p>
          <p className='ml-12 col-span-4 mb-12'> {employee.hiringDate} </p>
          </div>
            <div className='flex justify-end'>
              <p className='text-red-500 underline cursor-pointer' onClick={logout}>Cerrar sesión</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProfileCardEmployee;
