import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Head from 'next/head';
import React from 'react';

import BackButton from 'components/buttons/back-arrow';
import AddBranchForm from 'components/forms/add-branch';
import { PupuseriaApi } from 'services/PupuseriaApi';
import useAuthContext from 'context/AuthContext';
import { adminPages } from 'constants/strings';
import { adminRoutes } from 'routes/routes';
import AddTaskForm from 'components/forms/add-task';

export default function NewBranchPage() {
  const pupuseriaApi = new PupuseriaApi();
  const { token } = useAuthContext();
  const router = useRouter();

  const onSubmitForm = async data => {
    try {
      const created = await pupuseriaApi.createTask(token, data);

      if (created) {
        toast.success('Tarea creada exitosamente');
        router.push(adminRoutes.task);
      } else {
        toast.error('No se pudo crear la tarea!');
      }
    } catch (e) {
      toast.error('Ocurrió un error interno');
    }
  };

  return (
    <main className="bg-[url('/waves-bg.svg')] flex-1 bg-no-repeat bg-cover h-full p-6 md:p-12 flex justify-center items-center">
      <Head>
        <title>{adminPages.newTask}</title>
      </Head>
      <section className='grid grid-cols-1 sm:grid-cols-2 w-full max-w-[1000px] bg-white rounded-md shadow-lg'>
        <div className='flex flex-col items-center bg-primary-100 p-4 py-6 sm:px-5 sm:py-10 rounded-t-md sm:rounded-l-md gap-4'>
          <div className='flex gap-3'>
            <BackButton linkTo={adminRoutes.task} colorClass='text-primary-500' />
            <h1 className='font-bold text-xl sm:text-2xl md:text-center md:my-3'>
              {adminPages.newTask}
            </h1>
          </div>
          <img src='/branch.svg' alt='Realizar compras' className='w-28 sm:w-96' />
        </div>
        <div className='p-6 sm:px-6 sm:pb-10 sm:pt-16 flex flex-col justify-between items-center'>
          <AddTaskForm onSubmitHandler={onSubmitForm} />
        </div>
      </section>
    </main>
  );
}
